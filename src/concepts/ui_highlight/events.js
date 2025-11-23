"use strict";
/**
 * UI Highlight Concept - Events
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitSuggestionsUpdated = exports.emitIssuesUpdated = exports.emitSessionCreated = exports.SUGGESTIONS_UPDATED = exports.ISSUES_UPDATED = exports.SESSION_CREATED = void 0;
const event_bus_1 = require("../../lib/event-bus");
// Event names
exports.SESSION_CREATED = 'ui_highlight.session_created';
exports.ISSUES_UPDATED = 'ui_highlight.issues_updated';
exports.SUGGESTIONS_UPDATED = 'ui_highlight.suggestions_updated';
// Event emitters
exports.emitSessionCreated = (0, event_bus_1.createEventEmitter)(exports.SESSION_CREATED);
exports.emitIssuesUpdated = (0, event_bus_1.createEventEmitter)(exports.ISSUES_UPDATED);
exports.emitSuggestionsUpdated = (0, event_bus_1.createEventEmitter)(exports.SUGGESTIONS_UPDATED);
