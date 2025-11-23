"use strict";
/**
 * Synchronization: Language Detection → Analysis
 *
 * Listens for language_detected events and triggers analysis based on the current mode.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerLanguageDetectionToAnalysis = registerLanguageDetectionToAnalysis;
const event_bus_1 = require("../lib/event-bus");
const events_1 = require("../concepts/language_detection/events");
const queries_1 = require("../concepts/analysis_mode/queries");
const actions_1 = require("../concepts/analysis_engine_lite/actions");
const actions_2 = require("../concepts/analysis_engine_pro/actions");
const queries_2 = require("../concepts/text_capture/queries");
function registerLanguageDetectionToAnalysis() {
    event_bus_1.eventBus.subscribe(events_1.LANGUAGE_DETECTED, async (detection) => {
        const mode = (0, queries_1.getMode)();
        const snippet = (0, queries_2.getSnippetById)(detection.snippetId);
        if (!snippet) {
            console.error('Snippet not found for language detection:', detection.snippetId);
            return;
        }
        // Trigger analysis based on mode
        if (mode === 'lite' || mode === 'auto') {
            await (0, actions_1.analyzeSnippet)({
                snippet,
                lang: detection.lang,
            });
        }
        if (mode === 'pro') {
            await (0, actions_2.generateSuggestions)({
                snippet,
                lang: detection.lang,
            });
        }
    });
}
