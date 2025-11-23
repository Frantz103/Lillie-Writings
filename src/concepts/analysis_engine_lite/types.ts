/**
 * Analysis Engine Lite Concept - Types
 */

export type LiteIssueType = "spelling" | "grammar" | "agreement" | "other";

export interface LiteIssue {
  id: string;
  snippetId: string;
  startIndex: number;
  endIndex: number;
  type: LiteIssueType;
  message: string;
  confidence: number;
  createdAt: Date;
}
