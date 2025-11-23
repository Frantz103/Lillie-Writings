/**
 * Electron Main Process
 *
 * Responsible for:
 * - Database initialization
 * - Registering synchronizations
 * - Window management
 * - Global shortcut registration
 * - System integration (text capture)
 */

import { app, BrowserWindow, globalShortcut, clipboard, ipcMain } from 'electron';
import * as path from 'path';
import { initializeDatabase } from '../lib/database';
import { registerSynchronizations } from '../synchronizations';
import { onSelectionCaptured } from '../concepts/system_integration/actions';
import { eventBus } from '../lib/event-bus';
import { getPreferences } from '../concepts/user_preferences/queries';

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false, // Don't show until content is ready
    frame: true, // Keep frame for now, can be changed to false later for a cleaner look
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // Load the renderer
  mainWindow.loadFile(path.join(__dirname, '..', 'renderer', 'index.html'));

  // Open DevTools in development
  if (process.env.NODE_ENV !== 'production') {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function registerGlobalShortcut() {
  const preferences = getPreferences();
  const shortcut = preferences.shortcut || 'Control+Option+L';

  const success = globalShortcut.register(shortcut, () => {
    console.log('Global shortcut triggered:', shortcut);
    handleTextCapture();
  });

  if (!success) {
    console.error('Failed to register global shortcut:', shortcut);
  } else {
    console.log('Global shortcut registered:', shortcut);
  }
}

async function handleTextCapture() {
  // For now, capture text from clipboard
  // In a future version, this would use macOS Accessibility API to get selected text
  const text = clipboard.readText();

  if (!text || text.trim().length === 0) {
    console.log('No text in clipboard to capture');
    return;
  }

  console.log('Captured text:', text.substring(0, 50) + '...');

  // Emit selection captured event
  await onSelectionCaptured({
    content: text,
    sourceApp: 'clipboard', // TODO: Get actual source app name
  });

  // Show the window
  if (mainWindow) {
    mainWindow.show();
    mainWindow.focus();
  }
}

function setupIPC() {
  // Import queries to enrich events
  const { getSnippetById } = require('../concepts/text_capture/queries');

  // Session created - enrich with snippet content
  eventBus.subscribe('ui_highlight.session_created', (payload: any) => {
    if (mainWindow) {
      const snippet = getSnippetById(payload.snippetId);
      mainWindow.webContents.send('concept-event', {
        eventName: 'ui_highlight.session_created',
        payload: {
          ...payload,
          snippet,
        },
      });
    }
  });

  // Issues updated - enrich with snippet content
  eventBus.subscribe('ui_highlight.issues_updated', (payload: any) => {
    if (mainWindow && payload.issues && payload.issues.length > 0) {
      const snippet = getSnippetById(payload.issues[0].snippetId);
      mainWindow.webContents.send('concept-event', {
        eventName: 'ui_highlight.issues_updated',
        payload: {
          ...payload,
          snippet,
        },
      });
    }
  });

  // Suggestions updated - enrich with snippet content
  eventBus.subscribe('ui_highlight.suggestions_updated', (payload: any) => {
    if (mainWindow && payload.suggestions && payload.suggestions.length > 0) {
      const snippet = getSnippetById(payload.suggestions[0].snippetId);
      mainWindow.webContents.send('concept-event', {
        eventName: 'ui_highlight.suggestions_updated',
        payload: {
          ...payload,
          snippet,
        },
      });
    }
  });

  // Handle close window request from renderer
  ipcMain.on('close-window', () => {
    if (mainWindow) {
      mainWindow.hide();
    }
  });

  // Handle apply text request from renderer
  ipcMain.on('apply-text', (_event, text: string) => {
    console.log('Apply text:', text);
    clipboard.writeText(text);
    if (mainWindow) {
      mainWindow.hide();
    }
  });
}

app.on('ready', () => {
  console.log('Electron app ready');

  // Initialize database
  const dbPath = path.join(app.getPath('userData'), 'lillie.db');
  console.log('Database path:', dbPath);
  initializeDatabase(dbPath);

  // Register synchronizations
  registerSynchronizations();

  // Create window
  createWindow();

  // Register global shortcut
  registerGlobalShortcut();

  // Setup IPC
  setupIPC();
});

app.on('window-all-closed', () => {
  // On macOS, keep the app running even when all windows are closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

app.on('will-quit', () => {
  // Unregister all shortcuts
  globalShortcut.unregisterAll();
});
