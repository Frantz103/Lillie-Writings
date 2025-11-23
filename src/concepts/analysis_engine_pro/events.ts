/**
 * Analysis Engine Pro Concept - Events
 */

import { createEventEmitter } from '../../lib/event-bus';
import { ProSuggestion } from './types';

// Event names
export const SUGGESTIONS_CREATED = 'analysis_pro.suggestions_created';

// Event payload types
export interface SuggestionsCreatedPayload {
  snippetId: string;
  suggestions: ProSuggestion[];
}

// Event emitters
export const emitSuggestionsCreated = createEventEmitter<SuggestionsCreatedPayload>(SUGGESTIONS_CREATED);
