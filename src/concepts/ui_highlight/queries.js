"use strict";
/**
 * UI Highlight Concept - Queries
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSessionById = getSessionById;
exports.getSessionBySnippetId = getSessionBySnippetId;
const database_1 = require("../../lib/database");
function getSessionById(id) {
    const db = (0, database_1.getDatabase)();
    const stmt = db.prepare(`
    SELECT id, snippet_id, state, created_at, updated_at
    FROM ui_sessions
    WHERE id = ?
  `);
    const row = stmt.get(id);
    if (!row) {
        return null;
    }
    return {
        id: row.id,
        snippetId: row.snippet_id,
        state: row.state,
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at),
    };
}
function getSessionBySnippetId(snippetId) {
    const db = (0, database_1.getDatabase)();
    const stmt = db.prepare(`
    SELECT id, snippet_id, state, created_at, updated_at
    FROM ui_sessions
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
        state: row.state,
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at),
    };
}
