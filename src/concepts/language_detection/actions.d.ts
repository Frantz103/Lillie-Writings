/**
 * Language Detection Concept - Actions
 */
import { CapturedSnippet } from '../text_capture/types';
import { DetectedLanguage } from './types';
export declare function detectLanguageForSnippet(snippet: CapturedSnippet): Promise<DetectedLanguage>;
