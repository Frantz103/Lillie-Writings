-- Text Capture Concept Schema
-- Owns the canonical representation of captured text snippets

CREATE TABLE IF NOT EXISTS captured_snippets (
  id TEXT PRIMARY KEY,
  source_app TEXT,
  content TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_captured_snippets_created_at
  ON captured_snippets(created_at);
