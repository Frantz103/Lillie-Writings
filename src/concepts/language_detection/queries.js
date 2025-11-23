"use strict";
/**
 * Language Detection Concept - Queries
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLanguageDetectionBySnippetId = getLanguageDetectionBySnippetId;
const database_1 = require("../../lib/database");
function getLanguageDetectionBySnippetId(snippetId) {
    const db = (0, database_1.getDatabase)();
    const stmt = db.prepare(`
    SELECT id, snippet_id, lang, confidence, created_at
    FROM language_detections
    WHERE snippet_id = ?
    ORDER BY created_at DESC
    LIMIT 1
  `);
    const row = stmt.get(snippetId);
    if (!row) {
        return null;
    }
    return {
        id: row.id,
        snippetId: row.snippet_id,
        lang: row.lang,
        confidence: row.confidence,
        createdAt: new Date(row.created_at),
    };
}
