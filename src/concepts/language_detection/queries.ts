/**
 * Language Detection Concept - Queries
 */

import { getDatabase } from '../../lib/database';
import { DetectedLanguage, SupportedLanguage } from './types';

export function getLanguageDetectionBySnippetId(snippetId: string): DetectedLanguage | null {
  const db = getDatabase();

  const stmt = db.prepare(`
    SELECT id, snippet_id, lang, confidence, created_at
    FROM language_detections
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
    lang: row.lang as SupportedLanguage,
    confidence: row.confidence,
    createdAt: new Date(row.created_at),
  };
}
