/**
 * User Preferences Concept - Actions
 */

import { getDatabase } from '../../lib/database';
import { UserPreferences } from './types';
import { emitPreferencesUpdated } from './events';
import { getPreferences } from './queries';

export function updatePreferences(partial: Partial<UserPreferences>): UserPreferences {
  const db = getDatabase();

  // Build dynamic update query
  const updates: string[] = [];
  const values: any[] = [];

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

  const preferences = getPreferences();

  // Emit event
  emitPreferencesUpdated(preferences);

  return preferences;
}
