# UI Highlight Concept

## Purpose

Owns the state of UI sessions, managing the relationship between captured text, detected issues, and the renderer interface.

## Data Model

Stores UI session state for each captured snippet.

**Table:** `ui_sessions`
- `id`: Unique identifier
- `snippet_id`: Reference to the captured snippet
- `state`: Current state (idle, analyzing, showing_issues, error)
- `created_at`: Timestamp of creation
- `updated_at`: Timestamp of last update

## Public Actions

### `createSession(snippetId: string): UISession`

Creates a new UI session for a snippet.

**Returns:** The created `UISession` object

**Events Emitted:** `ui_highlight.session_created`

### `setSessionState(sessionId: string, state: UISessionState): void`

Updates the state of a UI session.

### `setLiteIssuesForSession(sessionId: string, issues: LiteIssue[]): void`

Associates Lite issues with a UI session and emits an event for the renderer.

**Events Emitted:** `ui_highlight.issues_updated`

### `setProSuggestionsForSession(sessionId: string, suggestions: ProSuggestion[]): void`

Associates Pro suggestions with a UI session and emits an event for the renderer.

**Events Emitted:** `ui_highlight.suggestions_updated`

## Public Queries

### `getSessionById(id: string): UISession | null`

Retrieves a UI session by its ID.

### `getSessionBySnippetId(snippetId: string): UISession | null`

Retrieves the most recent UI session for a snippet.

## Events

### `ui_highlight.session_created`

Emitted when a new UI session is created.

**Payload:** `UISession`

### `ui_highlight.issues_updated`

Emitted when Lite issues are available for display.

**Payload:**
```typescript
{
  sessionId: string;
  issues: LiteIssue[];
}
```

### `ui_highlight.suggestions_updated`

Emitted when Pro suggestions are available for display.

**Payload:**
```typescript
{
  sessionId: string;
  suggestions: ProSuggestion[];
}
```
