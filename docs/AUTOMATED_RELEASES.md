# Automated Release System

This repository is configured with automated release creation using GitHub Actions. Whenever you push a new tag to the `main` branch, a GitHub release will be automatically created with detailed release notes.

## How It Works

1. **Push a Tag**: When you push a tag (e.g., `v1.2.0`) to the repository
2. **GitHub Actions Triggers**: The workflow automatically starts
3. **Release Notes Generated**: Commits between the previous tag and new tag are analyzed
4. **Release Created**: A GitHub release is created with comprehensive notes

## Quick Start

### Option 1: Using the Helper Script (Recommended)

```bash
# Make the script executable (one-time setup)
chmod +x scripts/create-release.sh

# Create and push a new release
./scripts/create-release.sh v1.2.0 "New features and improvements"

# Or run interactively
./scripts/create-release.sh
```

### Option 2: Manual Tag Creation

```bash
# Create a new tag
git tag -a v1.2.0 -m "Release v1.2.0"

# Push the tag to trigger the workflow
git push origin v1.2.0
```

## Tag Format

The system supports semantic versioning tags:

- ✅ `v1.0.0` - Regular release
- ✅ `v1.2.3` - Patch release  
- ✅ `v2.0.0-alpha` - Pre-release
- ✅ `v1.0.0-beta.1` - Pre-release with iteration
- ❌ `1.0.0` - Missing 'v' prefix
- ❌ `release-1.0.0` - Wrong format

## Release Notes Features

The automated system generates comprehensive release notes including:

### 📊 Release Statistics
- Number of commits
- Tag information
- Release date
- Previous tag reference

### 🔄 Categorized Changes
- **✨ Features**: New functionality
- **🐛 Bug Fixes**: Bug fixes and corrections
- **🔧 Improvements**: Code improvements and refactoring
- **📝 Documentation**: Documentation updates
- **🔀 Other Changes**: Miscellaneous changes

### 📋 Full Commit History
- Expandable section with all commits
- Author information and dates
- Commit hashes for reference

### 🔗 Useful Links
- Full changelog comparison
- Diff and patch views
- Direct links to GitHub

## Workflow Files

Two workflow files are provided:

### `release.yml` (Simple Version)
- Basic release creation
- Simple commit listing
- Minimal configuration

### `auto-release.yml` (Advanced Version)
- Comprehensive release notes
- Commit categorization
- Pre-release detection
- Better error handling
- Artifact uploads

## Monitoring Releases

1. **GitHub Actions**: Monitor workflow progress at `https://github.com/your-username/your-repo/actions`
2. **Releases Page**: View created releases at `https://github.com/your-username/your-repo/releases`
3. **Workflow Summary**: Each run provides a summary with direct links

## Troubleshooting

### Common Issues

**Tag already exists**
```bash
# Delete local tag
git tag -d v1.0.0

# Delete remote tag
git push origin --delete v1.0.0
```

**Workflow not triggering**
- Ensure the tag follows the correct format (`v*.*.*`)
- Check that the workflow files are in `.github/workflows/`
- Verify repository permissions allow Actions

**Empty release notes**
- This happens when there are no commits between tags
- The system will still create a release but with minimal content

### Manual Workflow Trigger

You can also trigger the workflow manually from the GitHub Actions tab if needed.

## Best Practices

1. **Use Semantic Versioning**: Follow the `v[MAJOR].[MINOR].[PATCH]` format
2. **Meaningful Commits**: Write clear commit messages for better categorization
3. **Test Before Tagging**: Ensure your code works before creating a release
4. **Regular Releases**: Create releases frequently to keep users updated
5. **Pre-releases**: Use pre-release tags for beta versions (`v1.0.0-beta`)

## Customization

To modify the release notes format or workflow behavior:

1. Edit `.github/workflows/auto-release.yml`
2. Modify the release notes generation section
3. Test with a new tag to verify changes

The system is designed to be flexible and can be customized for your specific needs.

---

## AI Enhancements

This repository can optionally enhance the "What's New" section of release notes using OpenAI, and suggest Conventional Commits messages before committing locally.

### CI: LLM-Enhanced Release Notes

- Enable by setting repository Variables/Secrets:
  - Variable: `USE_LLM_RELEASE_NOTES=true`
  - Secret: `OPENAI_API_KEY`
- The workflow will:
  - Generate `release_notes.md` as before
  - If enabled, run `scripts/ai-release-notes.mjs` which rewrites only the content between `## What's New` and `## Commits in this release`
  - The script preserves structure and adds concise summaries and references (e.g., `#123`) extracted from commit messages
- Safe fallback: if the AI step fails, the original notes are kept

### Local: AI Commit Message Suggestions

- Husky hook `prepare-commit-msg` is installed.
- Requirements:
  - Run `pnpm install` once to set up Husky
  - Ensure `OPENAI_API_KEY` is available in your shell
- Behavior:
  - When you run `git commit`, if there are staged changes, the hook calls `pnpm ai:commit-msg` which prepends a suggested Conventional Commits message to the commit buffer. You can edit or replace it freely.
  - You can also run manually: `pnpm ai:commit-msg | pbcopy` to copy suggestion.

### Configuration

- Environment variables (optional):
  - `OPENAI_MODEL` (default: `gpt-4o-mini`)
  - `OPENAI_TEMPERATURE` (default: `0.2`)
  - `LLM_PROVIDER` (default: `openai`)

