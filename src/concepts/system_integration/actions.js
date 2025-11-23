"use strict";
/**
 * System Integration Concept - Actions
 *
 * This concept interfaces with macOS through Electron APIs.
 * It will be fully implemented in the main process setup.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.captureSelection = captureSelection;
exports.replaceSelection = replaceSelection;
exports.onSelectionCaptured = onSelectionCaptured;
exports.onSelectionReplaced = onSelectionReplaced;
const events_1 = require("./events");
/**
 * Capture the current selection from the focused application
 * This is a placeholder - actual implementation will be in the Electron main process
 */
async function captureSelection() {
    // This will be implemented in the Electron main process
    // For now, return null
    return null;
}
/**
 * Replace the current selection with new text
 * This is a placeholder - actual implementation will be in the Electron main process
 */
async function replaceSelection(newText) {
    // This will be implemented in the Electron main process
    // For now, do nothing
    console.log('Replace selection with:', newText);
}
/**
 * Called by the main process when selection is captured
 */
async function onSelectionCaptured(selection) {
    await (0, events_1.emitSelectionCaptured)(selection);
}
/**
 * Called by the main process when selection is replaced
 */
async function onSelectionReplaced(success) {
    await (0, events_1.emitSelectionReplaced)({ success });
}
