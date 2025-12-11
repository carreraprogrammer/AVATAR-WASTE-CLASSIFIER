/**
 * N8N Webhook Service
 * Client for N8N webhook endpoints (fast path classification)
 */

import axios, { type AxiosInstance } from 'axios';
import type {
  N8NClassificationRequest,
  N8NClassificationResponse
} from '@/types';

class N8NService {
  private client: AxiosInstance;
  private baseURL: string;

  constructor() {
    this.baseURL = import.meta.env.VITE_N8N_WEBHOOK_URL || '';
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 3000, // 3s timeout for fast path
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        console.log(`[N8N] → ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error('[N8N] Request error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        console.log(`[N8N] ← ${response.status} ${response.config.url}`);
        return response;
      },
      (error) => {
        console.error('[N8N] Response error:', error.message);
        return Promise.reject(error);
      }
    );
  }

  /**
   * Classify waste via Fast Path (Roboflow + N8N)
   * @param request Classification request with image and metadata
   * @returns Classification response with material, color, and message
   */
  async classifyWaste(
    request: N8NClassificationRequest
  ): Promise<N8NClassificationResponse> {
    try {
      const startTime = Date.now();

      const response = await this.client.post<N8NClassificationResponse>(
        '/webhook/classify-fast',
        request
      );

      const latency = Date.now() - startTime;
      console.log(`[N8N] Classification completed in ${latency}ms`);

      if (!response.data.success) {
        throw new Error(
          response.data.error || 'Classification failed'
        );
      }

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNABORTED') {
          throw new Error('Classification timeout - please try again');
        }
        if (error.response?.status === 500) {
          throw new Error('Server error - please try again later');
        }
      }
      throw error;
    }
  }

  /**
   * Log classification discrepancy (Fast Path vs Detailed)
   * Fire-and-forget endpoint for background logging
   */
  async logDiscrepancy(data: {
    trace_id: string;
    fast_material: string;
    detailed_material: string;
    fast_confidence: number;
    detailed_confidence: number;
  }): Promise<void> {
    try {
      await this.client.post('/webhook/log-discrepancy', data);
    } catch (error) {
      // Silently fail - this is non-critical
      console.warn('[N8N] Failed to log discrepancy:', error);
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

export const n8nService = new N8NService();
export default n8nService;
