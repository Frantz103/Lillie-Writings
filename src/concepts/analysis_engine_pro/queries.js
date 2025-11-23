"use strict";
/**
 * Analysis Engine Pro Concept - Queries
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSuggestionsBySnippetId = getSuggestionsBySnippetId;
const database_1 = require("../../lib/database");
function getSuggestionsBySnippetId(snippetId) {
    const db = (0, database_1.getDatabase)();
    const stmt = db.prepare(`
    SELECT id, snippet_id, start_index, end_index, suggestion_text, explanation, tone, created_at
    FROM pro_suggestions
    WHERE snippet_id = ?
    ORDER BY created_at ASC
  `);
    const rows = stmt.all(snippetId);
    return rows.map(row => ({
        id: row.id,
        snippetId: row.snippet_id,
        startIndex: row.start_index,
        endIndex: row.end_index,
        suggestionText: row.suggestion_text,
        explanation: row.explanation,
        tone: row.tone,
        createdAt: new Date(row.created_at),
    }));
}
