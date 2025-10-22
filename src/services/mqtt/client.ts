/**
 * MQTT Client - Real-time sensor data streaming
 * Topics: ecobin/{deviceId}/telemetry, ecobin/{deviceId}/status, ecobin/{deviceId}/command
 */

import mqtt, { MqttClient, IClientOptions } from 'mqtt';
import { SensorReading, DeviceStatus } from '../../db/models/types';

// MQTT Broker Configuration
const MQTT_BROKER_URL = process.env.EXPO_PUBLIC_MQTT_URL || 'wss://mqtt.ecobin.example.com:8083/mqtt';
const MQTT_CLIENT_ID = `ecobin_mobile_${Math.random().toString(16).substr(2, 8)}`;

// Topic patterns
const TOPICS = {
  telemetry: (deviceId: string) => `ecobin/${deviceId}/telemetry`,
  status: (deviceId: string) => `ecobin/${deviceId}/status`,
  command: (deviceId: string) => `ecobin/${deviceId}/command`,
  allDevices: 'ecobin/+/telemetry', // Subscribe to all devices
};

export type MQTTMessageHandler = (topic: string, message: any) => void;

class MQTTClientService {
  private client: MqttClient | null = null;
  private connected: boolean = false;
  private reconnecting: boolean = false;
  private messageHandlers: Map<string, Set<MQTTMessageHandler>> = new Map();
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 5;
  private reconnectDelay: number = 1000; // Start with 1 second

  /**
   * Connect to MQTT broker
   */
  async connect(username?: string, password?: string): Promise<void> {
    if (this.client && this.connected) {
      console.log('MQTT: Already connected');
      return;
    }

    const options: IClientOptions = {
      clientId: MQTT_CLIENT_ID,
      clean: true,
      connectTimeout: 30000,
      reconnectPeriod: 0, // Disable automatic reconnect, we'll handle it manually
      username,
      password,
      will: {
        topic: `ecobin/client/${MQTT_CLIENT_ID}/status`,
        payload: JSON.stringify({ status: 'offline' }),
        qos: 1,
        retain: false,
      },
    };

    return new Promise((resolve, reject) => {
      try {
        this.client = mqtt.connect(MQTT_BROKER_URL, options);

        this.client.on('connect', () => {
          console.log('MQTT: Connected successfully');
          this.connected = true;
          this.reconnecting = false;
          this.reconnectAttempts = 0;
          this.reconnectDelay = 1000;
          resolve();
        });

        this.client.on('error', (error) => {
          console.error('MQTT: Connection error', error);
          if (!this.connected) {
            reject(error);
          }
        });

        this.client.on('close', () => {
          console.log('MQTT: Connection closed');
          this.connected = false;
          this.handleReconnect();
        });

        this.client.on('message', (topic, payload) => {
          this.handleMessage(topic, payload);
        });

        this.client.on('offline', () => {
          console.log('MQTT: Client offline');
          this.connected = false;
        });

        this.client.on('reconnect', () => {
          console.log('MQTT: Attempting reconnect...');
          this.reconnecting = true;
        });
      } catch (error) {
        console.error('MQTT: Failed to create client', error);
        reject(error);
      }
    });
  }

  /**
   * Handle reconnection with exponential backoff
   */
  private handleReconnect(): void {
    if (this.reconnecting || this.reconnectAttempts >= this.maxReconnectAttempts) {
      return;
    }

    this.reconnecting = true;
    this.reconnectAttempts++;

    const delay = Math.min(this.reconnectDelay * Math.pow(2, this.reconnectAttempts), 30000);
    console.log(`MQTT: Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts})`);

    setTimeout(() => {
      this.connect().catch((error) => {
        console.error('MQTT: Reconnect failed', error);
        this.reconnecting = false;
      });
    }, delay);
  }

  /**
   * Disconnect from broker
   */
  disconnect(): void {
    if (this.client) {
      this.client.end(true);
      this.client = null;
      this.connected = false;
      this.messageHandlers.clear();
    }
  }

  /**
   * Subscribe to device telemetry
   */
  subscribeToDevice(deviceId: string, handler: MQTTMessageHandler): void {
    const topic = TOPICS.telemetry(deviceId);
    this.subscribe(topic, handler);
  }

  /**
   * Subscribe to device status
   */
  subscribeToDeviceStatus(deviceId: string, handler: MQTTMessageHandler): void {
    const topic = TOPICS.status(deviceId);
    this.subscribe(topic, handler);
  }

  /**
   * Subscribe to all devices
   */
  subscribeToAllDevices(handler: MQTTMessageHandler): void {
    this.subscribe(TOPICS.allDevices, handler);
  }

  /**
   * Generic subscribe method
   */
  private subscribe(topic: string, handler: MQTTMessageHandler): void {
    if (!this.client || !this.connected) {
      console.error('MQTT: Cannot subscribe, not connected');
      return;
    }

    // Add handler
    if (!this.messageHandlers.has(topic)) {
      this.messageHandlers.set(topic, new Set());
    }
    this.messageHandlers.get(topic)!.add(handler);

    // Subscribe to topic
    this.client.subscribe(topic, { qos: 1 }, (error) => {
      if (error) {
        console.error(`MQTT: Failed to subscribe to ${topic}`, error);
      } else {
        console.log(`MQTT: Subscribed to ${topic}`);
      }
    });
  }

  /**
   * Unsubscribe from topic
   */
  unsubscribe(topic: string, handler?: MQTTMessageHandler): void {
    if (handler) {
      this.messageHandlers.get(topic)?.delete(handler);
    } else {
      this.messageHandlers.delete(topic);
    }

    if (this.client && this.connected) {
      this.client.unsubscribe(topic, (error) => {
        if (error) {
          console.error(`MQTT: Failed to unsubscribe from ${topic}`, error);
        }
      });
    }
  }

  /**
   * Publish command to device
   */
  sendCommand(deviceId: string, command: any): void {
    if (!this.client || !this.connected) {
      console.error('MQTT: Cannot send command, not connected');
      return;
    }

    const topic = TOPICS.command(deviceId);
    const payload = JSON.stringify(command);

    this.client.publish(topic, payload, { qos: 1, retain: false }, (error) => {
      if (error) {
        console.error(`MQTT: Failed to send command to ${deviceId}`, error);
      } else {
        console.log(`MQTT: Command sent to ${deviceId}`);
      }
    });
  }

  /**
   * Handle incoming message
   */
  private handleMessage(topic: string, payload: Buffer): void {
    try {
      const message = JSON.parse(payload.toString());
      console.log(`MQTT: Message received on ${topic}`, message);

      // Call all registered handlers for this topic
      const handlers = this.messageHandlers.get(topic);
      if (handlers) {
        handlers.forEach((handler) => handler(topic, message));
      }

      // Also call wildcard handlers
      const wildcardHandlers = this.messageHandlers.get(TOPICS.allDevices);
      if (wildcardHandlers && topic.includes('/telemetry')) {
        wildcardHandlers.forEach((handler) => handler(topic, message));
      }
    } catch (error) {
      console.error('MQTT: Failed to parse message', error);
    }
  }

  /**
   * Get connection status
   */
  isConnected(): boolean {
    return this.connected;
  }

  /**
   * Check if currently reconnecting
   */
  isReconnecting(): boolean {
    return this.reconnecting;
  }
}

// Singleton instance
export const mqttClient = new MQTTClientService();
