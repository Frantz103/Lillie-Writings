/**
 * UI Highlight Concept - Events
 */
import { UISession } from './types';
import { LiteIssue } from '../analysis_engine_lite/types';
import { ProSuggestion } from '../analysis_engine_pro/types';
export declare const SESSION_CREATED = "ui_highlight.session_created";
export declare const ISSUES_UPDATED = "ui_highlight.issues_updated";
export declare const SUGGESTIONS_UPDATED = "ui_highlight.suggestions_updated";
export interface IssuesUpdatedPayload {
    sessionId: string;
    issues: LiteIssue[];
}
export interface SuggestionsUpdatedPayload {
    sessionId: string;
    suggestions: ProSuggestion[];
}
export declare const emitSessionCreated: (payload: UISession) => Promise<void>;
export declare const emitIssuesUpdated: (payload: IssuesUpdatedPayload) => Promise<void>;
export declare const emitSuggestionsUpdated: (payload: SuggestionsUpdatedPayload) => Promise<void>;
