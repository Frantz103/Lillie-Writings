/**
 * UI Highlight Concept - Events
 */

import { createEventEmitter } from '../../lib/event-bus';
import { UISession } from './types';
import { LiteIssue } from '../analysis_engine_lite/types';
import { ProSuggestion } from '../analysis_engine_pro/types';

// Event names
export const SESSION_CREATED = 'ui_highlight.session_created';
export const ISSUES_UPDATED = 'ui_highlight.issues_updated';
export const SUGGESTIONS_UPDATED = 'ui_highlight.suggestions_updated';

// Event payload types
export interface IssuesUpdatedPayload {
  sessionId: string;
  issues: LiteIssue[];
}

export interface SuggestionsUpdatedPayload {
  sessionId: string;
  suggestions: ProSuggestion[];
}

// Event emitters
export const emitSessionCreated = createEventEmitter<UISession>(SESSION_CREATED);
export const emitIssuesUpdated = createEventEmitter<IssuesUpdatedPayload>(ISSUES_UPDATED);
export const emitSuggestionsUpdated = createEventEmitter<SuggestionsUpdatedPayload>(SUGGESTIONS_UPDATED);
