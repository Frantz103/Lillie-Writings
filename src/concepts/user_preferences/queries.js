"use strict";
/**
 * User Preferences Concept - Queries
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPreferences = getPreferences;
const database_1 = require("../../lib/database");
function getPreferences() {
    const db = (0, database_1.getDatabase)();
    const stmt = db.prepare(`
    SELECT id, default_lang, tone, shortcut, mode
    FROM user_preferences
    WHERE id = 'singleton'
  `);
    const row = stmt.get();
    if (!row) {
        // Return defaults if no row exists (shouldn't happen due to schema initialization)
        return {
            id: 'singleton',
            defaultLang: 'auto',
            tone: 'neutral',
            shortcut: 'Control+Option+L',
            mode: 'lite',
        };
    }
    return {
        id: row.id,
        defaultLang: row.default_lang,
        tone: row.tone,
        shortcut: row.shortcut,
        mode: row.mode,
    };
}
