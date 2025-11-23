/**
 * Text Capture Concept - Queries
 */

import { getDatabase } from '../../lib/database';
import { CapturedSnippet } from './types';

export function getSnippetById(id: string): CapturedSnippet | null {
  const db = getDatabase();

  const stmt = db.prepare(`
    SELECT id, source_app, content, created_at
    FROM captured_snippets
    WHERE id = ?
  `);

  const row = stmt.get(id) as any;

  if (!row) {
    return null;
  }

  return {
    id: row.id,
    sourceApp: row.source_app,
    content: row.content,
    createdAt: new Date(row.created_at),
  };
}
