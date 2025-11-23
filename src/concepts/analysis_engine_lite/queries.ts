/**
 * Analysis Engine Lite Concept - Queries
 */

import { getDatabase } from '../../lib/database';
import { LiteIssue, LiteIssueType } from './types';

export function getIssuesBySnippetId(snippetId: string): LiteIssue[] {
  const db = getDatabase();

  const stmt = db.prepare(`
    SELECT id, snippet_id, start_index, end_index, issue_type, message, confidence, created_at
    FROM lite_issues
    WHERE snippet_id = ?
    ORDER BY start_index ASC
  `);

  const rows = stmt.all(snippetId) as any[];

  return rows.map(row => ({
    id: row.id,
    snippetId: row.snippet_id,
    startIndex: row.start_index,
    endIndex: row.end_index,
    type: row.issue_type as LiteIssueType,
    message: row.message,
    confidence: row.confidence,
    createdAt: new Date(row.created_at),
  }));
}
