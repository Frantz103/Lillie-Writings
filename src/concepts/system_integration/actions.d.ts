/**
 * System Integration Concept - Actions
 *
 * This concept interfaces with macOS through Electron APIs.
 * It will be fully implemented in the main process setup.
 */
import { SystemSelection } from './types';
/**
 * Capture the current selection from the focused application
 * This is a placeholder - actual implementation will be in the Electron main process
 */
export declare function captureSelection(): Promise<SystemSelection | null>;
/**
 * Replace the current selection with new text
 * This is a placeholder - actual implementation will be in the Electron main process
 */
export declare function replaceSelection(newText: string): Promise<void>;
/**
 * Called by the main process when selection is captured
 */
export declare function onSelectionCaptured(selection: SystemSelection): Promise<void>;
/**
 * Called by the main process when selection is replaced
 */
export declare function onSelectionReplaced(success: boolean): Promise<void>;
