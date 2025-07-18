#!/bin/bash

# Standard Docs Installation Script
# Usage: curl -sSL https://raw.githubusercontent.com/johnplummer/standard-docs/main/install.sh | bash

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
REPO_URL="https://github.com/johnplummer/standard-docs"
TEMP_DIR="/tmp/standard-docs-install"
TARGET_DIR="${1:-$(pwd)}"

# Check if we're in an interactive terminal
INTERACTIVE=true
if [ ! -t 0 ]; then
    INTERACTIVE=false
fi

echo -e "${BLUE}🚀 Installing Standard Docs...${NC}\n"

# Function to print colored output
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠️${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Check prerequisites
check_prerequisites() {
    echo -e "${BLUE}🔍 Checking prerequisites...${NC}"
    
    # Check git
    if ! command -v git &> /dev/null; then
        print_error "Git is required but not installed"
        echo "Please install git from https://git-scm.com/"
        exit 1
    fi
    
    print_status "Prerequisites check complete"
}

# Download standard-docs
download_standard_docs() {
    echo -e "${BLUE}📥 Downloading Standard Docs...${NC}"
    
    # Clean up any existing temp directory
    if [ -d "$TEMP_DIR" ]; then
        rm -rf "$TEMP_DIR"
    fi
    
    # Clone the repository
    if ! git clone "$REPO_URL" "$TEMP_DIR" --depth 1 --quiet; then
        print_error "Failed to download Standard Docs"
        exit 1
    fi
    
    print_status "Download complete"
}

# Setup Claude slash commands
setup_claude_commands() {
    echo -e "${BLUE}🎯 Setting up Claude slash commands...${NC}"
    
    # Create Claude slash commands directory
    CLAUDE_DIR="$TARGET_DIR/.claude"
    SLASH_COMMANDS_DIR="$CLAUDE_DIR/commands"
    
    mkdir -p "$SLASH_COMMANDS_DIR"
    
    # Check if slash commands already exist
    if [ -d "$SLASH_COMMANDS_DIR" ] && [ "$(ls -A "$SLASH_COMMANDS_DIR" 2>/dev/null)" ]; then
        print_warning "Existing slash commands found in $SLASH_COMMANDS_DIR"
        echo -e "${YELLOW}The following files will be overwritten:${NC}"
        ls -1 "$SLASH_COMMANDS_DIR"
        echo
        
        if [ "$INTERACTIVE" = true ]; then
            read -p "Continue and overwrite existing slash commands? (y/n): " -n 1 -r
            echo
            if [[ ! $REPLY =~ ^[Yy]$ ]]; then
                print_status "Skipped slash commands installation"
                return
            fi
        else
            echo -e "${YELLOW}Non-interactive mode detected. Skipping to avoid overwriting existing files.${NC}"
            print_status "Skipped slash commands installation"
            return
        fi
    fi
    
    # Copy slash commands
    cp "$TEMP_DIR/commands"/* "$SLASH_COMMANDS_DIR/"
    
    print_status "Claude slash commands installed"
}

# Create templates directory
setup_templates() {
    echo -e "${BLUE}📝 Setting up templates...${NC}"
    
    # Create templates directory
    TEMPLATES_DIR="$TARGET_DIR/.standard-docs-templates"
    mkdir -p "$TEMPLATES_DIR"
    
    # Check if templates already exist
    if [ -d "$TEMPLATES_DIR" ] && [ "$(ls -A "$TEMPLATES_DIR" 2>/dev/null)" ]; then
        print_warning "Existing templates found in $TEMPLATES_DIR"
        echo -e "${YELLOW}The following directories/files will be overwritten:${NC}"
        ls -1 "$TEMPLATES_DIR"
        echo
        
        if [ "$INTERACTIVE" = true ]; then
            read -p "Continue and overwrite existing templates? (y/n): " -n 1 -r
            echo
            if [[ ! $REPLY =~ ^[Yy]$ ]]; then
                print_status "Skipped templates installation"
                return
            fi
        else
            echo -e "${YELLOW}Non-interactive mode detected. Skipping to avoid overwriting existing files.${NC}"
            print_status "Skipped templates installation"
            return
        fi
    fi
    
    # Copy templates
    cp -r "$TEMP_DIR/templates"/* "$TEMPLATES_DIR/"
    
    print_status "Templates installed"
}


# Cleanup
cleanup() {
    if [ -d "$TEMP_DIR" ]; then
        rm -rf "$TEMP_DIR"
    fi
}

# Print usage instructions
print_usage() {
    echo -e "\n${BLUE}📖 Usage Instructions:${NC}"
    echo
    echo -e "${GREEN}Installation Methods:${NC}"
    echo "  Interactive: bash <(curl -sSL https://raw.githubusercontent.com/johnplummer/standard-docs/main/install.sh)"
    echo "  Non-interactive: curl -sSL https://raw.githubusercontent.com/johnplummer/standard-docs/main/install.sh | bash"
    echo "  Note: Non-interactive mode will skip existing files to avoid overwriting"
    echo
    echo -e "${GREEN}Claude Slash Commands Available:${NC}"
    echo "  /docs-create  - Set up documentation for a new project"
    echo "  /docs-update  - Update documentation based on git history"
    echo "  /docs-analyze - Analyze existing documentation quality"
    echo
    echo -e "${GREEN}What was installed:${NC}"
    echo "  .claude/commands/ - Claude slash commands"
    echo "  .standard-docs-templates/ - Documentation templates"
    echo
    echo -e "${GREEN}Next Steps:${NC}"
    echo "1. In Claude, run: /docs-create"
    echo "2. Claude will analyze your project and create documentation"
    echo "3. Review and customize the generated documentation"
    echo "4. Use /docs-update to keep documentation current"
    echo "5. Use /docs-analyze to assess documentation quality"
    echo
    echo -e "${GREEN}Support:${NC}"
    echo "  GitHub: https://github.com/johnplummer/standard-docs"
    echo "  Issues: https://github.com/johnplummer/standard-docs/issues"
    echo
    echo -e "${GREEN}🎉 Happy documenting with Claude!${NC}"
}

# Main installation flow
main() {
    check_prerequisites
    download_standard_docs
    setup_claude_commands
    setup_templates
    cleanup
    
    echo -e "\n${GREEN}✅ Standard Docs installation complete!${NC}"
    print_usage
}

# Handle interruption
trap cleanup exit

# Run main installation
main

# Exit successfully
exit 0