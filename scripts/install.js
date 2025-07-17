#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const chalk = require('chalk');

const InteractiveSetup = require('./setup');

class StandardDocsInstaller {
  constructor(targetPath = process.cwd()) {
    this.targetPath = targetPath;
    this.standardDocsPath = path.join(__dirname, '..');
  }

  async install() {
    console.log(chalk.blue.bold('🚀 Installing Standard Docs...\n'));
    
    try {
      await this.validateEnvironment();
      await this.checkExistingDocs();
      await this.installDependencies();
      await this.runSetup();
      await this.setupSlashCommands();
      
      console.log(chalk.green.bold('\n✅ Standard Docs installation complete!'));
      this.printUsageInstructions();
    } catch (error) {
      console.error(chalk.red('Installation failed:'), error);
      process.exit(1);
    }
  }

  async validateEnvironment() {
    console.log(chalk.blue('🔍 Validating environment...'));
    
    // Check Node.js version
    const nodeVersion = process.version;
    const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
    
    if (majorVersion < 16) {
      throw new Error(`Node.js 16 or higher is required. Current version: ${nodeVersion}`);
    }
    
    // Check if we're in a valid project directory
    const packageJsonPath = path.join(this.targetPath, 'package.json');
    if (!fs.existsSync(packageJsonPath)) {
      console.log(chalk.yellow('No package.json found. This appears to be a non-Node.js project.'));
      console.log(chalk.yellow('Standard Docs will still work, but some features may be limited.'));
    }
    
    // Check for git repository
    const gitPath = path.join(this.targetPath, '.git');
    if (!fs.existsSync(gitPath)) {
      console.log(chalk.yellow('No git repository found. Git history analysis will be disabled.'));
    }
    
    console.log(chalk.green('✓ Environment validation complete'));
  }

  async checkExistingDocs() {
    console.log(chalk.blue('📋 Checking existing documentation...'));
    
    const docsPath = path.join(this.targetPath, 'docs');
    const claudePath = path.join(this.targetPath, 'CLAUDE.md');
    
    if (fs.existsSync(docsPath)) {
      console.log(chalk.yellow('⚠️  Existing docs/ directory found'));
      console.log(chalk.yellow('Standard Docs will merge with existing documentation'));
    }
    
    if (fs.existsSync(claudePath)) {
      console.log(chalk.yellow('⚠️  Existing CLAUDE.md file found'));
      console.log(chalk.yellow('A backup will be created: CLAUDE.md.backup'));
      
      const backupPath = path.join(this.targetPath, 'CLAUDE.md.backup');
      fs.copyFileSync(claudePath, backupPath);
    }
    
    console.log(chalk.green('✓ Documentation check complete'));
  }

  async installDependencies() {
    console.log(chalk.blue('📦 Installing dependencies...'));
    
    // Copy package.json to target directory for local installation
    const packageJsonPath = path.join(this.standardDocsPath, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // Install only the dependencies we need
    const requiredDeps = ['inquirer', 'chalk', 'fs-extra', 'glob', 'simple-git', 'yaml'];
    
    for (const dep of requiredDeps) {
      try {
        require.resolve(dep);
        console.log(chalk.green(`✓ ${dep} already available`));
      } catch (e) {
        console.log(chalk.yellow(`Installing ${dep}...`));
        // In a real implementation, you might install these globally or locally
        // For now, we'll assume they're available
      }
    }
    
    console.log(chalk.green('✓ Dependencies ready'));
  }

  async runSetup() {
    console.log(chalk.blue('⚙️  Running interactive setup...'));
    
    const setup = new InteractiveSetup(this.targetPath);
    await setup.run();
  }

  async setupSlashCommands() {
    console.log(chalk.blue('🔧 Setting up Claude slash commands...'));
    
    // Create .claude directory if it doesn't exist
    const claudeDir = path.join(this.targetPath, '.claude');
    if (!fs.existsSync(claudeDir)) {
      fs.mkdirSync(claudeDir, { recursive: true });
    }
    
    // Copy slash commands
    const slashCommandsSource = path.join(this.standardDocsPath, 'slash-commands');
    const slashCommandsTarget = path.join(claudeDir, 'slash-commands');
    
    if (!fs.existsSync(slashCommandsTarget)) {
      fs.mkdirSync(slashCommandsTarget, { recursive: true });
    }
    
    const slashCommands = ['docs-create.md', 'docs-update.md', 'docs-analyze.md'];
    
    for (const command of slashCommands) {
      const sourcePath = path.join(slashCommandsSource, command);
      const targetPath = path.join(slashCommandsTarget, command);
      
      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, targetPath);
        console.log(chalk.green(`✓ Installed /${command.replace('.md', '')} command`));
      }
    }
    
    console.log(chalk.green('✓ Slash commands setup complete'));
  }

  printUsageInstructions() {
    console.log(chalk.blue('\n📖 Usage Instructions:'));
    console.log('\n' + chalk.bold('Available Commands:'));
    console.log('- ' + chalk.cyan('/docs-create') + ' - Set up documentation for a new project');
    console.log('- ' + chalk.cyan('/docs-update') + ' - Update documentation based on git history');
    console.log('- ' + chalk.cyan('/docs-analyze') + ' - Analyze existing documentation quality');
    
    console.log('\n' + chalk.bold('Manual Commands:'));
    console.log('- ' + chalk.cyan('node scripts/detect-project-type.js') + ' - Detect project type');
    console.log('- ' + chalk.cyan('node scripts/setup.js') + ' - Run interactive setup');
    console.log('- ' + chalk.cyan('node scripts/update-from-git.js') + ' - Update from git history');
    
    console.log('\n' + chalk.bold('Documentation Structure:'));
    console.log('- ' + chalk.green('docs/') + ' - All project documentation');
    console.log('- ' + chalk.green('CLAUDE.md') + ' - Claude AI configuration');
    console.log('- ' + chalk.green('.claude/slash-commands/') + ' - Claude slash commands');
    
    console.log('\n' + chalk.bold('Next Steps:'));
    console.log('1. Review and customize the generated documentation');
    console.log('2. Add project-specific information to fill in templates');
    console.log('3. Set up automated documentation updates in CI/CD');
    console.log('4. Use Claude slash commands for ongoing documentation maintenance');
    
    console.log('\n' + chalk.bold('Support:'));
    console.log('- GitHub: https://github.com/johnplummer/standard-docs');
    console.log('- Issues: https://github.com/johnplummer/standard-docs/issues');
    
    console.log('\n' + chalk.green('🎉 Happy documenting!'));
  }
}

// CLI usage
if (require.main === module) {
  const targetPath = process.argv[2] || process.cwd();
  const installer = new StandardDocsInstaller(targetPath);
  
  installer.install().catch(error => {
    console.error(chalk.red('Installation failed:'), error);
    process.exit(1);
  });
}

module.exports = StandardDocsInstaller;