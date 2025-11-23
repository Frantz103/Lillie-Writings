/**
 * Synchronization: Language Detection → Analysis
 *
 * Listens for language_detected events and triggers analysis based on the current mode.
 */

import { eventBus } from '../lib/event-bus';
import { LANGUAGE_DETECTED } from '../concepts/language_detection/events';
import { DetectedLanguage } from '../concepts/language_detection/types';
import { getMode } from '../concepts/analysis_mode/queries';
import { analyzeSnippet } from '../concepts/analysis_engine_lite/actions';
import { generateSuggestions } from '../concepts/analysis_engine_pro/actions';
import { getSnippetById } from '../concepts/text_capture/queries';

export function registerLanguageDetectionToAnalysis() {
  eventBus.subscribe<DetectedLanguage>(LANGUAGE_DETECTED, async (detection) => {
    const mode = getMode();
    const snippet = getSnippetById(detection.snippetId);

    if (!snippet) {
      console.error('Snippet not found for language detection:', detection.snippetId);
      return;
    }

    // Trigger analysis based on mode
    if (mode === 'lite' || mode === 'auto') {
      await analyzeSnippet({
        snippet,
        lang: detection.lang,
      });
    }

    if (mode === 'pro') {
      await generateSuggestions({
        snippet,
        lang: detection.lang,
      });
    }
  });
}
