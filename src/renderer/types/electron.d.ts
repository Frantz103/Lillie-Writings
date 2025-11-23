/**
 * Type definitions for Electron API exposed via preload script
 */

export interface ElectronAPI {
  onConceptEvent: (callback: (event: { eventName: string; payload: any }) => void) => void;
  closeWindow: () => void;
  applyText: (text: string) => void;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
