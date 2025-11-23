/**
 * Synchronization: Analysis Engine Pro → UI Highlight
 *
 * Listens for suggestions_created events and updates the UI session.
 */

import { eventBus } from '../lib/event-bus';
import { SUGGESTIONS_CREATED, SuggestionsCreatedPayload } from '../concepts/analysis_engine_pro/events';
import { setProSuggestionsForSession, setSessionState } from '../concepts/ui_highlight/actions';
import { getSessionBySnippetId } from '../concepts/ui_highlight/queries';

export function registerAnalysisProToUIHighlight() {
  eventBus.subscribe<SuggestionsCreatedPayload>(SUGGESTIONS_CREATED, async (payload) => {
    const session = getSessionBySnippetId(payload.snippetId);

    if (!session) {
      console.error('UI session not found for snippet:', payload.snippetId);
      return;
    }

    // Update session state
    setSessionState(session.id, 'showing_issues');

    // Send suggestions to UI
    setProSuggestionsForSession(session.id, payload.suggestions);
  });
}
