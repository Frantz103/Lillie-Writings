"use strict";
/**
 * Analysis Engine Lite Concept - Events
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitIssuesCreated = exports.ISSUES_CREATED = void 0;
const event_bus_1 = require("../../lib/event-bus");
// Event names
exports.ISSUES_CREATED = 'analysis_lite.issues_created';
// Event emitters
exports.emitIssuesCreated = (0, event_bus_1.createEventEmitter)(exports.ISSUES_CREATED);
