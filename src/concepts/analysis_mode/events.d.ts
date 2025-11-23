/**
 * Analysis Mode Concept - Events
 */
import { AnalysisMode } from './types';
export declare const MODE_UPDATED = "analysis_mode.updated";
export interface ModeUpdatedPayload {
    mode: AnalysisMode;
}
export declare const emitModeUpdated: (payload: ModeUpdatedPayload) => Promise<void>;
