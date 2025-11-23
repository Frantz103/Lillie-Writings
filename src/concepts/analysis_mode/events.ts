/**
 * Analysis Mode Concept - Events
 */

import { createEventEmitter } from '../../lib/event-bus';
import { AnalysisMode } from './types';

// Event names
export const MODE_UPDATED = 'analysis_mode.updated';

// Event payload types
export interface ModeUpdatedPayload {
  mode: AnalysisMode;
}

// Event emitters
export const emitModeUpdated = createEventEmitter<ModeUpdatedPayload>(MODE_UPDATED);
