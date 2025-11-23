"use strict";
/**
 * Text Capture Concept - Actions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCapturedSnippet = createCapturedSnippet;
const database_1 = require("../../lib/database");
const uuid_1 = require("../../lib/uuid");
const events_1 = require("./events");
function createCapturedSnippet(input) {
    const db = (0, database_1.getDatabase)();
    const id = (0, uuid_1.generateId)();
    const createdAt = new Date();
    const stmt = db.prepare(`
    INSERT INTO captured_snippets (id, source_app, content, created_at)
    VALUES (?, ?, ?, ?)
  `);
    stmt.run(id, input.sourceApp ?? null, input.content, createdAt.toISOString());
    const snippet = {
        id,
        sourceApp: input.sourceApp ?? null,
        content: input.content,
        createdAt,
    };
    // Emit event
    (0, events_1.emitSnippetCreated)(snippet);
    return snippet;
}
