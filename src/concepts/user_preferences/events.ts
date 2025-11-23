/**
 * User Preferences Concept - Events
 */

import { createEventEmitter } from '../../lib/event-bus';
import { UserPreferences } from './types';

// Event names
export const PREFERENCES_UPDATED = 'user_preferences.updated';

// Event emitters
export const emitPreferencesUpdated = createEventEmitter<UserPreferences>(PREFERENCES_UPDATED);
