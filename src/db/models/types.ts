/**
 * Data Models - TypeScript Types and Interfaces
 * Complete type definitions for all entities
 */

// ========================================
// User Management
// ========================================

export interface User {
  id: string;
  name: string;
  email: string;
  locale: string; // 'az' | 'tr' | 'en' | 'ru' | 'he'
  units: 'metric' | 'imperial';
  farms: string[]; // Farm IDs
  devices: string[]; // Device IDs
  roles: UserRole[];
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = 'owner' | 'admin' | 'viewer';

// ========================================
// Devices & IoT
// ========================================

export type DeviceType =
  | 'composter'
  | 'moisture_sensor'
  | 'weather_station'
  | 'water_tank'
  | 'irrigation_controller'
  | 'soil_sensor';

export type DeviceStatus = 'online' | 'offline' | 'error' | 'maintenance';

export interface Device {
  id: string;
  type: DeviceType;
  name: string;
  firmware: string;
  connectionStatus: DeviceStatus;
  location?: {
    latitude: number;
    longitude: number;
    altitude?: number;
  };
  lastSeen?: Date;
  batteryLevel?: number; // 0-100
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

// ========================================
// Sensor Readings
// ========================================

export type SensorType =
  // Compost sensors
  | 'temperature'
  | 'humidity'
  | 'weight'
  | 'co2'
  // Water quality sensors
  | 'ph'
  | 'dissolved_oxygen'
  | 'nitrate'
  | 'cod' // Chemical Oxygen Demand
  | 'tds' // Total Dissolved Solids
  | 'ec' // Electrical Conductivity
  // Soil sensors
  | 'nitrogen'
  | 'phosphorus'
  | 'potassium'
  | 'soil_moisture'
  | 'soil_ph'
  | 'soil_texture';

export interface SensorReading {
  id: string;
  deviceId: string;
  type: SensorType;
  value: number;
  unit: string;
  timestamp: Date;
  metadata?: {
    calibrated?: boolean;
    quality?: 'good' | 'fair' | 'poor';
    anomaly?: boolean;
  };
}

// ========================================
// Compost Management
// ========================================

export type CompostStage =
  | 'mesophilic' // Initial stage, 15-45°C
  | 'thermophilic' // Active decomposition, 45-70°C
  | 'cooling' // Temperature decreasing
  | 'curing'; // Final maturation

export interface CompostBatch {
  id: string;
  name: string;
  deviceId: string;
  startedAt: Date;
  completedAt?: Date;
  stage: CompostStage;
  targetTemperature: number; // Celsius
  currentProgress: number; // 0-100
  estimatedDaysRemaining?: number;
  trends: {
    temperature: TrendData[];
    humidity: TrendData[];
    weight: TrendData[];
    co2: TrendData[];
  };
  actions: CompostAction[];
  notes?: string;
}

export interface TrendData {
  timestamp: Date;
  value: number;
  delta?: number; // Change from previous
}

export type CompostActionType = 'mix' | 'add_moisture' | 'aerate' | 'turn' | 'harvest';

export interface CompostAction {
  id: string;
  type: CompostActionType;
  scheduledAt: Date;
  completedAt?: Date;
  automatic: boolean;
  aiRecommended: boolean;
  notes?: string;
}

// ========================================
// Irrigation & Water Management
// ========================================

export type IrrigationMode = 'auto' | 'manual' | 'scheduled';

export interface IrrigationSchedule {
  id: string;
  fieldId: string;
  deviceId: string;
  mode: IrrigationMode;
  startAt: Date;
  duration: number; // minutes
  waterUsed?: number; // liters
  aiRecommended: boolean;
  recurring?: {
    frequency: 'daily' | 'weekly' | 'custom';
    days?: number[]; // 0-6, Sunday-Saturday
  };
  completed: boolean;
  createdAt: Date;
}

export interface WaterQualitySample {
  id: string;
  source: string; // tank ID or source name
  timestamp: Date;
  metrics: {
    ph: number; // 0-14
    dissolvedOxygen: number; // mg/L
    nitrate: number; // mg/L
    cod: number; // mg/L
    tds: number; // ppm
    ec: number; // µS/cm
  };
  status: 'excellent' | 'good' | 'fair' | 'poor';
  notes?: string;
}

export interface WaterTank {
  id: string;
  name: string;
  capacity: number; // liters
  currentLevel: number; // liters
  fillPercentage: number; // 0-100
  estimatedDaysRemaining?: number;
  lastRefilled?: Date;
  location?: string;
}

// ========================================
// Soil Analysis
// ========================================

export interface SoilSample {
  id: string;
  fieldId: string;
  timestamp: Date;
  metrics: {
    nitrogen: number; // ppm
    phosphorus: number; // ppm
    potassium: number; // ppm
    ph: number; // 0-14
    moisture: number; // percentage
    texture: 'sand' | 'silt' | 'clay' | 'loam';
  };
  healthScore: number; // 0-100
  recommendations: AIRecommendation[];
  notes?: string;
}

export interface AIRecommendation {
  id: string;
  type: 'fertilizer' | 'irrigation' | 'ph_adjustment' | 'general';
  title: string;
  description: string;
  estimatedImpact: number; // 0-100
  confidence: number; // 0-100
  priority: 'high' | 'medium' | 'low';
  actions?: string[];
}

// ========================================
// Notifications
// ========================================

export type NotificationSeverity = 'critical' | 'warning' | 'info' | 'tip';

export interface Notification {
  id: string;
  severity: NotificationSeverity;
  title: string;
  body: string;
  deviceId?: string;
  actionable?: {
    actionId: string;
    params: Record<string, any>;
  };
  read: boolean;
  createdAt: Date;
}

// ========================================
// Education Content
// ========================================

export type ContentType = 'video' | 'article' | 'podcast';

export interface Content {
  id: string;
  type: ContentType;
  title: string;
  description?: string;
  tags: string[];
  url: string;
  thumbnailUrl?: string;
  duration?: number; // seconds for video/podcast
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  offlineCached: boolean;
  createdAt: Date;
}

export interface UserProgress {
  userId: string;
  contentId: string;
  progress: number; // 0-100
  completed: boolean;
  lastAccessedAt: Date;
}

// ========================================
// Reports & Analytics
// ========================================

export interface Report {
  id: string;
  type: 'daily' | 'weekly' | 'monthly' | 'custom';
  period: {
    startDate: Date;
    endDate: Date;
  };
  sections: ReportSection[];
  fileUrl?: string;
  generatedAt: Date;
}

export interface ReportSection {
  title: string;
  type: 'summary' | 'chart' | 'table' | 'insights';
  data: any;
}

// ========================================
// AI Assistant
// ========================================

export interface ChatSession {
  id: string;
  userId: string;
  messages: ChatMessage[];
  contextSnapshot: {
    activeDevices: string[];
    recentReadings: Record<string, SensorReading[]>;
    activeAlerts: Notification[];
  };
  pinnedInsights: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  toolCalls?: ToolCall[];
}

export interface ToolCall {
  id: string;
  name: string;
  parameters: Record<string, any>;
  result?: any;
}
