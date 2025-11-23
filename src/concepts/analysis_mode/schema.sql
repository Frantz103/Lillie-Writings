-- Analysis Mode Concept Schema
-- Stores the current analysis mode (lite, pro, or auto)

CREATE TABLE IF NOT EXISTS analysis_mode (
  id TEXT PRIMARY KEY DEFAULT 'singleton',
  mode TEXT NOT NULL DEFAULT 'lite',
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  CHECK (id = 'singleton'),
  CHECK (mode IN ('lite', 'pro', 'auto'))
);

-- Insert default mode
INSERT OR IGNORE INTO analysis_mode (id, mode) VALUES ('singleton', 'lite');
