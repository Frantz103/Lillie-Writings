/**
 * Database Manager
 *
 * Provides a centralized database connection for all Concepts.
 * Each Concept defines its own schema in schema.sql, which is loaded on initialization.
 */
import Database from 'better-sqlite3';
/**
 * Initialize the database and load all Concept schemas
 */
export declare function initializeDatabase(dbPath: string): Database.Database;
/**
 * Get the database instance
 */
export declare function getDatabase(): Database.Database;
/**
 * Close the database connection
 */
export declare function closeDatabase(): void;
/**
 * Run a migration or one-off SQL statement
 */
export declare function runSQL(sql: string): void;
