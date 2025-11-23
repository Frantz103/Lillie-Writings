# Analysis Engine Lite Concept

## Purpose

Uses BERT-like models to detect potential writing issues at token or span level. Provides fast, lightweight grammar and spelling checks.

## Data Model

Stores detected issues with their positions and confidence scores.

**Table:** `lite_issues`
- `id`: Unique identifier
- `snippet_id`: Reference to the captured snippet
- `start_index`: Character start position of the issue
- `end_index`: Character end position of the issue
- `issue_type`: Type of issue (spelling, grammar, agreement, other)
- `message`: Description of the issue
- `confidence`: Confidence score (0-1)
- `created_at`: Timestamp

## Public Actions

### `analyzeSnippet(params: AnalyzeSnippetParams): Promise<LiteIssue[]>`

Analyzes a snippet and detects potential issues.

**Input:**
- `snippet`: The captured snippet to analyze
- `lang`: The language of the snippet (en or fr)

**Returns:** Array of detected `LiteIssue` objects

**Events Emitted:** `analysis_lite.issues_created`

**Note:** Currently generates dummy issues for the first milestone. Will be replaced with actual BERT model inference in a future milestone.

## Public Queries

### `getIssuesBySnippetId(snippetId: string): LiteIssue[]`

Retrieves all issues detected for a specific snippet.

## Events

### `analysis_lite.issues_created`

Emitted when analysis completes and issues are created.

**Payload:**
```typescript
{
  snippetId: string;
  issues: LiteIssue[];
}
```
