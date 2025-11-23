/**
 * Analysis Mode Concept - Queries
 */

import { getDatabase } from '../../lib/database';
import { AnalysisMode } from './types';

export function getMode(): AnalysisMode {
  const db = getDatabase();

  const stmt = db.prepare(`
    SELECT mode
    FROM analysis_mode
    WHERE id = 'singleton'
  `);

  const row = stmt.get() as any;

  return (row?.mode ?? 'lite') as AnalysisMode;
}
