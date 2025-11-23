/**
 * Analysis Engine Lite Concept - Events
 */

import { createEventEmitter } from '../../lib/event-bus';
import { LiteIssue } from './types';

// Event names
export const ISSUES_CREATED = 'analysis_lite.issues_created';

// Event payload types
export interface IssuesCreatedPayload {
  snippetId: string;
  issues: LiteIssue[];
}

// Event emitters
export const emitIssuesCreated = createEventEmitter<IssuesCreatedPayload>(ISSUES_CREATED);
