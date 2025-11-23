"use strict";
/**
 * User Preferences Concept - Events
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitPreferencesUpdated = exports.PREFERENCES_UPDATED = void 0;
const event_bus_1 = require("../../lib/event-bus");
// Event names
exports.PREFERENCES_UPDATED = 'user_preferences.updated';
// Event emitters
exports.emitPreferencesUpdated = (0, event_bus_1.createEventEmitter)(exports.PREFERENCES_UPDATED);
