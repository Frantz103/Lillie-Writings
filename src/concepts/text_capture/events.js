"use strict";
/**
 * Text Capture Concept - Events
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitSnippetCreated = exports.SNIPPET_CREATED = void 0;
const event_bus_1 = require("../../lib/event-bus");
// Event names
exports.SNIPPET_CREATED = 'text_capture.snippet_created';
// Event emitters
exports.emitSnippetCreated = (0, event_bus_1.createEventEmitter)(exports.SNIPPET_CREATED);
