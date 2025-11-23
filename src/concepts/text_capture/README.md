# Text Capture Concept

## Purpose

Owns the canonical representation of captured text snippets.

## Data Model

Stores captured text snippets with metadata about their source.

**Table:** `captured_snippets`
- `id`: Unique identifier
- `source_app`: Name of the application where text was captured (nullable)
- `content`: The captured text content
- `created_at`: Timestamp of capture

## Public Actions

### `createCapturedSnippet(input: CreateCapturedSnippetInput): CapturedSnippet`

Creates and persists a new captured snippet.

**Input:**
- `content`: The text content to capture
- `sourceApp`: Optional name of the source application

**Returns:** The created `CapturedSnippet` object

**Events Emitted:** `text_capture.snippet_created`

## Public Queries

### `getSnippetById(id: string): CapturedSnippet | null`

Retrieves a captured snippet by its ID.

## Events

### `text_capture.snippet_created`

Emitted when a new snippet is created.

**Payload:** `CapturedSnippet`
