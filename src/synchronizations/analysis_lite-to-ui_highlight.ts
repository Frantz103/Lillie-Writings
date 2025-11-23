/**
 * Synchronization: Analysis Engine Lite → UI Highlight
 *
 * Listens for issues_created events and updates the UI session.
 */

import { eventBus } from '../lib/event-bus';
import { ISSUES_CREATED, IssuesCreatedPayload } from '../concepts/analysis_engine_lite/events';
import { setLiteIssuesForSession, setSessionState } from '../concepts/ui_highlight/actions';
import { getSessionBySnippetId } from '../concepts/ui_highlight/queries';

export function registerAnalysisLiteToUIHighlight() {
  eventBus.subscribe<IssuesCreatedPayload>(ISSUES_CREATED, async (payload) => {
    const session = getSessionBySnippetId(payload.snippetId);

    if (!session) {
      console.error('UI session not found for snippet:', payload.snippetId);
      return;
    }

    // Update session state
    setSessionState(session.id, 'showing_issues');

    // Send issues to UI
    setLiteIssuesForSession(session.id, payload.issues);
  });
}
