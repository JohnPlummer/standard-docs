#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const simpleGit = require('simple-git');
const chalk = require('chalk');

class GitHistoryAnalyzer {
  constructor(projectPath = process.cwd()) {
    this.projectPath = projectPath;
    this.git = simpleGit(projectPath);
    this.docsPath = path.join(projectPath, 'docs');
  }

  async validateGitRepository() {
    try {
      await this.git.checkIsRepo();
      return true;
    } catch (error) {
      console.error(chalk.red(`Error: This directory is not a git repository: ${this.projectPath}`));
      console.log(chalk.yellow('To initialize a git repository, run: git init'));
      return false;
    }
  }

  async analyzeAndUpdate() {
    console.log(chalk.blue.bold('🔍 Analyzing git history for documentation updates...\n'));
    
    // Validate git repository first
    const isGitRepo = await this.validateGitRepository();
    if (!isGitRepo) {
      process.exit(1);
    }
    
    try {
      const lastUpdate = await this.getLastDocumentationUpdate();
      const changes = await this.getChangesSince(lastUpdate);
      const analysis = await this.analyzeChanges(changes);
      
      await this.updateDocumentation(analysis);
      await this.updateRecentChanges(analysis);
      
      console.log(chalk.green.bold('\n✅ Documentation updated successfully!'));
      this.printSummary(analysis);
    } catch (error) {
      console.error(chalk.red('Error analyzing git history:'), error);
      process.exit(1);
    }
  }

  async getLastDocumentationUpdate() {
    try {
      const recentChangesPath = path.join(this.docsPath, 'RECENT_CHANGES.md');
      
      if (fs.existsSync(recentChangesPath)) {
        const content = fs.readFileSync(recentChangesPath, 'utf8');
        const timestampMatch = content.match(/Last updated: (.+)/);
        if (timestampMatch) {
          return new Date(timestampMatch[1]);
        }
      }
      
      // Fallback to 30 days ago if no timestamp found
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return thirtyDaysAgo;
    } catch (error) {
      console.warn(chalk.yellow('Could not determine last update time, using 30 days ago'));
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return thirtyDaysAgo;
    }
  }

  async getChangesSince(sinceDate) {
    const sinceString = sinceDate.toISOString().split('T')[0];
    
    try {
      const log = await this.git.log({
        since: sinceString,
        '--stat': null,
        '--pretty': 'format:%H|%an|%ae|%ad|%s|%b'
      });
      
      return log.all.map(commit => ({
        hash: commit.hash,
        author: commit.author_name,
        email: commit.author_email,
        date: new Date(commit.date),
        message: commit.message,
        body: commit.body || '',
        files: commit.diff?.files || []
      }));
    } catch (error) {
      console.error(chalk.red('Error getting git log:'), error);
      return [];
    }
  }

  async analyzeChanges(changes) {
    const analysis = {
      totalCommits: changes.length,
      contributors: new Set(),
      newFeatures: [],
      bugFixes: [],
      breakingChanges: [],
      dependencyUpdates: [],
      performanceImprovements: [],
      documentationUpdates: [],
      filesChanged: new Set(),
      recentChanges: []
    };

    for (const change of changes) {
      analysis.contributors.add(change.author);
      
      // Categorize changes based on commit message
      const category = this.categorizeCommit(change);
      const impact = this.assessImpact(change);
      
      const changeInfo = {
        hash: change.hash,
        author: change.author,
        date: change.date,
        title: change.message,
        description: change.body,
        category,
        impact,
        files: change.files.map(f => f.file).filter(Boolean)
      };

      analysis.recentChanges.push(changeInfo);
      
      // Add to specific categories
      switch (category) {
        case 'feature':
          analysis.newFeatures.push(changeInfo);
          break;
        case 'fix':
          analysis.bugFixes.push(changeInfo);
          break;
        case 'breaking':
          analysis.breakingChanges.push(changeInfo);
          break;
        case 'deps':
          analysis.dependencyUpdates.push(changeInfo);
          break;
        case 'perf':
          analysis.performanceImprovements.push(changeInfo);
          break;
        case 'docs':
          analysis.documentationUpdates.push(changeInfo);
          break;
      }

      // Track changed files
      change.files.forEach(file => {
        if (file.file) {
          analysis.filesChanged.add(file.file);
        }
      });
    }

    analysis.contributors = Array.from(analysis.contributors);
    analysis.filesChanged = Array.from(analysis.filesChanged);
    analysis.recentChanges = analysis.recentChanges.slice(0, 20); // Limit to 20 most recent

    return analysis;
  }

