/**
 * Database Manager
 *
 * Provides a centralized database connection for all Concepts.
 * Each Concept defines its own schema in schema.sql, which is loaded on initialization.
 */

import Database from 'better-sqlite3';
import * as path from 'path';
import * as fs from 'fs';

let db: Database.Database | null = null;

/**
 * Initialize the database and load all Concept schemas
 */
export function initializeDatabase(dbPath: string): Database.Database {
  if (db) {
    return db;
  }

  // Create database
  db = new Database(dbPath);

  // Enable foreign keys
  db.pragma('foreign_keys = ON');

  // Load schemas from all Concepts
  const conceptsDir = path.join(__dirname, '..', 'concepts');
  const concepts = fs.readdirSync(conceptsDir);

  for (const concept of concepts) {
    const schemaPath = path.join(conceptsDir, concept, 'schema.sql');
    if (fs.existsSync(schemaPath)) {
      const schema = fs.readFileSync(schemaPath, 'utf-8');
      db.exec(schema);
      console.log(`Loaded schema for concept: ${concept}`);
    }
  }

  return db;
}

/**
 * Get the database instance
 */
export function getDatabase(): Database.Database {
  if (!db) {
    throw new Error('Database not initialized. Call initializeDatabase first.');
  }
  return db;
}

/**
 * Close the database connection
 */
export function closeDatabase(): void {
  if (db) {
    db.close();
    db = null;
  }
}

/**
 * Run a migration or one-off SQL statement
 */
export function runSQL(sql: string): void {
  const database = getDatabase();
  database.exec(sql);
}
