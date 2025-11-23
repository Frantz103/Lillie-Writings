"use strict";
/**
 * Synchronization: Analysis Engine Pro → UI Highlight
 *
 * Listens for suggestions_created events and updates the UI session.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerAnalysisProToUIHighlight = registerAnalysisProToUIHighlight;
const event_bus_1 = require("../lib/event-bus");
const events_1 = require("../concepts/analysis_engine_pro/events");
const actions_1 = require("../concepts/ui_highlight/actions");
const queries_1 = require("../concepts/ui_highlight/queries");
function registerAnalysisProToUIHighlight() {
    event_bus_1.eventBus.subscribe(events_1.SUGGESTIONS_CREATED, async (payload) => {
        const session = (0, queries_1.getSessionBySnippetId)(payload.snippetId);
        if (!session) {
            console.error('UI session not found for snippet:', payload.snippetId);
            return;
        }
        // Update session state
        (0, actions_1.setSessionState)(session.id, 'showing_issues');
        // Send suggestions to UI
        (0, actions_1.setProSuggestionsForSession)(session.id, payload.suggestions);
    });
}
