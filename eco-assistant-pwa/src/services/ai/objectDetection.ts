/**
 * Object Detection Service
 * TensorFlow.js COCO-SSD for waste detection
 */

import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';
import type { DetectionResult, WasteDetection } from '@/types';
import { WASTE_DETECTION_CATEGORIES } from '@/constants';

class ObjectDetectionService {
  private model: cocoSsd.ObjectDetection | null = null;
  private isLoading = false;
  private loadPromise: Promise<cocoSsd.ObjectDetection> | null = null;

  /**
   * Load the COCO-SSD model
   * Uses caching to avoid reloading
   */
  async loadModel(): Promise<cocoSsd.ObjectDetection> {
    // Return cached model if available
    if (this.model) {
      return this.model;
    }

    // Return existing load promise if model is loading
    if (this.isLoading && this.loadPromise) {
      return this.loadPromise;
    }

    // Start loading
    this.isLoading = true;
    this.loadPromise = cocoSsd.load({
      base: 'mobilenet_v2' // Faster, good for mobile
    });

    try {
      this.model = await this.loadPromise;
      console.log('[ObjectDetection] Model loaded successfully');
      return this.model;
    } catch (error) {
      console.error('[ObjectDetection] Failed to load model:', error);
      throw new Error('Failed to load object detection model');
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * Detect objects in video frame or image
   * @param input HTMLVideoElement, HTMLImageElement, or HTMLCanvasElement
   * @returns Array of detection results
   */
  async detect(
    input: HTMLVideoElement | HTMLImageElement | HTMLCanvasElement
  ): Promise<DetectionResult[]> {
    try {
      // Ensure model is loaded
      const model = await this.loadModel();

      // Run detection
      const predictions = await model.detect(input);

      // Convert predictions to our DetectionResult format
      const detections: DetectionResult[] = predictions.map((pred) => ({
        class: pred.class,
        score: pred.score,
        bbox: pred.bbox as [number, number, number, number]
      }));

      return detections;
    } catch (error) {
      console.error('[ObjectDetection] Detection failed:', error);
      return [];
    }
  }

  /**
   * Detect waste-like objects in video frame
   * Filters detections to only waste categories
   * @param input HTMLVideoElement or HTMLImageElement
   * @param confidenceThreshold Minimum confidence score (default 0.6)
   * @returns WasteDetection result with cropped image if waste found
   */
  async detectWaste(
    input: HTMLVideoElement | HTMLImageElement,
    confidenceThreshold = 0.6
  ): Promise<WasteDetection> {
    try {
      // Run detection
      const detections = await this.detect(input);

      // Filter to waste categories and above threshold
      const wasteDetections = detections.filter(
        (d) =>
          WASTE_DETECTION_CATEGORIES.includes(d.class) &&
          d.score >= confidenceThreshold
      );

      if (wasteDetections.length === 0) {
        return {
          success: false,
          detections: []
        };
      }

      // Get highest confidence detection
      const bestDetection = wasteDetections.reduce((prev, current) =>
        current.score > prev.score ? current : prev
      );

      // Crop image to detection bounding box
      const croppedImage = this.cropToDetection(input, bestDetection);

      return {
        success: true,
        detections: wasteDetections,
        croppedImage
      };
    } catch (error) {
      console.error('[ObjectDetection] Waste detection failed:', error);
      return {
        success: false,
        detections: [],
        error: error instanceof Error ? error.message : 'Detection failed'
      };
    }
  }

  /**
   * Crop input to detection bounding box with padding
   * @param input HTMLVideoElement or HTMLImageElement
   * @param detection Detection result with bbox
   * @param paddingPercent Padding around bbox (default 10%)
   * @returns Base64 encoded cropped image
   */
  private cropToDetection(
    input: HTMLVideoElement | HTMLImageElement,
    detection: DetectionResult,
    paddingPercent = 0.1
  ): string {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('Failed to get canvas context');
    }

    const [x, y, width, height] = detection.bbox;

    // Calculate padded dimensions
    const paddingX = width * paddingPercent;
    const paddingY = height * paddingPercent;

    const sourceWidth = input instanceof HTMLVideoElement
      ? input.videoWidth
      : input.width;
    const sourceHeight = input instanceof HTMLVideoElement
      ? input.videoHeight
      : input.height;

    // Ensure we don't exceed source boundaries
    const paddedX = Math.max(0, x - paddingX);
    const paddedY = Math.max(0, y - paddingY);
    const paddedWidth = Math.min(
      sourceWidth - paddedX,
      width + 2 * paddingX
    );
    const paddedHeight = Math.min(
      sourceHeight - paddedY,
      height + 2 * paddingY
    );

    // Set canvas size to cropped dimensions
    canvas.width = paddedWidth;
    canvas.height = paddedHeight;

    // Draw cropped region
    ctx.drawImage(
      input,
      paddedX,
      paddedY,
      paddedWidth,
      paddedHeight,
      0,
      0,
      paddedWidth,
      paddedHeight
    );

    // Convert to base64 JPEG
    return canvas.toDataURL('image/jpeg', 0.9);
  }

  /**
   * Dispose of the model to free memory
   */
  dispose(): void {
    if (this.model) {
      this.model.dispose();
      this.model = null;
      console.log('[ObjectDetection] Model disposed');
    }
  }
}

export const objectDetectionService = new ObjectDetectionService();
export default objectDetectionService;
