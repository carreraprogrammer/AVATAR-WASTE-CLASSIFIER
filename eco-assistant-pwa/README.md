# EcoAssistant PWA - AI-Powered Waste Classification Kiosk

> **Version:** 1.0.0
> **Status:** MVP - Ready for Development
> **Tech Stack:** Ionic React + TypeScript + Vite + Zustand + TensorFlow.js
> **Architecture:** Atomic Design + Clean Architecture

---

## 🎯 Overview

EcoAssistant is an interactive PWA kiosk that classifies waste in real-time using AI (TensorFlow.js + Roboflow) with an emotional avatar interface. Designed for Colombian universities following NTC 2184 waste classification standards.

### Key Features

- ✅ **Fast Path Classification** (<1s response time)
- ✅ **Object Detection** with TensorFlow.js COCO-SSD
- ✅ **Emotional Avatar** with state-based animations
- ✅ **NTC 2184 Compliance** (Colombian waste classification colors)
- ✅ **PWA** - Installable, offline-capable
- ✅ **Type-Safe** with TypeScript
- ✅ **State Management** with Zustand
- ✅ **Atomic Design** component architecture

---

## 📁 Project Structure

```
eco-assistant-pwa/
├── src/
│   ├── atoms/          # Atomic Design Level 1 (Button, Badge, Avatar, Spinner)
│   ├── molecules/      # Atomic Design Level 2 (CameraView, StatusBadge)
│   ├── organisms/      # Atomic Design Level 3 (ClassificationResult, AvatarController)
│   ├── templates/      # Atomic Design Level 4 (KioskLayout, AdminLayout)
│   ├── pages/          # Atomic Design Level 5 (HomePage, ScanPage, AdminPage)
│   ├── services/       # External integrations (N8N, TensorFlow.js, ElevenLabs)
│   ├── store/          # Zustand state management
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Utility functions
│   ├── types/          # TypeScript type definitions
│   ├── constants/      # App constants (NTC 2184 colors, materials)
│   ├── config/         # App configuration
│   └── assets/         # Static assets (styles, images, fonts)
├── public/             # Public assets (avatar.riv, icons, audio)
├── tests/              # Test utilities and mocks
├── e2e/                # Playwright E2E tests
├── .storybook/         # Storybook configuration
└── scripts/            # Build and deployment scripts
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

```bash
# Navigate to the PWA directory
cd eco-assistant-pwa

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Edit .env.local with your API endpoints
```

### Development

```bash
# Start development server (http://localhost:3000)
npm run dev

# Type checking
npm run type-check

# Lint code
npm run lint

# Format code
npm run format
```

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Testing

```bash
# Run unit tests
npm test

# Run tests with UI
npm run test:ui

# Run E2E tests
npm run test:e2e

# Generate coverage report
npm run test:coverage
```

---

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file based on `.env.example`:

```bash
# N8N Webhook URL (Fast Path Classification)
VITE_N8N_WEBHOOK_URL=https://n8n.yourdomain.com

# Backend Rails API URL
VITE_BACKEND_API_URL=https://backend.yourdomain.com

# ElevenLabs Configuration
VITE_ELEVENLABS_AGENT_ID=your-agent-id
VITE_ELEVENLABS_API_KEY=your-api-key

# Tenant Configuration
VITE_TENANT_ID=udenar-station-01
VITE_STATION_ID=00000000-0000-0000-0000-000000000001
VITE_ORGANIZATION_ID=00000000-0000-0000-0000-000000000002

# Feature Flags
VITE_ENABLE_OBJECT_DETECTION=true
VITE_ENABLE_VOICE_FEEDBACK=true
VITE_ENABLE_CONVERSATION=true
```

---

## 🏗️ Architecture

### Atomic Design Hierarchy

1. **Atoms:** Basic building blocks (Button, Badge, Avatar, Spinner)
2. **Molecules:** Simple component combinations (CameraView, StatusBadge)
3. **Organisms:** Complex components (ClassificationResult, AvatarController)
4. **Templates:** Page layouts (KioskLayout, AdminLayout)
5. **Pages:** Complete screens (HomePage, ScanPage, AdminPage)

### State Management (Zustand)

```typescript
// Global state slices:
- classificationSlice  // Waste classification state
- avatarSlice          // Avatar state and animations
- cameraSlice          // Camera stream management
- configSlice          // App configuration (persisted)
```

### Services Layer

```typescript
// API Services
- n8nService           // N8N webhook client (Fast Path)
- backendService       // Rails backend client

