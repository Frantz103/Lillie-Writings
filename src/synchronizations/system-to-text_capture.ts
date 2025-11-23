/**
 * Synchronization: System Integration → Text Capture
 *
 * Listens for selection_captured events and creates captured snippets and UI sessions.
 */

import { eventBus } from '../lib/event-bus';
import { SELECTION_CAPTURED } from '../concepts/system_integration/events';
import { SystemSelection } from '../concepts/system_integration/types';
import { createCapturedSnippet } from '../concepts/text_capture/actions';
import { createSession } from '../concepts/ui_highlight/actions';

export function registerSystemToTextCapture() {
  eventBus.subscribe<SystemSelection>(SELECTION_CAPTURED, async (selection) => {
    // Create a captured snippet
    const snippet = createCapturedSnippet({
      content: selection.content,
      sourceApp: selection.sourceApp,
    });

    // Create a UI session for this snippet
    createSession(snippet.id);
  });
}
