/**
 * Synchronizations Index
 *
 * Registers all synchronizations to wire Concepts together.
 * This is called once at application startup.
 */

import { registerSystemToTextCapture } from './system-to-text_capture';
import { registerTextCaptureToLanguageDetection } from './text_capture-to-language_detection';
import { registerLanguageDetectionToAnalysis } from './language_detection-to-analysis';
import { registerAnalysisLiteToUIHighlight } from './analysis_lite-to-ui_highlight';
import { registerAnalysisProToUIHighlight } from './analysis_pro-to-ui_highlight';

export function registerSynchronizations() {
  console.log('Registering synchronizations...');

  registerSystemToTextCapture();
  registerTextCaptureToLanguageDetection();
  registerLanguageDetectionToAnalysis();
  registerAnalysisLiteToUIHighlight();
  registerAnalysisProToUIHighlight();

  console.log('All synchronizations registered');
}
