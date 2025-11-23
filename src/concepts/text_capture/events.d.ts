/**
 * Text Capture Concept - Events
 */
import { CapturedSnippet } from './types';
export declare const SNIPPET_CREATED = "text_capture.snippet_created";
export declare const emitSnippetCreated: (payload: CapturedSnippet) => Promise<void>;
