/**
 * Analysis Engine Pro Concept - Types
 */
export type TonePreference = "neutral" | "formal" | "friendly";
export interface ProSuggestion {
    id: string;
    snippetId: string;
    startIndex: number | null;
    endIndex: number | null;
    suggestionText: string;
    explanation?: string;
    tone?: TonePreference;
    createdAt: Date;
}
