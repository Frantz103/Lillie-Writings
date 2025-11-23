"use strict";
/**
 * Synchronization: Analysis Engine Lite → UI Highlight
 *
 * Listens for issues_created events and updates the UI session.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerAnalysisLiteToUIHighlight = registerAnalysisLiteToUIHighlight;
const event_bus_1 = require("../lib/event-bus");
const events_1 = require("../concepts/analysis_engine_lite/events");
const actions_1 = require("../concepts/ui_highlight/actions");
const queries_1 = require("../concepts/ui_highlight/queries");
function registerAnalysisLiteToUIHighlight() {
    event_bus_1.eventBus.subscribe(events_1.ISSUES_CREATED, async (payload) => {
        const session = (0, queries_1.getSessionBySnippetId)(payload.snippetId);
        if (!session) {
            console.error('UI session not found for snippet:', payload.snippetId);
            return;
        }
        // Update session state
        (0, actions_1.setSessionState)(session.id, 'showing_issues');
        // Send issues to UI
        (0, actions_1.setLiteIssuesForSession)(session.id, payload.issues);
    });
}
