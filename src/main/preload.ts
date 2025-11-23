/**
 * Electron Preload Script
 *
 * Provides a secure bridge between the main process and renderer process.
 */

import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods that allow the renderer to use ipcRenderer
contextBridge.exposeInMainWorld('electronAPI', {
  // Listen for concept events from the backend
  onConceptEvent: (callback: (event: { eventName: string; payload: any }) => void) => {
    ipcRenderer.on('concept-event', (_event, data) => callback(data));
  },

  // Request to close the window
  closeWindow: () => {
    ipcRenderer.send('close-window');
  },

  // Request to apply text back to the source application
  applyText: (text: string) => {
    ipcRenderer.send('apply-text', text);
  },
});
