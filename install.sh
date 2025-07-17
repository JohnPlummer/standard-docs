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
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        print_error "Node.js is required but not installed"
        echo "Please install Node.js 16 or higher from https://nodejs.org/"
        exit 1
    fi
    
    # Check Node.js version
    NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 16 ]; then
        print_error "Node.js 16 or higher is required. Current version: $(node --version)"
        exit 1
    fi
    
    # Check npm
    if ! command -v npm &> /dev/null; then
        print_error "npm is required but not installed"
        exit 1
    fi
    
    # Check git
    if ! command -v git &> /dev/null; then
        print_warning "Git is not installed. Some features will be limited."
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

# Install dependencies
install_dependencies() {
    echo -e "${BLUE}📦 Installing dependencies...${NC}"
    
    cd "$TEMP_DIR"
    
    # Install npm dependencies
    if ! npm install --production --silent; then
        print_error "Failed to install dependencies"
        exit 1
    fi
    
    print_status "Dependencies installed"
}

# Run installation
run_installation() {
    echo -e "${BLUE}⚙️ Running installation...${NC}"
    
    cd "$TEMP_DIR"
    
    # Run the installer
    if ! node scripts/install.js "$TARGET_DIR"; then
        print_error "Installation failed"
        exit 1
    fi
    
    print_status "Installation complete"
}

# Setup local scripts
setup_local_scripts() {
    echo -e "${BLUE}🔧 Setting up local scripts...${NC}"
    
    # Create local scripts directory
    LOCAL_SCRIPTS_DIR="$TARGET_DIR/.standard-docs"
    mkdir -p "$LOCAL_SCRIPTS_DIR"
    
    # Copy scripts
    cp -r "$TEMP_DIR/scripts" "$LOCAL_SCRIPTS_DIR/"
    cp -r "$TEMP_DIR/templates" "$LOCAL_SCRIPTS_DIR/"
    
    # Create package.json for local installation
    cat > "$LOCAL_SCRIPTS_DIR/package.json" << EOF
{
  "name": "standard-docs-local",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "detect": "node scripts/detect-project-type.js",
    "setup": "node scripts/setup.js",
    "update": "node scripts/update-from-git.js"
  }
}
EOF
    
    # Install dependencies locally
    cd "$LOCAL_SCRIPTS_DIR"
    npm install --production --silent
    
    print_status "Local scripts setup complete"
}

# Create convenience commands
create_convenience_commands() {
    echo -e "${BLUE}🎯 Creating convenience commands...${NC}"
    
    # Create standard-docs command
    cat > "$TARGET_DIR/standard-docs" << 'EOF'
#!/bin/bash
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
cd "$SCRIPT_DIR/.standard-docs"

case "$1" in
    "detect")
        node scripts/detect-project-type.js
        ;;
    "setup")
        node scripts/setup.js
        ;;
    "update")
        node scripts/update-from-git.js
        ;;
    *)
        echo "Usage: $0 {detect|setup|update}"
        echo "  detect - Detect project type"
        echo "  setup  - Run interactive setup"
        echo "  update - Update documentation from git history"
        ;;
esac
EOF
    
    chmod +x "$TARGET_DIR/standard-docs"
    
    print_status "Convenience commands created"
}

# Cleanup
cleanup() {
    echo -e "${BLUE}🧹 Cleaning up...${NC}"
    
    if [ -d "$TEMP_DIR" ]; then
        rm -rf "$TEMP_DIR"
    fi
    
    print_status "Cleanup complete"
}

# Print usage instructions
print_usage() {
    echo -e "\n${BLUE}📖 Usage Instructions:${NC}"
    echo
    echo -e "${GREEN}Available Commands:${NC}"
    echo "  ./standard-docs detect  - Detect project type"
    echo "  ./standard-docs setup   - Run interactive setup"
    echo "  ./standard-docs update  - Update documentation from git history"
    echo
    echo -e "${GREEN}Claude Slash Commands:${NC}"
    echo "  /docs-create  - Set up documentation for a new project"
    echo "  /docs-update  - Update documentation based on git history"
    echo "  /docs-analyze - Analyze existing documentation quality"
    echo
    echo -e "${GREEN}Documentation Structure:${NC}"
    echo "  docs/                    - All project documentation"
    echo "  CLAUDE.md               - Claude AI configuration"
    echo "  .claude/slash-commands/ - Claude slash commands"
    echo "  .standard-docs/         - Standard Docs installation"
    echo
    echo -e "${GREEN}Next Steps:${NC}"
    echo "1. Review and customize the generated documentation"
    echo "2. Add project-specific information to fill in templates"
    echo "3. Set up automated documentation updates in CI/CD"
    echo "4. Use Claude slash commands for ongoing documentation maintenance"
    echo
    echo -e "${GREEN}Support:${NC}"
    echo "  GitHub: https://github.com/johnplummer/standard-docs"
    echo "  Issues: https://github.com/johnplummer/standard-docs/issues"
    echo
    echo -e "${GREEN}🎉 Happy documenting!${NC}"
}

# Main installation flow
main() {
    check_prerequisites
    download_standard_docs
    install_dependencies
    run_installation
    setup_local_scripts
    create_convenience_commands
    cleanup
    
    echo -e "\n${GREEN}✅ Standard Docs installation complete!${NC}"
    print_usage
}

# Handle interruption
trap cleanup EXIT

# Run main installation
main

# Exit successfully
exit 0