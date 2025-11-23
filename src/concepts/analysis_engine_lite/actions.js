"use strict";
/**
 * Analysis Engine Lite Concept - Actions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeSnippet = analyzeSnippet;
const database_1 = require("../../lib/database");
const uuid_1 = require("../../lib/uuid");
const events_1 = require("./events");
async function analyzeSnippet(params) {
    const db = (0, database_1.getDatabase)();
    const issues = [];
    // For now, generate dummy issues for the first milestone
    // In a future milestone, this will be replaced with actual BERT model inference
    const dummyIssues = generateDummyIssues(params.snippet);
    const stmt = db.prepare(`
    INSERT INTO lite_issues (id, snippet_id, start_index, end_index, issue_type, message, confidence, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
    for (const issue of dummyIssues) {
        stmt.run(issue.id, issue.snippetId, issue.startIndex, issue.endIndex, issue.type, issue.message, issue.confidence, issue.createdAt.toISOString());
        issues.push(issue);
    }
    // Emit event
    await (0, events_1.emitIssuesCreated)({
        snippetId: params.snippet.id,
        issues,
    });
    return issues;
}
/**
 * Generate dummy issues for testing
 * This will be replaced with actual model inference in a future milestone
 */
function generateDummyIssues(snippet) {
    const issues = [];
    const words = snippet.content.split(/\s+/);
    // Create a dummy issue for every 5th word
    let charIndex = 0;
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        if (i % 5 === 4 && word.length > 0) {
            issues.push({
                id: (0, uuid_1.generateId)(),
                snippetId: snippet.id,
                startIndex: charIndex,
                endIndex: charIndex + word.length,
                type: 'grammar',
                message: `Possible grammar issue with "${word}"`,
                confidence: 0.7,
                createdAt: new Date(),
            });
        }
        charIndex += word.length + 1; // +1 for space
    }
    return issues;
}
