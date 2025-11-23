/**
 * Analysis Engine Lite Concept - Actions
 */
import { CapturedSnippet } from '../text_capture/types';
import { SupportedLanguage } from '../language_detection/types';
import { LiteIssue } from './types';
export interface AnalyzeSnippetParams {
    snippet: CapturedSnippet;
    lang: SupportedLanguage;
}
export declare function analyzeSnippet(params: AnalyzeSnippetParams): Promise<LiteIssue[]>;
