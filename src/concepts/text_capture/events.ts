/**
 * Text Capture Concept - Events
 */

import { createEventEmitter } from '../../lib/event-bus';
import { CapturedSnippet } from './types';

// Event names
export const SNIPPET_CREATED = 'text_capture.snippet_created';

// Event emitters
export const emitSnippetCreated = createEventEmitter<CapturedSnippet>(SNIPPET_CREATED);
