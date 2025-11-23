/**
 * System Integration Concept - Types
 */
export type SystemEventType = "hotkey_pressed" | "selection_captured" | "selection_replaced";
export interface SystemSelection {
    content: string;
    sourceApp: string | null;
}
