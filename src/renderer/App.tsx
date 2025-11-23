/**
 * Main App Component
 */

import React, { useState, useEffect } from 'react';
import { EditorView } from './components/EditorView';
import { LiteIssue } from '../concepts/analysis_engine_lite/types';
import { ProSuggestion } from '../concepts/analysis_engine_pro/types';
import { UISession } from '../concepts/ui_highlight/types';

interface AppState {
  session: UISession | null;
  text: string;
  issues: LiteIssue[];
  suggestions: ProSuggestion[];
}

export const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    session: null,
    text: '',
    issues: [],
    suggestions: [],
  });

  useEffect(() => {
    // Listen for events from the backend
    window.electronAPI.onConceptEvent((event) => {
      console.log('Received event:', event.eventName, event.payload);

      switch (event.eventName) {
        case 'ui_highlight.session_created':
          // New session created with snippet content
          setState((prev) => ({
            ...prev,
            session: event.payload,
            text: event.payload.snippet?.content || '',
          }));
          break;

        case 'ui_highlight.issues_updated':
          setState((prev) => ({
            ...prev,
            issues: event.payload.issues,
            text: prev.text || event.payload.snippet?.content || '',
          }));
          break;

        case 'ui_highlight.suggestions_updated':
          setState((prev) => ({
            ...prev,
            suggestions: event.payload.suggestions,
            text: prev.text || event.payload.snippet?.content || '',
          }));
          break;
      }
    });
  }, []);

  const handleClose = () => {
    window.electronAPI.closeWindow();
  };

  const handleApply = () => {
    window.electronAPI.applyText(state.text);
  };

  const handleTextChange = (newText: string) => {
    setState((prev) => ({ ...prev, text: newText }));
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <EditorView
        text={state.text}
        issues={state.issues}
        suggestions={state.suggestions}
        onTextChange={handleTextChange}
        onClose={handleClose}
        onApply={handleApply}
      />
    </div>
  );
};
