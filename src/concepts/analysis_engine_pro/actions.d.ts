/**
 * Analysis Engine Pro Concept - Actions
 */
import { CapturedSnippet } from '../text_capture/types';
import { SupportedLanguage } from '../language_detection/types';
import { ProSuggestion, TonePreference } from './types';
export interface GenerateSuggestionsParams {
    snippet: CapturedSnippet;
    lang: SupportedLanguage;
    tone?: TonePreference;
}
export declare function generateSuggestions(params: GenerateSuggestionsParams): Promise<ProSuggestion[]>;
