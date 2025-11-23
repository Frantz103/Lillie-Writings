/**
 * User Preferences Concept - Types
 */

import { SupportedLanguage } from '../language_detection/types';
import { TonePreference } from '../analysis_engine_pro/types';
import { AnalysisMode } from '../analysis_mode/types';

export interface UserPreferences {
  id: string;
  defaultLang?: SupportedLanguage | "auto";
  tone: TonePreference;
  shortcut: string;
  mode: AnalysisMode;
}
