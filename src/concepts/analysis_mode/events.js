"use strict";
/**
 * Analysis Mode Concept - Events
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitModeUpdated = exports.MODE_UPDATED = void 0;
const event_bus_1 = require("../../lib/event-bus");
// Event names
exports.MODE_UPDATED = 'analysis_mode.updated';
// Event emitters
exports.emitModeUpdated = (0, event_bus_1.createEventEmitter)(exports.MODE_UPDATED);
