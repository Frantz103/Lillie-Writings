"use strict";
/**
 * Text Capture Concept - Queries
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSnippetById = getSnippetById;
const database_1 = require("../../lib/database");
function getSnippetById(id) {
    const db = (0, database_1.getDatabase)();
    const stmt = db.prepare(`
    SELECT id, source_app, content, created_at
    FROM captured_snippets
    WHERE id = ?
  `);
    const row = stmt.get(id);
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
