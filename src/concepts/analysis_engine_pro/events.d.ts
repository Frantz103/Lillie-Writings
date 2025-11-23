/**
 * Analysis Engine Pro Concept - Events
 */
import { ProSuggestion } from './types';
export declare const SUGGESTIONS_CREATED = "analysis_pro.suggestions_created";
export interface SuggestionsCreatedPayload {
    snippetId: string;
    suggestions: ProSuggestion[];
}
export declare const emitSuggestionsCreated: (payload: SuggestionsCreatedPayload) => Promise<void>;
