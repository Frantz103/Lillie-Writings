/**
 * Language Detection Concept - Events
 */

import { createEventEmitter } from '../../lib/event-bus';
import { DetectedLanguage } from './types';

// Event names
export const LANGUAGE_DETECTED = 'language_detection.detected';

// Event emitters
export const emitLanguageDetected = createEventEmitter<DetectedLanguage>(LANGUAGE_DETECTED);
