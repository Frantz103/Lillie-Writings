/**
 * Analysis Mode Concept - Actions
 */

import { getDatabase } from '../../lib/database';
import { AnalysisMode } from './types';
import { emitModeUpdated } from './events';

export function setMode(mode: AnalysisMode): void {
  const db = getDatabase();

  const stmt = db.prepare(`
    UPDATE analysis_mode
    SET mode = ?, updated_at = ?
    WHERE id = 'singleton'
  `);

  stmt.run(mode, new Date().toISOString());

  // Emit event
  emitModeUpdated({ mode });
}
