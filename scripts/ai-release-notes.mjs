#!/usr/bin/env node
/*
  AI-enhanced release notes generator.
  - Preserves existing structure of release_notes.md
  - Rewrites only the content under "## What's New" using commit data
  - Includes references (e.g., #123) found across commit messages
  - Uses OpenAI via HTTPS fetch (no extra dependencies)
*/

import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const LLM_PROVIDER = process.env.LLM_PROVIDER || 'openai';
const MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';
const TEMPERATURE = process.env.OPENAI_TEMPERATURE ? Number(process.env.OPENAI_TEMPERATURE) : 0.2;
const RELEASE_NOTES_PATH = 'release_notes.md';

function safeExec(cmd) {
  try {
    return execSync(cmd, { encoding: 'utf8' }).trim();
  } catch (err) {
    return '';
  }
}

function extractSection(content, startMarker, endMarker) {
  const startIdx = content.indexOf(startMarker);
  if (startIdx === -1) return { before: content, section: '', after: '' };
  const afterStart = startIdx + startMarker.length;
  const endIdx = content.indexOf(endMarker, afterStart);
  if (endIdx === -1) {
    return {
      before: content.slice(0, afterStart),
      section: content.slice(afterStart),
      after: ''
    };
  }
  return {
    before: content.slice(0, afterStart),
    section: content.slice(afterStart, endIdx),
    after: content.slice(endIdx)
  };
}

function buildPrompt({ currentTag, previousTag, whatsNewDraft, commitsSection }) {
  const tagRange = previousTag ? `${previousTag}..${currentTag}` : currentTag;
  return `You are an expert release notes editor.

Rewrite the description for the section "## What's New" for a GitHub release. Keep the overall file structure unchanged. Only produce the content that should appear BETWEEN the heading "## What's New" and the next heading "## Commits in this release".

Goals:
- Improve clarity and concision. Keep it under ~150-200 words.
- Group and summarize changes by type following Conventional Commits semantics (feat, fix, chore, refactor, docs, perf, test, build, ci).
- Include issue/PR references that appear in commits (e.g., #123) where relevant.
- Avoid marketing fluff; be factual and precise.
- Do NOT add new top-level headings or rename existing ones.

Context:
- Tag range: ${tagRange}
- Existing draft under What's New (may be empty):
${whatsNewDraft || '(none)'}

- Commits in this release (source of truth):
${commitsSection}

Output:
- Plain markdown content to insert under "## What's New". No extra headings beyond bullet points or paragraphs.
`;
}

async function callOpenAI(prompt) {
  if (!OPENAI_API_KEY) throw new Error('OPENAI_API_KEY is not set');
  if (LLM_PROVIDER !== 'openai') throw new Error(`Unsupported provider: ${LLM_PROVIDER}`);

  const body = {
    model: MODEL,
    temperature: TEMPERATURE,
    messages: [
      { role: 'system', content: 'You are a concise, precise release-notes editor following Conventional Commits.' },
      { role: 'user', content: prompt }
    ]
  };

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OpenAI API error ${res.status}: ${text}`);
  }
  const json = await res.json();
  const content = json.choices?.[0]?.message?.content?.trim();
  if (!content) throw new Error('Empty completion');
  return content;
}

function getTagsFromEnvOrGit() {
  const githubRef = process.env.GITHUB_REF || '';
  const currentTag = githubRef.startsWith('refs/tags/') ? githubRef.replace('refs/tags/', '') : safeExec('git describe --tags --exact-match 2>/dev/null');

  let previousTag = '';
  if (currentTag) {
    const cmd = `git tag --sort=-version:refname | grep -A1 "^${currentTag}$" | tail -n1`;
    previousTag = safeExec(cmd);
    if (!previousTag || previousTag === currentTag) {
      previousTag = '';
    }
  }
  return { currentTag, previousTag };
}

async function main() {
  let original;
  try {
    original = readFileSync(RELEASE_NOTES_PATH, 'utf8');
  } catch (err) {
    console.error('release_notes.md not found; skipping AI enhancement');
    process.exit(0);
  }

  const whatsNewHeader = '## What\'s New';
  const commitsHeader = '## Commits in this release';

  const { before, section: whatsNewDraft, after } = extractSection(original, whatsNewHeader, commitsHeader);
  if (!after) {
    // If the commits header doesn't exist, do nothing to avoid corrupting the file
    console.error('Commits section not found; skipping AI enhancement');
    process.exit(0);
  }

  // Extract commits section content (from commits header to next header or EOF)
  const commitsStart = original.indexOf(commitsHeader);
  const nextHeaderIdx = original.indexOf('\n## ', commitsStart + commitsHeader.length);
  const commitsSection = nextHeaderIdx === -1
    ? original.slice(commitsStart)
    : original.slice(commitsStart, nextHeaderIdx);

  const { currentTag, previousTag } = getTagsFromEnvOrGit();
  const prompt = buildPrompt({ currentTag, previousTag, whatsNewDraft, commitsSection });

  try {
    const improved = await callOpenAI(prompt);
    const updated = `${before}\n\n${improved.trim()}\n\n${after}`;
    writeFileSync(RELEASE_NOTES_PATH, updated, 'utf8');
    console.log('AI-enhanced release notes written to release_notes.md');
  } catch (err) {
    console.error(`AI enhancement failed: ${err.message}`);
    console.error('Keeping original release notes.');
  }
}

await main();


