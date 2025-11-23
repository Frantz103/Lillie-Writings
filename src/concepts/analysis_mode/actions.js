"use strict";
/**
 * Analysis Mode Concept - Actions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.setMode = setMode;
const database_1 = require("../../lib/database");
const events_1 = require("./events");
function setMode(mode) {
    const db = (0, database_1.getDatabase)();
    const stmt = db.prepare(`
    UPDATE analysis_mode
    SET mode = ?, updated_at = ?
    WHERE id = 'singleton'
  `);
    stmt.run(mode, new Date().toISOString());
    // Emit event
    (0, events_1.emitModeUpdated)({ mode });
}
