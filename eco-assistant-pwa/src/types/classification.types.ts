/**
 * Classification Types
 * Types for waste classification, materials, and results
 */

export type Material =
  | 'PLASTIC'
  | 'GLASS'
  | 'PAPER'
  | 'CARDBOARD'
  | 'ORGANIC'
  | 'METAL'
  | 'OTHER';

export type ContainerColor =
  | 'AZUL'    // Blue - Plastic & Glass
  | 'BLANCO'  // White - Paper & Cardboard
  | 'VERDE'   // Green - Organic
  | 'GRIS'    // Gray - Metal
  | 'NEGRO';  // Black - Non-recyclable

export type ClassificationState =
  | 'idle'
  | 'detecting'
  | 'classifying'
  | 'success'
  | 'error';

export interface Classification {
  material: Material;
  subtype?: string;
  color: ContainerColor;
  confidence: number;
  message: string;
  recyclable: boolean;
  volume_ml?: number;
  weight_g?: number;
  co2_saved_g?: number;
  condition?: 'clean' | 'dirty' | 'damaged';
  timestamp: string;
  trace_id: string;
}

export interface ClassificationRequest {
  image_base64: string;
  tenant_id: string;
  trace_id: string;
  station_id: string;
  organization_id: string;
}

export interface ClassificationResponse {
  success: boolean;
  material: Material;
  subtype?: string;
  color: ContainerColor;
  confidence: number;
  message: string;
  recyclable: boolean;
  volume_ml?: number;
  weight_g?: number;
  co2_saved_g?: number;
  trace_id: string;
  error?: string;
}

export interface DetectionResult {
  class: string;
  score: number;
  bbox: [number, number, number, number]; // [x, y, width, height]
}

export interface WasteDetection {
  success: boolean;
  detections: DetectionResult[];
  croppedImage?: string;
  error?: string;
}
