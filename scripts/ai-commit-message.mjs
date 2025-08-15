#!/usr/bin/env node
/*
  AI-assisted commit message generator (Conventional Commits).
  - Intended for use from a husky prepare-commit-msg hook
  - Writes to the commit message file passed as $1
  - Safe fallback: if AI fails, leaves message file unchanged
*/

import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';
const TEMPERATURE = process.env.OPENAI_TEMPERATURE ? Number(process.env.OPENAI_TEMPERATURE) : 0.2;

function safeExec(cmd) {
  try {
    return execSync(cmd, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return '';
  }
}

function getStagedDiff() {
  // Limit size and ignore noisy files
  const nameOnly = safeExec('git diff --cached --name-only');
  if (!nameOnly) return '';
  const files = nameOnly
    .split('\n')
    .filter(f => !f.includes('pnpm-lock') && !f.startsWith('dist/') && !f.startsWith('build/'))
    .slice(0, 50);
  if (files.length === 0) return '';
  const diff = safeExec(`git diff --cached --unified=0 -- ${files.map(f => `'${f.replace(/'/g, "'\\''")}'`).join(' ')}`);
  return diff.length > 20000 ? diff.slice(0, 20000) + '\n...[truncated]...' : diff;
}

function buildPrompt({ branch, files, diff }) {
  return `Generate a Conventional Commits style message for the staged changes.

Rules:
- Subject line: type(scope?): summary, max 72 chars. Types: feat, fix, perf, refactor, docs, test, build, ci, chore.
- Body: bullet list of key changes. Be specific and realistic.
- Include references found in diff or branch name (e.g., #123) in the footer as "Refs: #123".
- If multiple types, pick the dominant one.
- Avoid imperative verbs like "Added"; use present tense ("add", "fix").

Context:
- Branch: ${branch}
- Files changed: ${files.join(', ')}
- Staged diff (abbreviated):\n${diff}

Output format:
<subject line>\n\n- <bullet 1>\n- <bullet 2>\n\nRefs: <references if any>`;
}

async function callOpenAI(prompt) {
  if (!OPENAI_API_KEY) throw new Error('OPENAI_API_KEY not set');
  const body = {
    model: MODEL,
    temperature: TEMPERATURE,
    messages: [
      { role: 'system', content: 'You are a precise assistant that writes Conventional Commits messages.' },
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

async function main() {
  const commitMsgPath = process.argv[2];
  if (!commitMsgPath || !existsSync(commitMsgPath)) {
    // Not in hook context; allow manual usage: prints to stdout
    const files = safeExec('git diff --cached --name-only').split('\n').filter(Boolean);
    const diff = getStagedDiff();
    const branch = safeExec('git rev-parse --abbrev-ref HEAD');
    const prompt = buildPrompt({ branch, files, diff });
    try {
      const msg = await callOpenAI(prompt);
      process.stdout.write(msg + '\n');
    } catch (err) {
      console.error('AI commit message failed:', err.message);
    }
    return;
  }

  const staged = safeExec('git diff --cached --name-only');
  if (!staged) return; // nothing staged

  const files = staged.split('\n').filter(Boolean);
  const diff = getStagedDiff();
  const branch = safeExec('git rev-parse --abbrev-ref HEAD');
  const prompt = buildPrompt({ branch, files, diff });

  try {
    const message = await callOpenAI(prompt);
    // If file already has content, prepend AI suggestion as a comment-like prefix
    const existing = readFileSync(commitMsgPath, 'utf8');
    const header = '# Suggested commit message (edit as needed)\n';
    const combined = `${header}${message}\n\n${existing}`;
    writeFileSync(commitMsgPath, combined, 'utf8');
  } catch (err) {
    // Non-fatal; leave commit message untouched
    console.error('AI commit suggestion failed:', err.message);
  }
}

await main();


