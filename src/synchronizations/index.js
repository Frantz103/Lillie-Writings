"use strict";
/**
 * Synchronizations Index
 *
 * Registers all synchronizations to wire Concepts together.
 * This is called once at application startup.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSynchronizations = registerSynchronizations;
const system_to_text_capture_1 = require("./system-to-text_capture");
const text_capture_to_language_detection_1 = require("./text_capture-to-language_detection");
const language_detection_to_analysis_1 = require("./language_detection-to-analysis");
const analysis_lite_to_ui_highlight_1 = require("./analysis_lite-to-ui_highlight");
const analysis_pro_to_ui_highlight_1 = require("./analysis_pro-to-ui_highlight");
function registerSynchronizations() {
    console.log('Registering synchronizations...');
    (0, system_to_text_capture_1.registerSystemToTextCapture)();
    (0, text_capture_to_language_detection_1.registerTextCaptureToLanguageDetection)();
    (0, language_detection_to_analysis_1.registerLanguageDetectionToAnalysis)();
    (0, analysis_lite_to_ui_highlight_1.registerAnalysisLiteToUIHighlight)();
    (0, analysis_pro_to_ui_highlight_1.registerAnalysisProToUIHighlight)();
    console.log('All synchronizations registered');
}
