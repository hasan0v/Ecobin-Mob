/**
 * API Client - REST API with offline queue support
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// API Base URL - replace with actual backend URL
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://api.ecobin.example.com';

// API version
const API_VERSION = 'v1';

class APIClient {
  private client: AxiosInstance;
  private authToken: string | null = null;

  constructor() {
    this.client = axios.create({
      baseURL: `${API_BASE_URL}/${API_VERSION}`,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip',
      },
    });

    // Request interceptor for auth token
    this.client.interceptors.request.use(
      (config) => {
        if (this.authToken) {
          config.headers.Authorization = `Bearer ${this.authToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          // Token expired - trigger refresh
          // await this.refreshToken();
        }
        return Promise.reject(error);
      }
    );
  }

  setAuthToken(token: string) {
    this.authToken = token;
  }

  clearAuthToken() {
    this.authToken = null;
  }

  // Generic HTTP methods
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.get(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.post(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.put(url, data, config);
    return response.data;
  }

  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.patch(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.delete(url, config);
    return response.data;
  }
}

// Singleton instance
export const apiClient = new APIClient();

/**
 * API Endpoints - Organized by feature
 */

export const API_ENDPOINTS = {
  // Authentication
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    refresh: '/auth/refresh',
    logout: '/auth/logout',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
  },
  
  // Devices
  devices: {
    list: '/devices',
    get: (id: string) => `/devices/${id}`,
    create: '/devices',
    update: (id: string) => `/devices/${id}`,
    delete: (id: string) => `/devices/${id}`,
    status: (id: string) => `/devices/${id}/status`,
    command: (id: string) => `/devices/${id}/command`,
  },
  
  // Sensor Readings
  readings: {
    list: '/readings',
    get: (id: string) => `/readings/${id}`,
    create: '/readings',
    latest: (deviceId: string) => `/readings/latest/${deviceId}`,
    range: (deviceId: string) => `/readings/range/${deviceId}`,
  },
  
  // Compost Batches
  compost: {
    batches: '/compost/batches',
    get: (id: string) => `/compost/batches/${id}`,
    create: '/compost/batches',
    update: (id: string) => `/compost/batches/${id}`,
    actions: (batchId: string) => `/compost/batches/${batchId}/actions`,
    history: (batchId: string) => `/compost/batches/${batchId}/history`,
  },
  
  // Irrigation
  irrigation: {
    schedules: '/irrigation/schedules',
    get: (id: string) => `/irrigation/schedules/${id}`,
    create: '/irrigation/schedules',
    update: (id: string) => `/irrigation/schedules/${id}`,
    delete: (id: string) => `/irrigation/schedules/${id}`,
    trigger: (id: string) => `/irrigation/schedules/${id}/trigger`,
  },
  
  // Water Management
  water: {
    tanks: '/water/tanks',
    quality: '/water/quality',
    samples: '/water/quality/samples',
    createSample: '/water/quality/samples',
  },
  
  // Soil Analysis
  soil: {
    samples: '/soil/samples',
    get: (id: string) => `/soil/samples/${id}`,
    create: '/soil/samples',
    recommendations: (sampleId: string) => `/soil/samples/${sampleId}/recommendations`,
    healthScore: (fieldId: string) => `/soil/health-score/${fieldId}`,
  },
  
  // Notifications
  notifications: {
    list: '/notifications',
    get: (id: string) => `/notifications/${id}`,
    markRead: (id: string) => `/notifications/${id}/read`,
    markAllRead: '/notifications/read-all',
    delete: (id: string) => `/notifications/${id}`,
  },
  
  // Education Content
  education: {
    content: '/education/content',
    get: (id: string) => `/education/content/${id}`,
    search: '/education/content/search',
    progress: '/education/progress',
    updateProgress: (contentId: string) => `/education/progress/${contentId}`,
  },
  
  // Reports
  reports: {
    list: '/reports',
    generate: '/reports/generate',
    get: (id: string) => `/reports/${id}`,
    download: (id: string) => `/reports/${id}/download`,
  },
  
  // AI Assistant
  assistant: {
    chat: '/assistant/chat',
    sessions: '/assistant/sessions',
    getSession: (id: string) => `/assistant/sessions/${id}`,
    tools: '/assistant/tools',
  },
  
  // User Profile
  profile: {
    get: '/profile',
    update: '/profile',
    preferences: '/profile/preferences',
  },
};
