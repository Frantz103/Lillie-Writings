"use strict";
/**
 * Synchronization: System Integration → Text Capture
 *
 * Listens for selection_captured events and creates captured snippets and UI sessions.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSystemToTextCapture = registerSystemToTextCapture;
const event_bus_1 = require("../lib/event-bus");
const events_1 = require("../concepts/system_integration/events");
const actions_1 = require("../concepts/text_capture/actions");
const actions_2 = require("../concepts/ui_highlight/actions");
function registerSystemToTextCapture() {
    event_bus_1.eventBus.subscribe(events_1.SELECTION_CAPTURED, async (selection) => {
        // Create a captured snippet
        const snippet = (0, actions_1.createCapturedSnippet)({
            content: selection.content,
            sourceApp: selection.sourceApp,
        });
        // Create a UI session for this snippet
        (0, actions_2.createSession)(snippet.id);
    });
}
