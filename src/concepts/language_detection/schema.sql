-- Language Detection Concept Schema
-- Stores language detection results for snippets

CREATE TABLE IF NOT EXISTS language_detections (
  id TEXT PRIMARY KEY,
  snippet_id TEXT NOT NULL,
  lang TEXT NOT NULL,
  confidence REAL NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (snippet_id) REFERENCES captured_snippets(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_language_detections_snippet_id
  ON language_detections(snippet_id);
