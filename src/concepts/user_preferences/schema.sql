-- User Preferences Concept Schema
-- Stores user settings and preferences

CREATE TABLE IF NOT EXISTS user_preferences (
  id TEXT PRIMARY KEY DEFAULT 'singleton',
  default_lang TEXT DEFAULT 'auto',
  tone TEXT DEFAULT 'neutral',
  shortcut TEXT DEFAULT 'Control+Option+L',
  mode TEXT DEFAULT 'lite',
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  CHECK (id = 'singleton'),
  CHECK (default_lang IN ('auto', 'en', 'fr')),
  CHECK (tone IN ('neutral', 'formal', 'friendly')),
  CHECK (mode IN ('lite', 'pro', 'auto'))
);

-- Insert default preferences
INSERT OR IGNORE INTO user_preferences (id) VALUES ('singleton');
