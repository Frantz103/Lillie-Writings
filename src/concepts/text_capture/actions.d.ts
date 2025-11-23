/**
 * Text Capture Concept - Actions
 */
import { CapturedSnippet } from './types';
export interface CreateCapturedSnippetInput {
    content: string;
    sourceApp?: string | null;
}
export declare function createCapturedSnippet(input: CreateCapturedSnippetInput): CapturedSnippet;
