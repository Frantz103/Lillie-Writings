/**
 * User Preferences Concept - Queries
 */

import { getDatabase } from '../../lib/database';
import { UserPreferences } from './types';
import { SupportedLanguage } from '../language_detection/types';
import { TonePreference } from '../analysis_engine_pro/types';
import { AnalysisMode } from '../analysis_mode/types';

export function getPreferences(): UserPreferences {
  const db = getDatabase();

  const stmt = db.prepare(`
    SELECT id, default_lang, tone, shortcut, mode
    FROM user_preferences
    WHERE id = 'singleton'
  `);

  const row = stmt.get() as any;

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
    defaultLang: row.default_lang as SupportedLanguage | 'auto',
    tone: row.tone as TonePreference,
    shortcut: row.shortcut,
    mode: row.mode as AnalysisMode,
  };
}
