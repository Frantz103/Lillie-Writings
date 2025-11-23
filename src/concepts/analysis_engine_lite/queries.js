"use strict";
/**
 * Analysis Engine Lite Concept - Queries
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIssuesBySnippetId = getIssuesBySnippetId;
const database_1 = require("../../lib/database");
function getIssuesBySnippetId(snippetId) {
    const db = (0, database_1.getDatabase)();
    const stmt = db.prepare(`
    SELECT id, snippet_id, start_index, end_index, issue_type, message, confidence, created_at
    FROM lite_issues
    WHERE snippet_id = ?
    ORDER BY start_index ASC
  `);
    const rows = stmt.all(snippetId);
    return rows.map(row => ({
        id: row.id,
        snippetId: row.snippet_id,
        startIndex: row.start_index,
        endIndex: row.end_index,
        type: row.issue_type,
        message: row.message,
        confidence: row.confidence,
        createdAt: new Date(row.created_at),
    }));
}
