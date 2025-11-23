/**
 * UI Highlight Concept - Types
 */
export type UISessionState = "idle" | "analyzing" | "showing_issues" | "error";
export interface UISession {
    id: string;
    snippetId: string;
    state: UISessionState;
    createdAt: Date;
    updatedAt: Date;
}
