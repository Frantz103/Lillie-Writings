/**
 * Language Detection Concept - Actions
 */

import { franc } from 'franc-min';
import { getDatabase } from '../../lib/database';
import { generateId } from '../../lib/uuid';
import { CapturedSnippet } from '../text_capture/types';
import { DetectedLanguage, SupportedLanguage } from './types';
import { emitLanguageDetected } from './events';

export async function detectLanguageForSnippet(snippet: CapturedSnippet): Promise<DetectedLanguage> {
  const db = getDatabase();
  const id = generateId();
  const createdAt = new Date();

  // Use franc for language detection
  const detectedCode = franc(snippet.content, { minLength: 3 });

  // Map franc codes to our supported languages
  let lang: SupportedLanguage;
  let confidence: number;

  if (detectedCode === 'eng') {
    lang = 'en';
    confidence = 0.9;
  } else if (detectedCode === 'fra') {
    lang = 'fr';
    confidence = 0.9;
  } else {
    // Default to English if unknown
    lang = 'en';
    confidence = 0.5;
  }

  const stmt = db.prepare(`
    INSERT INTO language_detections (id, snippet_id, lang, confidence, created_at)
    VALUES (?, ?, ?, ?, ?)
  `);

  stmt.run(id, snippet.id, lang, confidence, createdAt.toISOString());

  const detection: DetectedLanguage = {
    id,
    snippetId: snippet.id,
    lang,
    confidence,
    createdAt,
  };

  // Emit event
  await emitLanguageDetected(detection);

  return detection;
}
