/**
 * Editor View Component
 *
 * Displays captured text with highlights for issues and suggestions.
 */

import React from 'react';
import { LiteIssue } from '../../concepts/analysis_engine_lite/types';
import { ProSuggestion } from '../../concepts/analysis_engine_pro/types';

interface EditorViewProps {
  text: string;
  issues: LiteIssue[];
  suggestions: ProSuggestion[];
  onTextChange: (text: string) => void;
  onClose: () => void;
  onApply: () => void;
}

export const EditorView: React.FC<EditorViewProps> = ({
  text,
  issues,
  suggestions,
  onTextChange,
  onClose,
  onApply,
}) => {
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onTextChange(e.target.value);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Lillie Writings</h2>
        <div style={styles.headerButtons}>
          <button onClick={onClose} style={styles.closeButton}>
            Close (Esc)
          </button>
        </div>
      </div>

      <div style={styles.editorContainer}>
        <textarea
          value={text}
          onChange={handleTextAreaChange}
          style={styles.textarea}
          placeholder="Text will appear here after you press the global shortcut..."
        />
      </div>

      <div style={styles.issuesPanel}>
        <h3 style={styles.issuesTitle}>
          Issues Found: {issues.length}
        </h3>
        <div style={styles.issuesList}>
          {issues.map((issue) => (
            <div key={issue.id} style={styles.issueItem}>
              <div style={styles.issueType}>{issue.type}</div>
              <div style={styles.issueMessage}>{issue.message}</div>
              <div style={styles.issueConfidence}>
                {Math.round(issue.confidence * 100)}% confidence
              </div>
            </div>
          ))}
          {issues.length === 0 && (
            <div style={styles.noIssues}>
              No issues detected. Press the global shortcut to analyze text.
            </div>
          )}
        </div>
      </div>

      <div style={styles.footer}>
        <button onClick={onApply} style={styles.applyButton}>
          Apply to Clipboard
        </button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: '16px',
    backgroundColor: '#4a90e2',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: '18px',
    fontWeight: 600,
    margin: 0,
  },
  headerButtons: {
    display: 'flex',
    gap: '8px',
  },
  closeButton: {
    padding: '6px 12px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    border: 'none',
    borderRadius: '4px',
    color: 'white',
    cursor: 'pointer',
    fontSize: '14px',
  },
  editorContainer: {
    flex: 1,
    padding: '16px',
    overflow: 'auto',
  },
  textarea: {
    width: '100%',
    height: '100%',
    padding: '12px',
    fontSize: '16px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    border: '1px solid #ddd',
    borderRadius: '4px',
    resize: 'none',
    outline: 'none',
  },
  issuesPanel: {
    padding: '16px',
    backgroundColor: 'white',
    borderTop: '1px solid #ddd',
    maxHeight: '200px',
    overflow: 'auto',
  },
  issuesTitle: {
    fontSize: '14px',
    fontWeight: 600,
    marginBottom: '12px',
    color: '#333',
  },
  issuesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  issueItem: {
    padding: '8px',
    backgroundColor: '#fff3cd',
    border: '1px solid #ffc107',
    borderRadius: '4px',
    fontSize: '13px',
  },
  issueType: {
    fontWeight: 600,
    color: '#856404',
    textTransform: 'capitalize',
    marginBottom: '4px',
  },
  issueMessage: {
    color: '#333',
    marginBottom: '4px',
  },
  issueConfidence: {
    fontSize: '11px',
    color: '#666',
  },
  noIssues: {
    padding: '12px',
    textAlign: 'center',
    color: '#999',
    fontSize: '14px',
  },
  footer: {
    padding: '16px',
    backgroundColor: 'white',
    borderTop: '1px solid #ddd',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  applyButton: {
    padding: '8px 16px',
    backgroundColor: '#4a90e2',
    border: 'none',
    borderRadius: '4px',
    color: 'white',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 500,
  },
};
