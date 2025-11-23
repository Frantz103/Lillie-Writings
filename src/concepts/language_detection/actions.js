"use strict";
/**
 * Language Detection Concept - Actions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectLanguageForSnippet = detectLanguageForSnippet;
const franc_min_1 = require("franc-min");
const database_1 = require("../../lib/database");
const uuid_1 = require("../../lib/uuid");
const events_1 = require("./events");
async function detectLanguageForSnippet(snippet) {
    const db = (0, database_1.getDatabase)();
    const id = (0, uuid_1.generateId)();
    const createdAt = new Date();
    // Use franc for language detection
    const detectedCode = (0, franc_min_1.franc)(snippet.content, { minLength: 3 });
    // Map franc codes to our supported languages
    let lang;
    let confidence;
    if (detectedCode === 'eng') {
        lang = 'en';
        confidence = 0.9;
    }
    else if (detectedCode === 'fra') {
        lang = 'fr';
        confidence = 0.9;
    }
    else {
        // Default to English if unknown
        lang = 'en';
        confidence = 0.5;
    }
    const stmt = db.prepare(`
    INSERT INTO language_detections (id, snippet_id, lang, confidence, created_at)
    VALUES (?, ?, ?, ?, ?)
  `);
    stmt.run(id, snippet.id, lang, confidence, createdAt.toISOString());
    const detection = {
        id,
        snippetId: snippet.id,
        lang,
        confidence,
        createdAt,
    };
    // Emit event
    await (0, events_1.emitLanguageDetected)(detection);
    return detection;
}
