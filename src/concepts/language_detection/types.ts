/**
 * Language Detection Concept - Types
 */

export type SupportedLanguage = "en" | "fr";

export interface DetectedLanguage {
  id: string;
  snippetId: string;
  lang: SupportedLanguage;
  confidence: number;
  createdAt: Date;
}
