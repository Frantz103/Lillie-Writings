/**
 * Analysis Engine Lite Concept - Events
 */
import { LiteIssue } from './types';
export declare const ISSUES_CREATED = "analysis_lite.issues_created";
export interface IssuesCreatedPayload {
    snippetId: string;
    issues: LiteIssue[];
}
export declare const emitIssuesCreated: (payload: IssuesCreatedPayload) => Promise<void>;
