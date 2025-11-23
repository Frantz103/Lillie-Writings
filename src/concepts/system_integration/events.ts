/**
 * System Integration Concept - Events
 */

import { createEventEmitter } from '../../lib/event-bus';
import { SystemSelection } from './types';

// Event names
export const HOTKEY_PRESSED = 'system_integration.hotkey_pressed';
export const SELECTION_CAPTURED = 'system_integration.selection_captured';
export const SELECTION_REPLACED = 'system_integration.selection_replaced';

// Event payload types
export interface SelectionReplacedPayload {
  success: boolean;
}

// Event emitters
export const emitHotkeyPressed = createEventEmitter<void>(HOTKEY_PRESSED);
export const emitSelectionCaptured = createEventEmitter<SystemSelection>(SELECTION_CAPTURED);
export const emitSelectionReplaced = createEventEmitter<SelectionReplacedPayload>(SELECTION_REPLACED);
