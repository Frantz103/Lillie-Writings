"use strict";
/**
 * UI Highlight Concept - Actions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSession = createSession;
exports.setSessionState = setSessionState;
exports.setLiteIssuesForSession = setLiteIssuesForSession;
exports.setProSuggestionsForSession = setProSuggestionsForSession;
const database_1 = require("../../lib/database");
const uuid_1 = require("../../lib/uuid");
const events_1 = require("./events");
function createSession(snippetId) {
    const db = (0, database_1.getDatabase)();
    const id = (0, uuid_1.generateId)();
    const createdAt = new Date();
    const stmt = db.prepare(`
    INSERT INTO ui_sessions (id, snippet_id, state, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?)
  `);
    stmt.run(id, snippetId, 'idle', createdAt.toISOString(), createdAt.toISOString());
    const session = {
        id,
        snippetId,
        state: 'idle',
        createdAt,
        updatedAt: createdAt,
    };
    // Emit event
    (0, events_1.emitSessionCreated)(session);
    return session;
}
function setSessionState(sessionId, state) {
    const db = (0, database_1.getDatabase)();
    const stmt = db.prepare(`
    UPDATE ui_sessions
    SET state = ?, updated_at = ?
    WHERE id = ?
  `);
    stmt.run(state, new Date().toISOString(), sessionId);
}
function setLiteIssuesForSession(sessionId, issues) {
    // Emit event for renderer to update UI
    (0, events_1.emitIssuesUpdated)({
        sessionId,
        issues,
    });
}
function setProSuggestionsForSession(sessionId, suggestions) {
    // Emit event for renderer to update UI
    (0, events_1.emitSuggestionsUpdated)({
        sessionId,
        suggestions,
    });
}
