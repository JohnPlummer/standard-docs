#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const chalk = require('chalk');
const fsExtra = require('fs-extra');
const ProjectTypeDetector = require('./detect-project-type');

class InteractiveSetup {
  constructor(targetPath = process.cwd()) {
    this.targetPath = targetPath;
    this.validateTargetPath();
    this.detector = new ProjectTypeDetector(targetPath);
    this.report = this.detector.generateReport();
    this.answers = {};
    this.templatePath = path.join(__dirname, '..', 'templates');
  }

  validateTargetPath() {
    try {
      const resolvedPath = path.resolve(this.targetPath);
      if (!fs.existsSync(resolvedPath)) {
        throw new Error(`Target directory does not exist: ${resolvedPath}`);
      }
      if (!fs.statSync(resolvedPath).isDirectory()) {
        throw new Error(`Target path is not a directory: ${resolvedPath}`);
      }
      this.targetPath = resolvedPath;
    } catch (error) {
      console.error(chalk.red(`Error: ${error.message}`));
      process.exit(1);
    }
  }

  async run() {
    console.log(chalk.blue.bold('🚀 Standard Docs Setup\n'));
    
    await this.confirmProjectAnalysis();
    await this.gatherProjectInfo();
    await this.selectTemplates();
    await this.configureTemplates();
    await this.generateDocuments();
    await this.setupClaudeConfig();
    
    console.log(chalk.green.bold('\n✅ Documentation setup complete!'));
    this.printNextSteps();
  }

