"use strict";
/**
 * Analysis Mode Concept - Queries
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMode = getMode;
const database_1 = require("../../lib/database");
function getMode() {
    const db = (0, database_1.getDatabase)();
    const stmt = db.prepare(`
    SELECT mode
    FROM analysis_mode
    WHERE id = 'singleton'
  `);
    const row = stmt.get();
    return (row?.mode ?? 'lite');
}
