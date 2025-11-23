"use strict";
/**
 * Analysis Engine Pro Concept - Events
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitSuggestionsCreated = exports.SUGGESTIONS_CREATED = void 0;
const event_bus_1 = require("../../lib/event-bus");
// Event names
exports.SUGGESTIONS_CREATED = 'analysis_pro.suggestions_created';
// Event emitters
exports.emitSuggestionsCreated = (0, event_bus_1.createEventEmitter)(exports.SUGGESTIONS_CREATED);
