/**
 * UI Highlight Concept - Actions
 */
import { UISession, UISessionState } from './types';
import { LiteIssue } from '../analysis_engine_lite/types';
import { ProSuggestion } from '../analysis_engine_pro/types';
export declare function createSession(snippetId: string): UISession;
export declare function setSessionState(sessionId: string, state: UISessionState): void;
export declare function setLiteIssuesForSession(sessionId: string, issues: LiteIssue[]): void;
export declare function setProSuggestionsForSession(sessionId: string, suggestions: ProSuggestion[]): void;
