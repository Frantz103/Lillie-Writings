-- UI Highlight Concept Schema
-- Stores UI session state and associated issues/suggestions

CREATE TABLE IF NOT EXISTS ui_sessions (
  id TEXT PRIMARY KEY,
  snippet_id TEXT NOT NULL,
  state TEXT NOT NULL DEFAULT 'idle',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (snippet_id) REFERENCES captured_snippets(id) ON DELETE CASCADE,
  CHECK (state IN ('idle', 'analyzing', 'showing_issues', 'error'))
);

CREATE INDEX IF NOT EXISTS idx_ui_sessions_snippet_id
  ON ui_sessions(snippet_id);

CREATE INDEX IF NOT EXISTS idx_ui_sessions_state
  ON ui_sessions(state);
