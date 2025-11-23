/**
 * User Preferences Concept - Events
 */
import { UserPreferences } from './types';
export declare const PREFERENCES_UPDATED = "user_preferences.updated";
export declare const emitPreferencesUpdated: (payload: UserPreferences) => Promise<void>;
