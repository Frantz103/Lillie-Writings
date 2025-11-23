"use strict";
/**
 * System Integration Concept - Events
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitSelectionReplaced = exports.emitSelectionCaptured = exports.emitHotkeyPressed = exports.SELECTION_REPLACED = exports.SELECTION_CAPTURED = exports.HOTKEY_PRESSED = void 0;
const event_bus_1 = require("../../lib/event-bus");
// Event names
exports.HOTKEY_PRESSED = 'system_integration.hotkey_pressed';
exports.SELECTION_CAPTURED = 'system_integration.selection_captured';
exports.SELECTION_REPLACED = 'system_integration.selection_replaced';
// Event emitters
exports.emitHotkeyPressed = (0, event_bus_1.createEventEmitter)(exports.HOTKEY_PRESSED);
exports.emitSelectionCaptured = (0, event_bus_1.createEventEmitter)(exports.SELECTION_CAPTURED);
exports.emitSelectionReplaced = (0, event_bus_1.createEventEmitter)(exports.SELECTION_REPLACED);
