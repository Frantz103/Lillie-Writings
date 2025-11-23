/**
 * System Integration Concept - Events
 */
import { SystemSelection } from './types';
export declare const HOTKEY_PRESSED = "system_integration.hotkey_pressed";
export declare const SELECTION_CAPTURED = "system_integration.selection_captured";
export declare const SELECTION_REPLACED = "system_integration.selection_replaced";
export interface SelectionReplacedPayload {
    success: boolean;
}
export declare const emitHotkeyPressed: (payload: void) => Promise<void>;
export declare const emitSelectionCaptured: (payload: SystemSelection) => Promise<void>;
export declare const emitSelectionReplaced: (payload: SelectionReplacedPayload) => Promise<void>;
