#!/bin/bash

# Automated script to create and push a new release tag
# - Determines next semantic version based on commits since the last tag (Conventional Commits)
# - Generates a categorized description from those commits
# - Creates an annotated tag with the notes and pushes it
# Usage (automatic): ./scripts/create-release.sh
# Usage (manual override): ./scripts/create-release.sh v1.2.3

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() { echo -e "${BLUE}[INFO]${NC} $1"; }
print_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
print_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
print_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Ensure git repository
if ! git rev-parse --git-dir >/dev/null 2>&1; then
	print_error "This directory is not a git repository!"
	exit 1
fi

# Ensure clean working tree
if ! git diff-index --quiet HEAD --; then
	print_error "You have uncommitted changes. Please commit or stash them first."
	git status --porcelain
	exit 1
fi

# Warn if not on main branch (non-interactive)
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
	print_warning "You are not on the main branch (current: $CURRENT_BRANCH). Continuing."
fi

# Fetch latest refs and tags
git fetch --tags --prune --quiet || true
git fetch origin main --quiet || true

# Helper: parse repo slug from remote
get_repo_slug() {
	local url
	url=$(git config --get remote.origin.url || echo "")
	# Supports git@github.com:owner/repo.git and https://github.com/owner/repo.git
	echo "$url" | sed -E 's#.*github.com[:/]{1}([^/]+/[^/.]+)(\.git)?#\1#'
}

# Helper: determine last tag (empty if none)
get_last_tag() {
	if git describe --tags --abbrev=0 >/dev/null 2>&1; then
		git describe --tags --abbrev=0
	else
		echo ""
	fi
}

# Helper: increment semantic version
increment_version() {
	local base=$1; local bump=$2
	local version=${base#v}
	version=${version%%-*}
	IFS='.' read -r major minor patch <<<"$version"
	case "$bump" in
		major) major=$((major+1)); minor=0; patch=0 ;;
		minor) minor=$((minor+1)); patch=0 ;;
		patch) patch=$((patch+1)) ;;
		*) print_error "Unknown bump type: $bump"; exit 1 ;;
	esac
	echo "v${major}.${minor}.${patch}"
}

# Helper: decide bump from commits using Conventional Commits heuristics
decide_bump() {
	local range=$1
	local body
	body=$(git log $range --format=%B || echo "")
	if echo "$body" | grep -Eq "BREAKING CHANGE|BREAKING CHANGES|^[a-zA-Z]+\(!\)"; then
		echo major; return
	fi
	if echo "$body" | grep -Eiq "^feat(\(|:|!|$)|\bfeature\b"; then
		echo minor; return
	fi
	echo patch
}

