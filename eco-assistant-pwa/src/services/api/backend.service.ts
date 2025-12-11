/**
 * Backend Rails API Service
 * Client for Rails backend (scan persistence, corrections, analytics)
 */

import axios, { type AxiosInstance } from 'axios';
import type {
  ScanCreateRequest,
  ScanResponse,
  ClassificationCorrectionRequest,
  ClassificationCorrectionResponse
} from '@/types';

class BackendService {
  private client: AxiosInstance;
  private baseURL: string;

  constructor() {
    this.baseURL = import.meta.env.VITE_BACKEND_API_URL || '';
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 10000, // 10s timeout for background operations
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Request interceptor (add auth if needed)
    this.client.interceptors.request.use(
      (config) => {
        console.log(`[Backend] → ${config.method?.toUpperCase()} ${config.url}`);
        // Add auth token if available
        const token = localStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        console.error('[Backend] Request error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        console.log(`[Backend] ← ${response.status} ${response.config.url}`);
        return response;
      },
      (error) => {
        console.error('[Backend] Response error:', error.message);
        return Promise.reject(error);
      }
    );
  }

  /**
   * Create a scan record (background persistence)
   * @param request Scan data from classification
   * @returns Created scan record
   */
  async createScan(request: ScanCreateRequest): Promise<ScanResponse> {
    try {
      const response = await this.client.post<ScanResponse>(
        '/api/v1/scans',
        request
      );
      return response.data;
    } catch (error) {
      console.error('[Backend] Failed to create scan:', error);
      throw error;
    }
  }

  /**
   * Get scan details by trace ID
   * @param traceId Unique trace ID from classification
   * @returns Scan record with all details
   */
  async getScanByTraceId(traceId: string): Promise<ScanResponse> {
    try {
      const response = await this.client.get<ScanResponse>(
        `/api/v1/scans/${traceId}`
      );
      return response.data;
    } catch (error) {
      console.error('[Backend] Failed to get scan:', error);
      throw error;
    }
  }

  /**
   * Create a classification correction record
   * @param request Correction data (discrepancy or manual)
   * @returns Created correction record
   */
  async createCorrection(
    request: ClassificationCorrectionRequest
  ): Promise<ClassificationCorrectionResponse> {
    try {
      const response = await this.client.post<ClassificationCorrectionResponse>(
        '/api/v1/classification_corrections',
        request
      );
      return response.data;
    } catch (error) {
      console.error('[Backend] Failed to create correction:', error);
      throw error;
    }
  }

  /**
   * Get analytics data (for admin dashboard)
   * @param params Query parameters (date range, station, etc.)
   * @returns Analytics summary
   */
  async getAnalytics(params?: {
    start_date?: string;
    end_date?: string;
    station_id?: string;
  }): Promise<any> {
    try {
      const response = await this.client.get('/api/v1/analytics', {
        params
      });
      return response.data;
    } catch (error) {
      console.error('[Backend] Failed to get analytics:', error);
      throw error;
    }
  }

  /**
   * Health check endpoint
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await this.client.get('/health');
      return response.status === 200;
    } catch {
      return false;
    }
  }
}

export const backendService = new BackendService();
export default backendService;
