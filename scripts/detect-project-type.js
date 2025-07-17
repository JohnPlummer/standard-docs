#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

class ProjectTypeDetector {
  constructor(projectPath = process.cwd()) {
    this.projectPath = projectPath;
    this.packageJson = this.readPackageJson();
    this.files = this.scanFiles();
  }

  readPackageJson() {
    try {
      const packagePath = path.join(this.projectPath, 'package.json');
      return JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    } catch (error) {
      console.log(`Note: Could not read package.json at ${this.projectPath} - this is normal for non-Node.js projects`);
      return null;
    }
  }

  scanFiles() {
    const patterns = [
      '**/*.{js,ts,jsx,tsx,py,java,swift,kt,go,rs,php,rb,cs}',
      '**/package.json',
      '**/requirements.txt',
      '**/Cargo.toml',
      '**/go.mod',
      '**/pom.xml',
      '**/build.gradle',
      '**/Podfile',
      '**/pubspec.yaml',
      '**/composer.json',
      '**/Gemfile'
    ];

    return glob.sync(patterns.join(','), {
      cwd: this.projectPath,
      ignore: ['**/node_modules/**', '**/vendor/**', '**/target/**', '**/build/**', '**/.git/**']
    });
  }

  detectMonorepo() {
    const monorepoIndicators = [
      'lerna.json',
      'nx.json',
      'rush.json',
      'pnpm-workspace.yaml',
      'yarn.lock'
    ];

    const hasMonorepoFile = monorepoIndicators.some(file => 
      fs.existsSync(path.join(this.projectPath, file))
    );

    const hasWorkspaces = this.packageJson?.workspaces || 
                          this.packageJson?.private === true;

    const hasMultiplePackageJsons = this.files.filter(f => f.endsWith('package.json')).length > 1;

    return {
      isMonorepo: hasMonorepoFile || hasWorkspaces || hasMultiplePackageJsons,
      indicators: {
        hasMonorepoFile,
        hasWorkspaces,
        hasMultiplePackageJsons
      }
    };
  }

  detectFrameworks() {
    const frameworks = {
      // Frontend
      react: this.hasDependency(['react', '@types/react']),
      vue: this.hasDependency(['vue', '@vue/cli']),
      angular: this.hasDependency(['@angular/core', '@angular/cli']),
      svelte: this.hasDependency(['svelte', '@sveltejs/kit']),
      nextjs: this.hasDependency(['next']),
      nuxt: this.hasDependency(['nuxt', '@nuxt/core']),
      
      // Backend
      express: this.hasDependency(['express']),
      fastify: this.hasDependency(['fastify']),
      koa: this.hasDependency(['koa']),
      nestjs: this.hasDependency(['@nestjs/core']),
      django: this.hasFile('**/settings.py') || this.hasFile('**/manage.py'),
      flask: this.hasDependency(['flask']) || this.hasFile('**/app.py'),
      rails: this.hasFile('**/Gemfile') && this.hasDependency(['rails']),
      spring: this.hasFile('**/pom.xml') || this.hasFile('**/build.gradle'),
      gin: this.hasFile('**/go.mod') && this.hasFileContent('gin-gonic'),
      
      // Mobile
      reactNative: this.hasDependency(['react-native', '@react-native-community/cli']),
      flutter: this.hasFile('**/pubspec.yaml'),
      ionic: this.hasDependency(['@ionic/angular', '@ionic/react', '@ionic/vue']),
      
      // Testing
      jest: this.hasDependency(['jest']),
      mocha: this.hasDependency(['mocha']),
      pytest: this.hasFile('**/pytest.ini') || this.hasFile('**/conftest.py'),
      
      // Build tools
      webpack: this.hasDependency(['webpack']),
      vite: this.hasDependency(['vite']),
      rollup: this.hasDependency(['rollup']),
      
      // Databases
      mongodb: this.hasDependency(['mongodb', 'mongoose']),
      postgres: this.hasDependency(['pg', 'postgresql']),
      mysql: this.hasDependency(['mysql', 'mysql2']),
      redis: this.hasDependency(['redis']),
      
      // GraphQL
      graphql: this.hasDependency(['graphql', 'apollo-server', '@apollo/server']),
      
      // Docker
      docker: this.hasFile('**/Dockerfile') || this.hasFile('**/docker-compose.yml')
    };

    return Object.entries(frameworks)
      .filter(([_, detected]) => detected)
      .map(([name]) => name);
  }

