"use strict";
/**
 * Database Manager
 *
 * Provides a centralized database connection for all Concepts.
 * Each Concept defines its own schema in schema.sql, which is loaded on initialization.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDatabase = initializeDatabase;
exports.getDatabase = getDatabase;
exports.closeDatabase = closeDatabase;
exports.runSQL = runSQL;
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
let db = null;
/**
 * Initialize the database and load all Concept schemas
 */
function initializeDatabase(dbPath) {
    if (db) {
        return db;
    }
    // Create database
    db = new better_sqlite3_1.default(dbPath);
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
function getDatabase() {
    if (!db) {
        throw new Error('Database not initialized. Call initializeDatabase first.');
    }
    return db;
}
/**
 * Close the database connection
 */
function closeDatabase() {
    if (db) {
        db.close();
        db = null;
    }
}
/**
 * Run a migration or one-off SQL statement
 */
function runSQL(sql) {
    const database = getDatabase();
    database.exec(sql);
}
