# Lillie Writings

A privacy-friendly writing assistant for macOS that helps you improve your English and French writing with real-time grammar and style suggestions.

## Overview

Lillie Writings is an Electron desktop application that provides:

- **Real-time writing analysis** for English and French text
- **Two editions**:
  - **Lite Edition**: Fast, local analysis using BERT-like models for grammar and spelling
  - **Pro Edition**: Advanced suggestions with LLMs for rewrites and tone adjustments
- **Privacy-first**: Lite mode works completely offline; Pro mode clearly indicates when using cloud APIs
- **Global shortcut**: Capture and analyze text from any macOS application

## Architecture

This project follows the **Concepts and Synchronizations** (WYSIWID) architecture:

- **Concepts** are isolated modules that own specific functionality and never depend on each other
- **Synchronizations** wire Concepts together by subscribing to events and triggering actions
- **Event Bus** provides decoupled communication between Concepts

### Project Structure

```
src/
├── concepts/              # Isolated business logic modules
│   ├── text_capture/      # Captures and stores text snippets
│   ├── language_detection/ # Detects English vs French
│   ├── analysis_engine_lite/ # Fast local grammar checking
│   ├── analysis_engine_pro/  # LLM-powered suggestions
│   ├── analysis_mode/     # Manages Lite/Pro/Auto mode
│   ├── ui_highlight/      # Manages UI session state
│   ├── system_integration/ # macOS system integration
│   └── user_preferences/  # User settings
├── synchronizations/      # Event-driven wiring between Concepts
├── lib/                   # Shared utilities (event bus, database)
├── main/                  # Electron main process
└── renderer/              # React UI
```

### Concept Structure

Each Concept folder contains:

- `schema.sql` - Database schema
- `types.ts` - TypeScript type definitions
- `actions.ts` - Public actions that modify state
- `queries.ts` - Public queries that read state
- `events.ts` - Events emitted by this Concept
- `README.md` - Documentation
- `tests/` - Unit tests

## Development Setup

### Prerequisites

- Node.js 20+
- macOS (Intel or Apple Silicon)

### Installation

```bash
# Install dependencies
npm install

# Build the application
npm run build

# Run in development mode
npm run dev

# Run in production mode
npm start
```

### Project Scripts

- `npm run build` - Build both main and renderer processes
- `npm run build:main` - Build main process only
- `npm run build:renderer` - Build renderer process only
- `npm run dev` - Run in development mode with hot reload
- `npm test` - Run tests
- `npm run lint` - Lint TypeScript files

## How It Works

1. **Text Capture**: User presses global shortcut (default: Control+Option+L)
2. **System Integration**: Captures text from clipboard (future: direct selection API)
3. **Language Detection**: Automatically detects English or French
4. **Analysis**: Runs appropriate analysis based on mode (Lite/Pro)
5. **UI Display**: Shows text with highlighted issues in floating window
6. **Apply Changes**: User can edit and apply corrected text back to clipboard

## Key Features

### Global Shortcut

Press `Control+Option+L` (configurable) to:
- Capture selected text from any application
- Open the Lillie Writings window
- See real-time analysis results

### Analysis Modes

- **Lite**: Fast local analysis, perfect for quick checks
- **Pro**: Advanced LLM-powered suggestions (future milestone)
- **Auto**: Intelligently chooses based on context (future milestone)

### Privacy

- Lite mode runs **completely offline**
- No user text is sent to remote servers in Lite mode
- Pro mode clearly indicates when using cloud APIs
- All data stored locally in SQLite database

## Current Status

### Milestone 1 (Current)

- ✅ Complete Concept architecture implementation
- ✅ Event bus and synchronization system
- ✅ Electron app with global shortcut
- ✅ Text capture from clipboard
- ✅ React UI with text display
- ✅ Dummy issue highlighting (placeholder for BERT models)
- ⏳ End-to-end testing

### Future Milestones

- **Milestone 2**: Integrate real BERT models for English and French
- **Milestone 3**: Implement Pro mode with LLM integration
- **Milestone 4**: Direct text selection API (replacing clipboard)
- **Milestone 5**: Enhanced UI with inline suggestions

## Technology Stack

- **Electron** - Desktop application framework
- **TypeScript** - Type-safe development
- **React** - UI framework
- **SQLite** (better-sqlite3) - Local database
- **Webpack** - Module bundling
- **Jest** - Testing framework

## Contributing

This project follows strict architectural principles:

1. **Never import between Concepts** - Use synchronizations instead
2. **Keep Concepts focused** - Each owns a single responsibility
3. **Emit events for state changes** - Let synchronizations handle coordination
4. **Test Concepts in isolation** - No external dependencies in Concept tests

## License

MIT

## Credits

Built with the Concepts and Synchronizations architecture for maximum maintainability and extensibility.
