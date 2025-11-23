/**
 * Text Capture Concept - Actions
 */

import { getDatabase } from '../../lib/database';
import { generateId } from '../../lib/uuid';
import { CapturedSnippet } from './types';
import { emitSnippetCreated } from './events';

export interface CreateCapturedSnippetInput {
  content: string;
  sourceApp?: string | null;
}

export function createCapturedSnippet(input: CreateCapturedSnippetInput): CapturedSnippet {
  const db = getDatabase();
  const id = generateId();
  const createdAt = new Date();

  const stmt = db.prepare(`
    INSERT INTO captured_snippets (id, source_app, content, created_at)
    VALUES (?, ?, ?, ?)
  `);

  stmt.run(id, input.sourceApp ?? null, input.content, createdAt.toISOString());

  const snippet: CapturedSnippet = {
    id,
    sourceApp: input.sourceApp ?? null,
    content: input.content,
    createdAt,
  };

  // Emit event
  emitSnippetCreated(snippet);

  return snippet;
}