  hasDependency(deps) {
    if (!this.packageJson) return false;
    const allDeps = {
      ...this.packageJson.dependencies,
      ...this.packageJson.devDependencies,
      ...this.packageJson.peerDependencies
    };
    return deps.some(dep => allDeps[dep]);
  }

  hasFile(pattern) {
    return this.files.some(file => glob.minimatch(file, pattern));
  }

  hasFileContent(content) {
    // Simple content check - in real implementation would read files
    return this.files.some(file => file.includes(content));
  }

  detectProjectType() {
    const monorepo = this.detectMonorepo();
    const frameworks = this.detectFrameworks();
    
    if (monorepo.isMonorepo) {
      return {
        type: 'monorepo',
        subTypes: this.detectSubProjectTypes(),
        frameworks,
        confidence: 0.9
      };
    }

    // Mobile app detection
    if (frameworks.includes('reactNative') || frameworks.includes('flutter') || frameworks.includes('ionic')) {
      return {
        type: 'mobile-app',
        frameworks,
        confidence: 0.95
      };
    }

    // Frontend webapp detection
    if (frameworks.some(f => ['react', 'vue', 'angular', 'svelte', 'nextjs', 'nuxt'].includes(f))) {
      return {
        type: 'frontend-webapp',
        frameworks,
        confidence: 0.9
      };
    }

    // Backend API detection
    if (frameworks.some(f => ['express', 'fastify', 'koa', 'nestjs', 'django', 'flask', 'rails', 'spring', 'gin'].includes(f))) {
      return {
        type: 'backend-api',
        frameworks,
        confidence: 0.9
      };
    }

    // Library detection
    if (this.packageJson?.main || this.packageJson?.module || this.packageJson?.exports) {
      return {
        type: 'library',
        frameworks,
        confidence: 0.8
      };
    }

    // Service detection (fallback for backend services without clear API indicators)
    if (this.packageJson || this.hasFile('**/requirements.txt') || this.hasFile('**/go.mod')) {
      return {
        type: 'service',
        frameworks,
        confidence: 0.6
      };
    }

    return {
      type: 'unknown',
      frameworks,
      confidence: 0.1
    };
  }

  detectSubProjectTypes() {
    // For monorepos, detect types of sub-projects
    const packageJsonFiles = this.files.filter(f => f.endsWith('package.json'));
    const subTypes = [];

    for (const pkgFile of packageJsonFiles) {
      if (pkgFile === 'package.json') continue; // Skip root package.json
      
      try {
        const subPackage = JSON.parse(fs.readFileSync(path.join(this.projectPath, pkgFile), 'utf8'));
        const subDetector = new ProjectTypeDetector(path.dirname(path.join(this.projectPath, pkgFile)));
        subDetector.packageJson = subPackage;
        const subType = subDetector.detectProjectType();
        subTypes.push({
          path: path.dirname(pkgFile),
          ...subType
        });
      } catch (e) {
        console.log(`Note: Skipping invalid package.json at ${pkgFile}: ${e.message}`);
      }
    }

    return subTypes;
  }

  getRecommendedTemplates() {
    const detection = this.detectProjectType();
    const templates = ['shared']; // Always include shared templates

    if (detection.type === 'monorepo') {
      templates.push('monorepo');
      // Add templates for each sub-project type
      detection.subTypes.forEach(subType => {
        if (!templates.includes(subType.type)) {
          templates.push(subType.type);
        }
      });
    } else {
      templates.push(detection.type);
    }

    return templates;
  }

  generateReport() {
    const detection = this.detectProjectType();
    const templates = this.getRecommendedTemplates();

    return {
      projectPath: this.projectPath,
      detection,
      templates,
      frameworks: detection.frameworks,
      packageJson: this.packageJson ? {
        name: this.packageJson.name,
        version: this.packageJson.version,
        description: this.packageJson.description
      } : null,
      timestamp: new Date().toISOString()
    };
  }
}

// CLI usage
if (require.main === module) {
  const projectPath = process.argv[2] || process.cwd();
  const detector = new ProjectTypeDetector(projectPath);
  const report = detector.generateReport();
  
  console.log(JSON.stringify(report, null, 2));
}

module.exports = ProjectTypeDetector;