# EcoBin Mobile App - Project Structure & Documentation

## 📋 Overview

**EcoBin** is a comprehensive React Native + Expo mobile application for smart farming, enabling farmers to monitor and control composting, irrigation, soil health, and water quality in real-time.

### Tech Stack

- **Framework**: React Native with Expo SDK 52
- **Language**: TypeScript
- **Navigation**: React Navigation (Stack + Bottom Tabs + Modal)
- **State Management**: 
  - TanStack Query (server cache)
  - Zustand (UI/local state)
- **Offline Storage**: Expo SQLite
- **Real-time**: MQTT over WebSocket
- **Charts**: React Native Skia + SVG
- **Forms**: React Hook Form + Zod
- **Internationalization**: i18next (5 languages)
- **Notifications**: Expo Notifications

## 🎨 Design System

### Colors (Extracted from HTML Designs)

**Primary Colors:**
- Primary: #16A34A (leaf green)
- Primary Dark: #0E7A3C
- Primary Light: #19e624 (bright green accent)

**Secondary Colors:**
- Secondary: #A1887F (warm brown/tan)
- Accent: #10B981 (teal mint)

**Status Colors:**
- Success: #22C55E
- Warning: #F59E0B
- Error: #E11D48
- Info: #2563EB

**Semantic Status (from HTML):**
- Status Good: #66BB6A
- Status Warning: #FFCA28
- Status Critical: #EF5350

**Light Theme:**
- Background: #F6F8F6
- Surface: #FFFFFF
- Border: #E5E7EB
- Text Primary: #0E1B0F
- Text Secondary: #333333

**Dark Theme:**
- Background: #112112
- Surface: #1A2E1A
- Border: #2A4F2A
- Text Primary: #E0F2E0
- Text Secondary: #E3F4E4

### Typography

**Font Family**: Inter (400, 500, 600, 700, 800)

**Scale**: 12, 14, 16, 18, 20, 24, 30, 36

**Variants:**
- h1: 32px / 700 weight
- h2: 24px / 700 weight
- h3: 20px / 600 weight
- body: 16px / 400 weight
- caption: 12px / 400 weight

### Spacing

**4pt Grid System**: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80

**Border Radius:**
- sm: 4px
- base/md: 8px
- lg: 12px
- xl: 16px
- full: 9999px

### Components

**From HTML Analysis:**
- Circular Progress Indicator (Compost: 65%)
- Status Badges (Good, Warning, Critical)
- Weather Cards with 5-day forecast
- Sensor Data Grid (2x2 cards)
- Quick Action Buttons (STOP, MIX COMPOST)
- AI Assistant Input with Quick Prompts
- Timeline/Next Actions List

## 📁 Project Structure

```
EcoBinApp/
├── src/
│   ├── app/                    # App entry and root
│   ├── components/             # Reusable components
│   │   ├── ui/                 # Base UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Badge.tsx
│   │   │   └── Modal.tsx
│   │   ├── charts/             # Chart components
│   │   │   ├── LineChart.tsx
│   │   │   ├── ProgressRing.tsx
│   │   │   └── Sparkline.tsx
│   │   └── forms/              # Form components
│   │       ├── FormInput.tsx
│   │       └── FormSelect.tsx
│   ├── features/               # Feature modules
│   │   ├── auth/               # Authentication
│   │   │   ├── screens/
│   │   │   │   ├── SplashScreen.tsx
│   │   │   │   ├── LoginScreen.tsx
│   │   │   │   ├── RegisterScreen.tsx
│   │   │   │   └── OnboardingScreen.tsx
│   │   │   └── hooks/
│   │   ├── dashboard/          # Main dashboard
│   │   │   ├── screens/
│   │   │   │   └── DashboardScreen.tsx
│   │   │   └── components/
│   │   ├── compost/            # Compost monitoring
│   │   │   ├── screens/
│   │   │   │   └── CompostScreen.tsx
│   │   │   └── components/
│   │   ├── water/              # Water management
│   │   ├── soil/               # Soil analysis
│   │   ├── education/          # Learning center
│   │   ├── profile/            # User profile
│   │   └── assistant/          # AI Assistant
│   ├── services/               # External services
│   │   ├── api/
│   │   │   ├── client.ts       # REST API client
│   │   │   └── endpoints.ts
│   │   ├── mqtt/
│   │   │   ├── client.ts       # MQTT client
│   │   │   └── topics.ts
│   │   ├── notifications/
│   │   ├── speech/
│   │   └── storage/
│   ├── store/                  # State management
│   │   ├── queries/            # TanStack Query hooks
│   │   └── slices/             # Zustand stores
│   ├── theme/                  # Design tokens
│   │   ├── colors.ts           ✅
│   │   ├── typography.ts       ✅
│   │   ├── spacing.ts          ✅
│   │   └── index.ts            ✅
│   ├── i18n/                   # Internationalization
│   │   ├── locales/
│   │   │   ├── az/             # Azerbaijani
│   │   │   ├── tr/             # Turkish
│   │   │   ├── en/             # English
│   │   │   ├── ru/             # Russian
│   │   │   └── he/             # Hebrew
│   │   └── config.ts
│   ├── db/                     # Database
│   │   ├── models/
│   │   │   └── types.ts        ✅ Complete data models
│   │   ├── migrations/
│   │   └── sync/
│   └── utils/                  # Utilities
│       ├── date.ts
│       ├── units.ts
│       └── validation.ts
├── assets/                     # Static assets
│   ├── images/
│   ├── icons/
│   └── lottie/
├── App.tsx                     # Root component
├── package.json
└── tsconfig.json
```