# Helper: generate categorized release notes into a file
generate_release_notes() {
	local range=$1; local tag=$2; local outfile=$3
	local repo_slug
	repo_slug=$(get_repo_slug)

	echo "# Release $tag" > "$outfile"
	echo >> "$outfile"

	# Stats
	local commit_count
	commit_count=$(git rev-list --count $range)
	echo "## 📊 Release Statistics" >> "$outfile"
	echo "- Commits: $commit_count" >> "$outfile"
	echo "- Tag: \`$tag\`" >> "$outfile"
	echo "- Release Date: $(date -u '+%Y-%m-%d %H:%M:%S UTC')" >> "$outfile"
	echo >> "$outfile"

	# Collect commits once
	git log $range --pretty=format:"%s|%h|%an|%ad" --date=short > commits.tmp

	categorize() {
		local name=$1; shift
		local pattern=$1; shift
		echo "### $name" >> "$outfile"
		echo >> "$outfile"
		local found=false
		while IFS='|' read -r message hash author date; do
			if echo "$message" | grep -Eiq "$pattern"; then
				echo "- $message (\`$hash\`) - $author" >> "$outfile"
				found=true
			fi
		done < commits.tmp
		if [ "$found" = false ]; then
			echo "_No entries._" >> "$outfile"
		fi
		echo >> "$outfile"
	}

	categorize "✨ Features" "^(feat)(\\(|:|!|$)|\\bfeature\\b"
	categorize "🐛 Bug Fixes" "^(fix|hotfix)(\\(|:|!|$)|\\bbug\\b"
	categorize "🔧 Improvements" "^(refactor|perf|style|chore|build|ci)(\\(|:|!|$)|improve|enhance|update|deps?"
	categorize "📝 Documentation" "^(docs)(\\(|:|!|$)|documentation|readme"

	echo "### 🔀 Other Changes" >> "$outfile"
	echo >> "$outfile"
	local other_found=false
	while IFS='|' read -r message hash author date; do
		if ! echo "$message" | grep -Eiq "^(feat|fix|hotfix|docs|refactor|perf|style|chore|build|ci)(\\(|:|!|$)|feature|bug|documentation|readme|improve|enhance|update|deps?"; then
			echo "- $message (\`$hash\`) - $author" >> "$outfile"
			other_found=true
		fi
	done < commits.tmp
	if [ "$other_found" = false ]; then
		echo "_No other changes._" >> "$outfile"
	fi
	echo >> "$outfile"

	# Full list
	echo "## 📋 Full Commit History" >> "$outfile"
	echo "<details>" >> "$outfile"
	echo "<summary>Click to expand full commit list</summary>" >> "$outfile"
	echo >> "$outfile"
	while IFS='|' read -r message hash author date; do
		echo "- **$message** - $author (\`$hash\`) - $date" >> "$outfile"
	done < commits.tmp
	echo >> "$outfile"
	echo "</details>" >> "$outfile"
	echo >> "$outfile"

	# Links (only if a previous tag exists)
	if git describe --tags --abbrev=0 --exclude "$tag" >/dev/null 2>&1; then
		local prev
		prev=$(git describe --tags --abbrev=0 --exclude "$tag")
		echo "## 🔗 Links" >> "$outfile"
		echo "- Full Changelog: https://github.com/${repo_slug}/compare/${prev}...${tag}" >> "$outfile"
		echo >> "$outfile"
	fi

	rm -f commits.tmp
}

# Determine range and next version
LAST_TAG=$(get_last_tag)
if [ -z "$LAST_TAG" ]; then
	RANGE="HEAD"
else
	RANGE="${LAST_TAG}..HEAD"
fi

# Ensure there are commits to release
COMMITS_SINCE=$(git rev-list --count $RANGE)
if [ "$COMMITS_SINCE" -eq 0 ]; then
	print_warning "No commits since last tag (${LAST_TAG:-none}). Nothing to release."
	exit 0
fi

# If user provided a version, use it. Otherwise compute from commits
if [ "${1:-}" != "" ]; then
	NEW_TAG="$1"
	if [[ ! $NEW_TAG =~ ^v[0-9]+\.[0-9]+\.[0-9]+(-[a-zA-Z0-9.-]+)?$ ]]; then
		print_error "Invalid version format '$NEW_TAG'. Expected vMAJOR.MINOR.PATCH"
		exit 1
	fi
else
	BASE_TAG=${LAST_TAG:-v0.0.0}
	BUMP=$(decide_bump "$RANGE")
	NEW_TAG=$(increment_version "$BASE_TAG" "$BUMP")
fi

# Safety: ensure tag is unique
if git tag --list | grep -qx "$NEW_TAG"; then
	print_error "Tag $NEW_TAG already exists!"
	exit 1
fi

print_status "Preparing release $NEW_TAG (from ${LAST_TAG:-initial})"

# Generate release notes into a temp file and use it as the tag annotation
RELEASE_NOTES_FILE=$(mktemp)
generate_release_notes "$RANGE" "$NEW_TAG" "$RELEASE_NOTES_FILE"

# Create annotated tag with release notes
git tag -a "$NEW_TAG" -F "$RELEASE_NOTES_FILE"

# Sign the tag
git tag -s "$NEW_TAG" -F "$RELEASE_NOTES_FILE"

# Push tag
print_status "Pushing tag $NEW_TAG to origin..."
git push origin "$NEW_TAG"

print_success "Tag $NEW_TAG has been created and pushed!"
print_status "GitHub Actions will now automatically create a release."
SLUG=$(get_repo_slug)
print_status "Actions: https://github.com/${SLUG}/actions"
print_status "Release (once published): https://github.com/${SLUG}/releases/tag/${NEW_TAG}"

rm -f "$RELEASE_NOTES_FILE"

echo
print_success "Release creation completed! 🎉"


