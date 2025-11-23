/**
 * Text Capture Concept - Types
 */

export interface CapturedSnippet {
  id: string;
  sourceApp: string | null;
  content: string;
  createdAt: Date;
}
