"use strict";
/**
 * Synchronization: Text Capture → Language Detection
 *
 * Listens for snippet_created events and triggers language detection.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerTextCaptureToLanguageDetection = registerTextCaptureToLanguageDetection;
const event_bus_1 = require("../lib/event-bus");
const events_1 = require("../concepts/text_capture/events");
const actions_1 = require("../concepts/language_detection/actions");
function registerTextCaptureToLanguageDetection() {
    event_bus_1.eventBus.subscribe(events_1.SNIPPET_CREATED, async (snippet) => {
        await (0, actions_1.detectLanguageForSnippet)(snippet);
    });
}
