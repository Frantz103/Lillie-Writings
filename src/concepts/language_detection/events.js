"use strict";
/**
 * Language Detection Concept - Events
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitLanguageDetected = exports.LANGUAGE_DETECTED = void 0;
const event_bus_1 = require("../../lib/event-bus");
// Event names
exports.LANGUAGE_DETECTED = 'language_detection.detected';
// Event emitters
exports.emitLanguageDetected = (0, event_bus_1.createEventEmitter)(exports.LANGUAGE_DETECTED);
