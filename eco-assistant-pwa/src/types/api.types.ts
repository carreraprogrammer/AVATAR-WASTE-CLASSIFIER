/**
 * API Types
 * Types for N8N webhooks and Backend Rails API
 */

import type { Material, ContainerColor } from './classification.types';

// N8N Fast Path Classification
export interface N8NClassificationRequest {
  image_base64: string;
  tenant_id: string;
  trace_id: string;
  station_id: string;
  organization_id: string;
}

export interface N8NClassificationResponse {
  success: boolean;
  material: Material;
  color: ContainerColor;
  confidence: number;
  message: string;
  trace_id: string;
  error?: string;
}

// Backend Rails API - Scan Creation
export interface ScanCreateRequest {
  trace_id: string;
  tenant_id: string;
  station_id: string;
  organization_id: string;
  material: Material;
  subtype?: string;
  confidence: number;
  recyclable: boolean;
  volume_ml?: number;
  weight_g?: number;
  co2_saved_g?: number;
  condition?: string;
  image_url?: string;
  classification_method: 'fast_path' | 'detailed';
}

export interface ScanResponse {
  id: string;
  trace_id: string;
  material: Material;
  subtype?: string;
  color: ContainerColor;
  confidence: number;
  recyclable: boolean;
  volume_ml?: number;
  weight_g?: number;
  co2_saved_g?: number;
  condition?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

// Backend Rails API - Classification Correction
export interface ClassificationCorrectionRequest {
  trace_id: string;
  incorrect_material: Material;
  correct_material: Material;
  incorrect_confidence: number;
  correct_confidence: number;
  image_url: string;
  source: 'discrepancy_detection' | 'manual_correction';
}

export interface ClassificationCorrectionResponse {
  id: string;
  trace_id: string;
  status: 'pending' | 'reviewed' | 'applied';
  created_at: string;
}

// API Error Types
export interface APIError {
  error: string;
  message: string;
  status_code: number;
  trace_id?: string;
}

// Generic API Response
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: APIError;
  timestamp: string;
}
