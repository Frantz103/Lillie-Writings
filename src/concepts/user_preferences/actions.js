"use strict";
/**
 * User Preferences Concept - Actions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePreferences = updatePreferences;
const database_1 = require("../../lib/database");
const events_1 = require("./events");
const queries_1 = require("./queries");
function updatePreferences(partial) {
    const db = (0, database_1.getDatabase)();
    // Build dynamic update query
    const updates = [];
    const values = [];
    if (partial.defaultLang !== undefined) {
        updates.push('default_lang = ?');
        values.push(partial.defaultLang);
    }
    if (partial.tone !== undefined) {
        updates.push('tone = ?');
        values.push(partial.tone);
    }
    if (partial.shortcut !== undefined) {
        updates.push('shortcut = ?');
        values.push(partial.shortcut);
    }
    if (partial.mode !== undefined) {
        updates.push('mode = ?');
        values.push(partial.mode);
    }
    if (updates.length > 0) {
        updates.push('updated_at = ?');
        values.push(new Date().toISOString());
        values.push('singleton'); // WHERE id = 'singleton'
        const stmt = db.prepare(`
      UPDATE user_preferences
      SET ${updates.join(', ')}
      WHERE id = ?
    `);
        stmt.run(...values);
    }
    const preferences = (0, queries_1.getPreferences)();
    // Emit event
    (0, events_1.emitPreferencesUpdated)(preferences);
    return preferences;
}
