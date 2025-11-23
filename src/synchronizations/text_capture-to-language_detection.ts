/**
 * Synchronization: Text Capture → Language Detection
 *
 * Listens for snippet_created events and triggers language detection.
 */

import { eventBus } from '../lib/event-bus';
import { SNIPPET_CREATED } from '../concepts/text_capture/events';
import { CapturedSnippet } from '../concepts/text_capture/types';
import { detectLanguageForSnippet } from '../concepts/language_detection/actions';

export function registerTextCaptureToLanguageDetection() {
  eventBus.subscribe<CapturedSnippet>(SNIPPET_CREATED, async (snippet) => {
    await detectLanguageForSnippet(snippet);
  });
}