// AI Services
- objectDetectionService  // TensorFlow.js COCO-SSD
- imageProcessing         // Image manipulation utilities

// Storage
- localStorage         // Persistent config storage
```

---

## 🎨 NTC 2184 Color System

Colombian waste classification standard colors:

| Material | Color | Hex Code | Container |
|----------|-------|----------|-----------|
| Plastic/Glass | **AZUL** | `#007BFF` | Blue bin |
| Paper/Cardboard | **BLANCO** | `#F5F5F5` | White bin |
| Organic | **VERDE** | `#28A745` | Green bin |
| Metal | **GRIS** | `#6C757D` | Gray bin |
| Non-recyclable | **NEGRO** | `#343A40` | Black bin |

---

## 🎭 Avatar States

The avatar changes based on classification state:

- **Idle:** ♻️ Waiting for waste
- **Analyzing:** 🔍 Processing image
- **Success:** 🎉 Classification complete
- **Error:** 😕 Needs help
- **Speaking:** 💬 Voice feedback active

---

## 🔌 API Integration

### N8N Fast Path Classification

```typescript
POST /webhook/classify-fast

Request:
{
  "image_base64": "data:image/jpeg;base64,...",
  "tenant_id": "udenar-station-01",
  "trace_id": "uuid-v4",
  "station_id": "uuid",
  "organization_id": "uuid"
}

Response:
{
  "success": true,
  "material": "PLASTIC",
  "color": "AZUL",
  "confidence": 0.95,
  "message": "Es plástico, va en el contenedor AZUL"
}
```

---

## 📱 PWA Features

- ✅ Offline capability via Service Worker
- ✅ Installable on iOS/Android
- ✅ Fullscreen kiosk mode
- ✅ Wake Lock (prevents screen sleep)
- ✅ App manifest for home screen installation

---

## 🧪 Testing Strategy

- **Unit Tests:** Vitest + React Testing Library
- **E2E Tests:** Playwright (cross-browser)
- **Visual Regression:** Storybook + Chromatic
- **Performance:** Lighthouse CI

---

## 📊 Performance Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| Object Detection | <200ms | TensorFlow.js inference |
| Fast Path Latency | <1000ms | Camera → Result visible |
| Avatar Transition | <300ms | State change animation |
| PWA Load Time | <2s | First Contentful Paint |
| Lighthouse Score | >90 | PWA audit |

---

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod
```

### Manual Build

```bash
# Build for production
npm run build

# Serve from dist/ directory
npx serve dist -p 3000
```

---

## 🛠️ Development Tools

- **Storybook:** Component development (`npm run storybook`)
- **TypeScript:** Type checking (`npm run type-check`)
- **ESLint:** Code linting (`npm run lint`)
- **Prettier:** Code formatting (`npm run format`)
- **Vite DevTools:** Fast HMR and debugging

---

## 📚 Key Dependencies

```json
{
  "@ionic/react": "^8.3.0",
  "@tensorflow-models/coco-ssd": "^2.2.3",
  "@tensorflow/tfjs": "^4.15.0",
  "zustand": "^4.5.0",
  "react": "^18.2.0",
  "vite": "^5.0.8",
  "typescript": "^5.3.3"
}
```

---

## 🐛 Troubleshooting

### Camera Not Working

- Ensure HTTPS or localhost (required for camera API)
- Check browser camera permissions
- Verify `cameraSettings` in config

### TensorFlow.js Fails to Load

- Check network connectivity
- Verify CORS headers on model CDN
- Try clearing browser cache

### Build Errors

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

---

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make changes and test thoroughly
3. Run linting and tests: `npm run lint && npm test`
4. Commit with clear messages
5. Push and create a pull request

---

## 📄 License

This project is part of the EcoAssistant Kiosk system for environmental research at Universidad de Nariño.

---

## 👥 Team

- **Architecture:** Based on Atomic Design + Clean Architecture principles
- **Framework:** Ionic React + TypeScript + Vite
- **State Management:** Zustand
- **AI:** TensorFlow.js + Roboflow + GPT-4 Vision

---

## 📞 Support

For issues or questions:
- Check the [documentation](./docs)
- Review existing GitHub issues
- Contact the development team

---

**Built with ❤️ for a sustainable future**