## 🔌 Data Models (TypeScript Types)

### Core Entities

**User Management:**
- `User`: id, name, email, locale, units, farms, devices, roles
- `UserRole`: 'owner' | 'admin' | 'viewer'

**IoT Devices:**
- `Device`: id, type, firmware, status, location
- `DeviceType`: 'composter' | 'moisture_sensor' | 'weather_station' | 'water_tank' | 'irrigation_controller' | 'soil_sensor'
- `SensorReading`: id, deviceId, type, value, unit, timestamp

**Compost Management:**
- `CompostBatch`: id, name, stage, progress, trends, actions
- `CompostStage`: 'mesophilic' | 'thermophilic' | 'cooling' | 'curing'
- `CompostAction`: id, type, scheduledAt, automatic, aiRecommended

**Water Management:**
- `IrrigationSchedule`: id, fieldId, mode, startAt, duration
- `WaterQualitySample`: id, source, metrics (pH, DO, nitrate, COD, TDS, EC)
- `WaterTank`: id, capacity, currentLevel, fillPercentage

**Soil Analysis:**
- `SoilSample`: id, fieldId, metrics (N, P, K, pH, moisture), healthScore
- `AIRecommendation`: id, type, description, estimatedImpact, confidence

**Content & Notifications:**
- `Notification`: id, severity, title, body, actionable
- `Content`: id, type, title, tags, url, duration, offlineCached
- `Report`: id, period, sections, fileUrl

**AI Assistant:**
- `ChatSession`: id, messages, contextSnapshot, pinnedInsights
- `ChatMessage`: id, role, content, timestamp, toolCalls

## 🌐 API & Services

### REST API Endpoints

**Authentication:**
- POST `/auth/login`
- POST `/auth/register`
- POST `/auth/refresh`
- POST `/auth/logout`

**Devices:**
- GET `/devices` - List all devices
- GET `/devices/:id` - Get device details
- POST `/devices/:id/command` - Send command

**Sensor Data:**
- GET `/readings/latest/:deviceId` - Latest readings
- GET `/readings/range/:deviceId` - Historical data

**Compost:**
- GET `/compost/batches` - List batches
- POST `/compost/batches/:id/actions` - Create action

**Irrigation:**
- GET `/irrigation/schedules` - List schedules
- POST `/irrigation/schedules/:id/trigger` - Manual trigger

**AI Assistant:**
- POST `/assistant/chat` - Send message
- GET `/assistant/sessions/:id` - Get session

### MQTT Topics

**Telemetry:** `ecobin/{deviceId}/telemetry` (QoS 1)
**Status:** `ecobin/{deviceId}/status` (QoS 1, retained)
**Command:** `ecobin/{deviceId}/command` (QoS 1)

**Features:**
- Auto-reconnect with exponential backoff
- Offline message buffering
- Message handler registry

## 🚀 Navigation Structure

### Bottom Tabs (Main)

1. **Dashboard** 🏠
   - Real-time overview
   - Weather widget
   - Quick stats
   - Alerts preview
   - AI Assistant entry

2. **Compost** ♻️
   - Circular progress indicator
   - Live sensor charts
   - Control buttons (MIX, STOP)
   - Next actions timeline

3. **Water** 💧
   - Irrigation calendar
   - Tank visualization
   - Water quality metrics
   - Usage analytics

4. **Soil** 🌱
   - Health score
   - N-P-K metrics
   - AI recommendations
   - Historical trends

5. **Learn** 📚
   - Content library
   - Progress tracking
   - Search & filters

6. **Profile** 👤
   - Settings
   - Devices
   - Preferences

### Modals

- **AI Assistant** (Global access)
- **Notification Center**
- **Device Controls**
- **Report Generator**