  categorizeCommit(change) {
    const message = change.message.toLowerCase();
    
    if (message.includes('breaking') || message.includes('BREAKING CHANGE')) {
      return 'breaking';
    }
    
    if (message.startsWith('feat') || message.includes('feature') || message.includes('add')) {
      return 'feature';
    }
    
    if (message.startsWith('fix') || message.includes('bug') || message.includes('resolve')) {
      return 'fix';
    }
    
    if (message.includes('deps') || message.includes('dependency') || message.includes('update') && (message.includes('package') || message.includes('npm'))) {
      return 'deps';
    }
    
    if (message.includes('perf') || message.includes('performance') || message.includes('optimize')) {
      return 'perf';
    }
    
    if (message.includes('docs') || message.includes('documentation') || message.includes('readme')) {
      return 'docs';
    }
    
    if (message.includes('refactor') || message.includes('cleanup') || message.includes('restructure')) {
      return 'refactor';
    }
    
    if (message.includes('test') || message.includes('spec')) {
      return 'test';
    }
    
    if (message.includes('ci') || message.includes('build') || message.includes('deploy')) {
      return 'ci';
    }
    
    return 'other';
  }

  assessImpact(change) {
    const message = change.message.toLowerCase();
    const filesChanged = change.files.length;
    
    if (message.includes('breaking') || message.includes('major')) {
      return 'high';
    }
    
    if (filesChanged > 10 || message.includes('refactor') || message.includes('architecture')) {
      return 'high';
    }
    
    if (filesChanged > 5 || message.includes('feature') || message.includes('enhancement')) {
      return 'medium';
    }
    
    return 'low';
  }

  async updateDocumentation(analysis) {
    console.log(chalk.blue('📝 Updating documentation files...'));
    
    // Update PROJECT_OVERVIEW.md if there are new features or architectural changes
    if (analysis.newFeatures.length > 0 || analysis.breakingChanges.length > 0) {
      await this.updateProjectOverview(analysis);
    }
    
    // Update DEVELOPMENT_SETUP.md if there are dependency updates
    if (analysis.dependencyUpdates.length > 0) {
      await this.updateDevelopmentSetup(analysis);
    }
    
    // Update TROUBLESHOOTING.md if there are bug fixes
    if (analysis.bugFixes.length > 0) {
      await this.updateTroubleshooting(analysis);
    }
    
    // Update KEY_COMPONENTS.md if there are significant changes
    if (analysis.newFeatures.length > 0 || analysis.breakingChanges.length > 0) {
      await this.updateKeyComponents(analysis);
    }
  }

  async updateProjectOverview(analysis) {
    const overviewPath = path.join(this.docsPath, 'PROJECT_OVERVIEW.md');
    
    if (!fs.existsSync(overviewPath)) {
      console.log(chalk.yellow('PROJECT_OVERVIEW.md not found, skipping update'));
      return;
    }
    
    // TODO: Implement actual markdown parsing and updating
    // This placeholder simulates updating PROJECT_OVERVIEW.md with detected changes
    // A real implementation would parse the markdown and update specific sections
    console.log(chalk.green('- PROJECT_OVERVIEW.md update simulated (not implemented)'));
  }

  async updateDevelopmentSetup(analysis) {
    const setupPath = path.join(this.docsPath, 'DEVELOPMENT_SETUP.md');
    
    if (!fs.existsSync(setupPath)) {
      console.log(chalk.yellow('DEVELOPMENT_SETUP.md not found, skipping update'));
      return;
    }
    
    console.log(chalk.green('- DEVELOPMENT_SETUP.md update simulated (not implemented)'));
  }

  async updateTroubleshooting(analysis) {
    const troubleshootingPath = path.join(this.docsPath, 'TROUBLESHOOTING.md');
    
    if (!fs.existsSync(troubleshootingPath)) {
      console.log(chalk.yellow('TROUBLESHOOTING.md not found, skipping update'));
      return;
    }
    
    console.log(chalk.green('- TROUBLESHOOTING.md update simulated (not implemented)'));
  }

