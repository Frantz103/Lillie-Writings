/**
 * Analysis Engine Lite Concept - Actions
 */

import { getDatabase } from '../../lib/database';
import { generateId } from '../../lib/uuid';
import { CapturedSnippet } from '../text_capture/types';
import { SupportedLanguage } from '../language_detection/types';
import { LiteIssue, LiteIssueType } from './types';
import { emitIssuesCreated } from './events';

export interface AnalyzeSnippetParams {
  snippet: CapturedSnippet;
  lang: SupportedLanguage;
}

export async function analyzeSnippet(params: AnalyzeSnippetParams): Promise<LiteIssue[]> {
  const db = getDatabase();
  const issues: LiteIssue[] = [];

  // For now, generate dummy issues for the first milestone
  // In a future milestone, this will be replaced with actual BERT model inference
  const dummyIssues = generateDummyIssues(params.snippet);

  const stmt = db.prepare(`
    INSERT INTO lite_issues (id, snippet_id, start_index, end_index, issue_type, message, confidence, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const issue of dummyIssues) {
    stmt.run(
      issue.id,
      issue.snippetId,
      issue.startIndex,
      issue.endIndex,
      issue.type,
      issue.message,
      issue.confidence,
      issue.createdAt.toISOString()
    );
    issues.push(issue);
  }

  // Emit event
  await emitIssuesCreated({
    snippetId: params.snippet.id,
    issues,
  });

  return issues;
}

/**
 * Generate dummy issues for testing
 * This will be replaced with actual model inference in a future milestone
 */
function generateDummyIssues(snippet: CapturedSnippet): LiteIssue[] {
  const issues: LiteIssue[] = [];
  const words = snippet.content.split(/\s+/);

  // Create a dummy issue for every 5th word
  let charIndex = 0;
  for (let i = 0; i < words.length; i++) {
    const word = words[i];

    if (i % 5 === 4 && word.length > 0) {
      issues.push({
        id: generateId(),
        snippetId: snippet.id,
        startIndex: charIndex,
        endIndex: charIndex + word.length,
        type: 'grammar' as LiteIssueType,
        message: `Possible grammar issue with "${word}"`,
        confidence: 0.7,
        createdAt: new Date(),
      });
    }

    charIndex += word.length + 1; // +1 for space
  }

  return issues;
}