  async confirmProjectAnalysis() {
    console.log(chalk.yellow('📊 Project Analysis Results:'));
    console.log(`Type: ${this.report.detection.type}`);
    console.log(`Frameworks: ${this.report.frameworks.join(', ')}`);
    console.log(`Templates: ${this.report.templates.join(', ')}`);
    
    const { confirmAnalysis } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirmAnalysis',
        message: 'Is this analysis correct?',
        default: true
      }
    ]);

    if (!confirmAnalysis) {
      await this.manualProjectTypeSelection();
    }
  }

  async manualProjectTypeSelection() {
    const { projectType } = await inquirer.prompt([
      {
        type: 'list',
        name: 'projectType',
        message: 'Select your project type:',
        choices: [
          { name: 'Backend API', value: 'backend-api' },
          { name: 'Frontend Web App', value: 'frontend-webapp' },
          { name: 'Service', value: 'service' },
          { name: 'Mobile App', value: 'mobile-app' },
          { name: 'Library/Package', value: 'library' },
          { name: 'Monorepo', value: 'monorepo' }
        ]
      }
    ]);

    this.report.detection.type = projectType;
    this.report.templates = ['shared', projectType];
  }

  async gatherProjectInfo() {
    const questions = [
      {
        type: 'input',
        name: 'projectName',
        message: 'Project name:',
        default: this.report.packageJson?.name || path.basename(this.targetPath)
      },
      {
        type: 'input',
        name: 'projectDescription',
        message: 'Project description:',
        default: this.report.packageJson?.description || ''
      },
      {
        type: 'input',
        name: 'repositoryUrl',
        message: 'Repository URL:',
        default: this.getRepositoryUrl()
      },
      {
        type: 'input',
        name: 'teamChatChannel',
        message: 'Team chat channel (optional):',
        default: ''
      },
      {
        type: 'input',
        name: 'issueTrackerUrl',
        message: 'Issue tracker URL (optional):',
        default: ''
      }
    ];

    this.answers = await inquirer.prompt(questions);
    
    // Add project type specific questions
    await this.gatherProjectSpecificInfo();
  }

  async gatherProjectSpecificInfo() {
    const projectType = this.report.detection.type;
    
    switch (projectType) {
      case 'backend-api':
        await this.gatherApiInfo();
        break;
      case 'frontend-webapp':
        await this.gatherFrontendInfo();
        break;
      case 'service':
        await this.gatherServiceInfo();
        break;
      case 'mobile-app':
        await this.gatherMobileInfo();
        break;
      case 'library':
        await this.gatherLibraryInfo();
        break;
      case 'monorepo':
        await this.gatherMonorepoInfo();
        break;
    }
  }

  async gatherApiInfo() {
    const apiQuestions = [
      {
        type: 'input',
        name: 'baseUrl',
        message: 'API base URL:',
        default: 'https://api.example.com'
      },
      {
        type: 'list',
        name: 'authType',
        message: 'Authentication type:',
        choices: ['Bearer', 'API Key', 'Basic Auth', 'None'],
        default: 'Bearer'
      },
      {
        type: 'confirm',
        name: 'hasDatabase',
        message: 'Does this API use a database?',
        default: true
      }
    ];

    const apiAnswers = await inquirer.prompt(apiQuestions);
    Object.assign(this.answers, apiAnswers);

    if (apiAnswers.hasDatabase) {
      const dbQuestions = [
        {
          type: 'list',
          name: 'databaseType',
          message: 'Database type:',
          choices: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQLite', 'Redis', 'Other'],
          default: 'PostgreSQL'
        }
      ];
      
      const dbAnswers = await inquirer.prompt(dbQuestions);
      Object.assign(this.answers, dbAnswers);
    }
  }

  async gatherFrontendInfo() {
    const frontendQuestions = [
      {
        type: 'list',
        name: 'routerLibrary',
        message: 'Router library:',
        choices: ['React Router', 'Next.js Router', 'Vue Router', 'Angular Router', 'Other'],
        default: 'React Router'
      },
      {
        type: 'list',
        name: 'stateManagement',
        message: 'State management:',
        choices: ['Redux', 'Zustand', 'Jotai', 'Recoil', 'Context API', 'Vuex', 'Pinia', 'Other'],
        default: 'Redux'
      },
      {
        type: 'confirm',
        name: 'hasStorybook',
        message: 'Using Storybook?',
        default: false
      }
    ];

    const frontendAnswers = await inquirer.prompt(frontendQuestions);
    Object.assign(this.answers, frontendAnswers);
  }

  async gatherServiceInfo() {
    const serviceQuestions = [
      {
        type: 'list',
        name: 'serviceType',
        message: 'Service type:',
        choices: ['Microservice', 'Background Worker', 'Scheduled Job', 'Message Processor', 'Other'],
        default: 'Microservice'
      },
      {
        type: 'confirm',
        name: 'hasMessageQueue',
        message: 'Uses message queue?',
        default: false
      }
    ];

    const serviceAnswers = await inquirer.prompt(serviceQuestions);
    Object.assign(this.answers, serviceAnswers);
  }

  async gatherMobileInfo() {
    const mobileQuestions = [
      {
        type: 'checkbox',
        name: 'targetPlatforms',
        message: 'Target platforms:',
        choices: ['iOS', 'Android', 'Web'],
        default: ['iOS', 'Android']
      },
      {
        type: 'confirm',
        name: 'hasPushNotifications',
        message: 'Uses push notifications?',
        default: false
      }
    ];

    const mobileAnswers = await inquirer.prompt(mobileQuestions);
    Object.assign(this.answers, mobileAnswers);
  }

  async gatherLibraryInfo() {
    const libraryQuestions = [
      {
        type: 'checkbox',
        name: 'packageManagers',
        message: 'Package managers:',
        choices: ['npm', 'yarn', 'pnpm'],
        default: ['npm']
      },
      {
        type: 'confirm',
        name: 'hasTypeScript',
        message: 'TypeScript support?',
        default: true
      }
    ];

    const libraryAnswers = await inquirer.prompt(libraryQuestions);
    Object.assign(this.answers, libraryAnswers);
  }

  async gatherMonorepoInfo() {
    const monorepoQuestions = [
      {
        type: 'list',
        name: 'monorepoTool',
        message: 'Monorepo tool:',
        choices: ['Lerna', 'Nx', 'Rush', 'Yarn Workspaces', 'pnpm Workspaces', 'Other'],
        default: 'Nx'
      },
      {
        type: 'input',
        name: 'totalPackages',
        message: 'Number of packages:',
        default: '5'
      }
    ];

    const monorepoAnswers = await inquirer.prompt(monorepoQuestions);
    Object.assign(this.answers, monorepoAnswers);
  }

  async selectTemplates() {
    const availableTemplates = this.getAvailableTemplates();
    
    const { selectedTemplates } = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'selectedTemplates',
        message: 'Select document templates to generate:',
        choices: availableTemplates,
        default: this.report.templates
      }
    ]);

    this.answers.selectedTemplates = selectedTemplates;
  }

  getAvailableTemplates() {
    const templates = fs.readdirSync(this.templatePath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    return templates.map(template => ({
      name: this.getTemplateDisplayName(template),
      value: template,
      checked: this.report.templates.includes(template)
    }));
  }

  getTemplateDisplayName(template) {
    const displayNames = {
      'shared': 'Shared (PROJECT_OVERVIEW, DEVELOPMENT_SETUP, etc.)',
      'backend-api': 'Backend API (API_REFERENCE, DATABASE_SCHEMA)',
      'frontend-webapp': 'Frontend Web App (COMPONENT_LIBRARY, ROUTING_GUIDE)',
      'service': 'Service (SERVICE_ARCHITECTURE)',
      'mobile-app': 'Mobile App (PLATFORM_GUIDES)',
      'library': 'Library (PACKAGE_USAGE)',
      'monorepo': 'Monorepo (WORKSPACE_STRUCTURE, CROSS_PACKAGE_DEPENDENCIES)'
    };
    
    return displayNames[template] || template;
  }

  async configureTemplates() {
    const { customizeTemplates } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'customizeTemplates',
        message: 'Customize template content?',
        default: false
      }
    ]);

    if (customizeTemplates) {
      // Allow users to customize specific sections
      await this.customizeTemplateContent();
    }
  }

  async customizeTemplateContent() {
    // This would allow users to customize specific template sections
    console.log(chalk.yellow('Template customization coming soon...'));
  }

  async generateDocuments() {
    console.log(chalk.blue('\n📝 Generating documentation...'));
    
    const docsDir = path.join(this.targetPath, 'docs');
    if (!fs.existsSync(docsDir)) {
      fs.mkdirSync(docsDir, { recursive: true });
    }

    for (const templateType of this.answers.selectedTemplates) {
      await this.generateTemplateFiles(templateType, docsDir);
    }
  }

  async generateTemplateFiles(templateType, targetDir) {
    const templateDir = path.join(this.templatePath, templateType);
    
    if (!fs.existsSync(templateDir)) {
      console.log(chalk.yellow(`Template directory not found: ${templateType}`));
      return;
    }

    const templateFiles = fs.readdirSync(templateDir);
    
    for (const templateFile of templateFiles) {
      const templatePath = path.join(templateDir, templateFile);
      const targetPath = path.join(targetDir, templateFile);
      
      const templateContent = fs.readFileSync(templatePath, 'utf8');
      const processedContent = this.processTemplate(templateContent);
      
      fs.writeFileSync(targetPath, processedContent);
      console.log(`Generated: ${templateFile}`);
    }
  }

  processTemplate(content) {
    // Template processing with proper escaping and error handling
    const context = {
      PROJECT_NAME: this.escapeTemplateValue(this.answers.projectName || 'Unnamed Project'),
      PROJECT_DESCRIPTION: this.escapeTemplateValue(this.answers.projectDescription || 'No description provided'),
      PROJECT_TYPE: this.escapeTemplateValue(this.report.detection.type || 'unknown'),
      REPOSITORY_URL: this.escapeTemplateValue(this.answers.repositoryUrl || ''),
      FRAMEWORKS: Array.isArray(this.report.frameworks) ? this.report.frameworks.join(', ') : 'None detected',
      TIMESTAMP: new Date().toISOString(),
      TEAM_CHAT_CHANNEL: this.escapeTemplateValue(this.answers.teamChatChannel || ''),
      ISSUE_TRACKER_URL: this.escapeTemplateValue(this.answers.issueTrackerUrl || ''),
      ...this.answers
    };

    try {
      return content.replace(/\{\{(\w+)\}\}/g, (match, key) => {
        if (context.hasOwnProperty(key)) {
          return context[key];
        }
        console.log(`Warning: Template variable {{${key}}} not found, leaving as-is`);
        return match;
      });
    } catch (error) {
      console.error(chalk.red(`Error processing template: ${error.message}`));
      return content;
    }
  }

  escapeTemplateValue(value) {
    if (typeof value !== 'string') {
      return String(value);
    }
    // Escape special characters that could break markdown
    return value.replace(/[<>]/g, (char) => {
      return char === '<' ? '&lt;' : '&gt;';
    });
  }

  async setupClaudeConfig() {
    const { setupClaude } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'setupClaude',
        message: 'Setup Claude configuration?',
        default: true
      }
    ]);

    if (setupClaude) {
      await this.generateClaudeConfig();
    }
  }

  async generateClaudeConfig() {
    const claudeConfigPath = path.join(this.targetPath, 'CLAUDE.md');
    
    const claudeConfig = this.generateClaudeConfigContent();
    fs.writeFileSync(claudeConfigPath, claudeConfig);
    
    console.log(chalk.green('Generated: CLAUDE.md'));
  }

  generateClaudeConfigContent() {
    const projectType = this.report.detection.type;
    
    return `# Claude Configuration for ${this.answers.projectName}

## Project Context
This is a ${projectType} project built with ${this.report.frameworks.join(', ')}.

## Documentation
The following documentation is available in the \`docs/\` directory:

- [Project Overview](docs/PROJECT_OVERVIEW.md) - Project purpose, goals, and architecture
- [Development Setup](docs/DEVELOPMENT_SETUP.md) - Environment setup and development workflow
- [Key Components](docs/KEY_COMPONENTS.md) - Main modules and their responsibilities
- [Deployment Guide](docs/DEPLOYMENT_GUIDE.md) - Deployment processes and environments
- [Troubleshooting](docs/TROUBLESHOOTING.md) - Common issues and solutions
- [Recent Changes](docs/RECENT_CHANGES.md) - Recent updates and changes

${this.generateProjectSpecificClaudeConfig()}

## Development Commands
- Start: \`${this.getStartCommand()}\`
- Test: \`${this.getTestCommand()}\`
- Build: \`${this.getBuildCommand()}\`
- Lint: \`${this.getLintCommand()}\`

## Important Notes
- Always refer to the documentation in \`docs/\` before making changes
- Follow the established patterns and conventions
- Update documentation when making significant changes

---
*Generated with [standard-docs](https://github.com/johnplummer/standard-docs)*`;
  }

  generateProjectSpecificClaudeConfig() {
    const projectType = this.report.detection.type;
    
    switch (projectType) {
      case 'backend-api':
        return `- [API Reference](docs/API_REFERENCE.md) - API endpoints and usage
- [Database Schema](docs/DATABASE_SCHEMA.md) - Database structure and relationships`;
      
      case 'frontend-webapp':
        return `- [Component Library](docs/COMPONENT_LIBRARY.md) - Reusable components
- [Routing Guide](docs/ROUTING_GUIDE.md) - Application routing structure`;
      
      case 'service':
        return `- [Service Architecture](docs/SERVICE_ARCHITECTURE.md) - Service design and patterns`;
      
      case 'mobile-app':
        return `- [Platform Guides](docs/PLATFORM_GUIDES.md) - iOS and Android specific information`;
      
      case 'library':
        return `- [Package Usage](docs/PACKAGE_USAGE.md) - Installation and usage instructions`;
      
      case 'monorepo':
        return `- [Workspace Structure](docs/WORKSPACE_STRUCTURE.md) - Monorepo organization
- [Cross-Package Dependencies](docs/CROSS_PACKAGE_DEPENDENCIES.md) - Package relationships`;
      
      default:
        return '';
    }
  }

  getStartCommand() {
    if (this.report.packageJson?.scripts?.start) return 'npm start';
    if (this.report.packageJson?.scripts?.dev) return 'npm run dev';
    return 'npm start';
  }

  getTestCommand() {
    if (this.report.packageJson?.scripts?.test) return 'npm test';
    return 'npm test';
  }

  getBuildCommand() {
    if (this.report.packageJson?.scripts?.build) return 'npm run build';
    return 'npm run build';
  }

  getLintCommand() {
    if (this.report.packageJson?.scripts?.lint) return 'npm run lint';
    return 'npm run lint';
  }

  getRepositoryUrl() {
    // Try to extract from package.json or git
    if (this.report.packageJson?.repository?.url) {
      return this.report.packageJson.repository.url;
    }
    return '';
  }

  printNextSteps() {
    console.log(chalk.blue('\n📋 Next Steps:'));
    console.log('1. Review generated documentation in docs/');
    console.log('2. Update CLAUDE.md with project-specific information');
    console.log('3. Customize documentation to match your project');
    console.log('4. Set up automatic documentation updates with git hooks');
    console.log('5. Share documentation with your team');
    
    console.log(chalk.green('\n🎉 Happy documenting!'));
  }
}

// CLI usage
if (require.main === module) {
  const targetPath = process.argv[2] || process.cwd();
  const setup = new InteractiveSetup(targetPath);
  
  setup.run().catch(error => {
    console.error(chalk.red('Setup failed:'), error);
    process.exit(1);
  });
}

module.exports = InteractiveSetup;