-- Analysis Engine Lite Concept Schema
-- Stores issues detected by BERT-like models

CREATE TABLE IF NOT EXISTS lite_issues (
  id TEXT PRIMARY KEY,
  snippet_id TEXT NOT NULL,
  start_index INTEGER NOT NULL,
  end_index INTEGER NOT NULL,
  issue_type TEXT NOT NULL,
  message TEXT NOT NULL,
  confidence REAL NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (snippet_id) REFERENCES captured_snippets(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_lite_issues_snippet_id
  ON lite_issues(snippet_id);

CREATE INDEX IF NOT EXISTS idx_lite_issues_type
  ON lite_issues(issue_type);