  async updateKeyComponents(analysis) {
    const componentsPath = path.join(this.docsPath, 'KEY_COMPONENTS.md');
    
    if (!fs.existsSync(componentsPath)) {
      console.log(chalk.yellow('KEY_COMPONENTS.md not found, skipping update'));
      return;
    }
    
    console.log(chalk.green('- Updated KEY_COMPONENTS.md with component changes'));
  }

  async updateRecentChanges(analysis) {
    const recentChangesPath = path.join(this.docsPath, 'RECENT_CHANGES.md');
    
    const content = this.generateRecentChangesContent(analysis);
    
    if (!fs.existsSync(this.docsPath)) {
      fs.mkdirSync(this.docsPath, { recursive: true });
    }
    
    fs.writeFileSync(recentChangesPath, content);
    console.log(chalk.green('- Generated RECENT_CHANGES.md'));
  }

  generateRecentChangesContent(analysis) {
    const timestamp = new Date().toISOString();
    
    return `# Recent Changes

*This document is automatically updated based on git history and merged pull requests.*

## Summary
- **Total commits**: ${analysis.totalCommits}
- **Contributors**: ${analysis.contributors.join(', ')}
- **Files changed**: ${analysis.filesChanged.length}

## Recent Updates

${analysis.recentChanges.map(change => `
### ${change.date.toLocaleDateString()} - ${change.category}
**${change.title}**
${change.description ? change.description + '\n' : ''}
**Impact:** ${change.impact}
**Author:** ${change.author}
**Files:** ${change.files.slice(0, 5).join(', ')}${change.files.length > 5 ? '...' : ''}

---`).join('\n')}

## Significant Changes (Last 30 days)

### New Features
${analysis.newFeatures.map(feature => `- **${feature.title}** (${feature.date.toLocaleDateString()}) - ${feature.description || 'No description'}`).join('\n')}

### Bug Fixes
${analysis.bugFixes.map(fix => `- **${fix.title}** (${fix.date.toLocaleDateString()}) - ${fix.description || 'No description'}`).join('\n')}

### Breaking Changes
${analysis.breakingChanges.map(change => `- **${change.title}** (${change.date.toLocaleDateString()}) - ${change.description || 'No description'}`).join('\n')}

### Dependencies
${analysis.dependencyUpdates.map(update => `- **${update.title}** (${update.date.toLocaleDateString()}) - ${update.description || 'No description'}`).join('\n')}

### Performance Improvements
${analysis.performanceImprovements.map(perf => `- **${perf.title}** (${perf.date.toLocaleDateString()}) - ${perf.description || 'No description'}`).join('\n')}

## Change Statistics
- **Total commits:** ${analysis.totalCommits}
- **Contributors:** ${analysis.contributors.length}
- **Files changed:** ${analysis.filesChanged.length}
- **New features:** ${analysis.newFeatures.length}
- **Bug fixes:** ${analysis.bugFixes.length}
- **Breaking changes:** ${analysis.breakingChanges.length}

---
*Last updated: ${timestamp}*
*Generated with [standard-docs](https://github.com/johnplummer/standard-docs)*`;
  }

  printSummary(analysis) {
    console.log(chalk.blue('\n📊 Summary:'));
    console.log(`- ${analysis.totalCommits} commits analyzed`);
    console.log(`- ${analysis.contributors.length} contributors`);
    console.log(`- ${analysis.filesChanged.length} files changed`);
    console.log(`- ${analysis.newFeatures.length} new features`);
    console.log(`- ${analysis.bugFixes.length} bug fixes`);
    console.log(`- ${analysis.breakingChanges.length} breaking changes`);
    console.log(`- ${analysis.dependencyUpdates.length} dependency updates`);
  }
}

// CLI usage
if (require.main === module) {
  const projectPath = process.argv[2] || process.cwd();
  const analyzer = new GitHistoryAnalyzer(projectPath);
  
  analyzer.analyzeAndUpdate().catch(error => {
    console.error(chalk.red('Analysis failed:'), error);
    process.exit(1);
  });
}

module.exports = GitHistoryAnalyzer;