## 🎯 Core Features

### Authentication & Onboarding
- ✅ Splash with Lottie animation
- ✅ Login (email/password + social)
- ✅ Registration multi-step
- ✅ Onboarding carousel (3-5 slides)
- ✅ Device pairing wizard

### Dashboard
- Real-time hero cards
- Weather tile with alerts
- Status grid (2x2)
- Notifications preview
- AI Assistant quick access

### Compost Monitoring
- 65% circular progress (from HTML)
- Live charts: Temp, Humidity, Weight, CO2
- Control buttons: MIX, STOP (red)
- Batch timeline
- Sensor data grid (2x2 cards)

### Water Management
- Monthly calendar
- Rainwater tank level
- Quality metrics (pH, DO, Nitrate, COD, TDS, EC)
- Auto-irrigation scheduling
- Usage analytics

### Soil Analysis
- Health score (0-100)
- N-P-K breakdown
- AI recommendations
- Historical comparison
- PDF export

### AI Assistant
- Natural language chatbot
- Voice input/output
- Function calling (tools)
- Context-aware suggestions
- Safety confirmations

## 🌍 Internationalization

**Languages:**
- Azerbaijani (az) - Primary
- Turkish (tr)
- English (en)
- Russian (ru)
- Hebrew (he)

**Features:**
- ICU message format
- Date/number/unit localization
- Metric/Imperial units
- RTL support (Hebrew)

## 🔒 Security

- OAuth 2.1 / OIDC
- Biometric unlock
- TLS 1.2+ for all connections
- Encrypted SQLite
- Role-based access control

## ✅ Completed Setup

1. ✅ Expo project initialized with TypeScript
2. ✅ All dependencies installed
3. ✅ Complete directory structure created
4. ✅ Design tokens extracted and implemented
   - ✅ Colors (light + dark themes)
   - ✅ Typography (Inter font system)
   - ✅ Spacing (4pt grid)
   - ✅ Border radius, shadows, icons
5. ✅ TypeScript data models defined (all entities)
6. ✅ API client scaffold with endpoints
7. ✅ MQTT client with reconnection logic
8. ✅ Base UI components (Button, Card)

## 📝 Next Steps

1. Implement remaining UI components (Input, Badge, Modal)
2. Create navigation structure (Stack + Bottom Tabs)
3. Build authentication flow screens
4. Implement Dashboard with mock data
5. Create Compost Monitoring screen
6. Set up i18n configuration
7. Add chart components (Skia)
8. Implement offline sync
9. Build AI Assistant modal
10. Add unit tests

## 🎨 HTML Design Mapping

### Splash Screen
- Gradient background: #A8D8B9 to #3E8E7E
- Pulsing logo animation
- Progress bar (white 50%)
- Tagline: "Smart Farming, Sustainable Future"

### Dashboard
- Header: Menu + Notifications + Analytics + Avatar
- Greeting: "Good morning, Alex"
- Location: "Green Valley Farm"
- Weather card: Current + 5-day forecast
- Status grid: 2x2 cards with status dots
- Alerts list: Critical + Warning icons
- Featured learning: Video thumbnail with play overlay
- AI Assistant: Input with mic + Quick prompts

### Compost Monitoring
- Circular progress: 65% with center text
- Est. 3 days remaining
- Sensor grid: 2x2 (Weight, Temp, CO2, Humidity)
- Trend arrows: ↑ green, ↓ red, — gray
- Action buttons: Red STOP, Ghost MIX
- Next actions timeline

## 🚀 How to Run

```bash
# Install dependencies
cd EcoBinApp
npm install

# Start development server
npm start

# Run on Android
npm run android

# Run on iOS (macOS only)
npm run ios

# Run on Web
npm run web
```

## 📦 Dependencies

```json
{
  "dependencies": {
    "expo": "~52.x",
    "react": "18.x",
    "react-native": "0.76.x",
    "@react-navigation/native": "^7.x",
    "@react-navigation/stack": "^7.x",
    "@react-navigation/bottom-tabs": "^7.x",
    "@tanstack/react-query": "^5.x",
    "zustand": "^4.x",
    "expo-sqlite": "~15.x",
    "react-hook-form": "^7.x",
    "zod": "^3.x",
    "@shopify/react-native-skia": "^1.x",
    "react-native-svg": "^15.x",
    "mqtt": "^5.x",
    "i18next": "^23.x",
    "react-i18next": "^14.x",
    "expo-localization": "~16.x",
    "expo-notifications": "~0.29.x",
    "expo-speech": "~12.x"
  }
}
```

## 📄 License

Proprietary - EcoBin Smart Farming Platform
