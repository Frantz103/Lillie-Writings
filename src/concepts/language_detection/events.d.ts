/**
 * Language Detection Concept - Events
 */
import { DetectedLanguage } from './types';
export declare const LANGUAGE_DETECTED = "language_detection.detected";
export declare const emitLanguageDetected: (payload: DetectedLanguage) => Promise<void>;
