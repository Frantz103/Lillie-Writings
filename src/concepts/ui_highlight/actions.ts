/**
 * UI Highlight Concept - Actions
 */

import { getDatabase } from '../../lib/database';
import { generateId } from '../../lib/uuid';
import { UISession, UISessionState } from './types';
import { LiteIssue } from '../analysis_engine_lite/types';
import { ProSuggestion } from '../analysis_engine_pro/types';
import { emitSessionCreated, emitIssuesUpdated, emitSuggestionsUpdated } from './events';

export function createSession(snippetId: string): UISession {
  const db = getDatabase();
  const id = generateId();
  const createdAt = new Date();

  const stmt = db.prepare(`
    INSERT INTO ui_sessions (id, snippet_id, state, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?)
  `);

  stmt.run(id, snippetId, 'idle', createdAt.toISOString(), createdAt.toISOString());

  const session: UISession = {
    id,
    snippetId,
    state: 'idle',
    createdAt,
    updatedAt: createdAt,
  };

  // Emit event
  emitSessionCreated(session);

  return session;
}

export function setSessionState(sessionId: string, state: UISessionState): void {
  const db = getDatabase();

  const stmt = db.prepare(`
    UPDATE ui_sessions
    SET state = ?, updated_at = ?
    WHERE id = ?
  `);

  stmt.run(state, new Date().toISOString(), sessionId);
}

export function setLiteIssuesForSession(sessionId: string, issues: LiteIssue[]): void {
  // Emit event for renderer to update UI
  emitIssuesUpdated({
    sessionId,
    issues,
  });
}

export function setProSuggestionsForSession(sessionId: string, suggestions: ProSuggestion[]): void {
  // Emit event for renderer to update UI
  emitSuggestionsUpdated({
    sessionId,
    suggestions,
  });
}
