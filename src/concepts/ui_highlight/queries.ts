/**
 * UI Highlight Concept - Queries
 */

import { getDatabase } from '../../lib/database';
import { UISession, UISessionState } from './types';

export function getSessionById(id: string): UISession | null {
  const db = getDatabase();

  const stmt = db.prepare(`
    SELECT id, snippet_id, state, created_at, updated_at
    FROM ui_sessions
    WHERE id = ?
  `);

  const row = stmt.get(id) as any;

  if (!row) {
    return null;
  }

  return {
    id: row.id,
    snippetId: row.snippet_id,
    state: row.state as UISessionState,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  };
}

export function getSessionBySnippetId(snippetId: string): UISession | null {
  const db = getDatabase();

  const stmt = db.prepare(`
    SELECT id, snippet_id, state, created_at, updated_at
    FROM ui_sessions
    WHERE snippet_id = ?
    ORDER BY created_at DESC
    LIMIT 1
  `);

  const row = stmt.get(snippetId) as any;

  if (!row) {
    return null;
  }

  return {
    id: row.id,
    snippetId: row.snippet_id,
    state: row.state as UISessionState,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  };
}
