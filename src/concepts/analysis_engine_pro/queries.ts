/**
 * Analysis Engine Pro Concept - Queries
 */

import { getDatabase } from '../../lib/database';
import { ProSuggestion, TonePreference } from './types';

export function getSuggestionsBySnippetId(snippetId: string): ProSuggestion[] {
  const db = getDatabase();

  const stmt = db.prepare(`
    SELECT id, snippet_id, start_index, end_index, suggestion_text, explanation, tone, created_at
    FROM pro_suggestions
    WHERE snippet_id = ?
    ORDER BY created_at ASC
  `);

  const rows = stmt.all(snippetId) as any[];

  return rows.map(row => ({
    id: row.id,
    snippetId: row.snippet_id,
    startIndex: row.start_index,
    endIndex: row.end_index,
    suggestionText: row.suggestion_text,
    explanation: row.explanation,
    tone: row.tone as TonePreference | undefined,
    createdAt: new Date(row.created_at),
  }));
}
