# EcoAssistant PWA - AI-Powered Waste Classification Kiosk 🌱

> **Version:** 1.0.0
> **Status:** ✅ Production Ready - All Core Features Implemented
> **Tech Stack:** Ionic React + TypeScript + Vite + Zustand + TensorFlow.js + ElevenLabs + Rive
> **Architecture:** Atomic Design + Clean Architecture

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2-blue.svg)](https://reactjs.org/)
[![Ionic](https://img.shields.io/badge/Ionic-8.3-blue.svg)](https://ionicframework.com/)

---

## 🎯 Overview

EcoAssistant is an interactive PWA kiosk that classifies waste in real-time using AI with an **emotional Rive avatar** and **natural voice feedback**. Designed for Colombian universities following **NTC 2184 waste classification standards**.

### ✨ Implemented Features

- ✅ **Real-time Camera Detection** with TensorFlow.js COCO-SSD
- ✅ **ElevenLabs Voice Integration** (Text-to-Speech + Educational Tips)
- ✅ **Rive Animated Avatar** with state-based emotional expressions
- ✅ **Complete Classification Workflow** (Camera → Detection → API → Voice → Result)
- ✅ **NTC 2184 Compliance** (Colombian waste classification colors)
- ✅ **Auto-Reset Idle Timer** (15s inactivity timeout)
- ✅ **PWA** - Installable, offline-capable, fullscreen kiosk mode
- ✅ **Type-Safe** with TypeScript
- ✅ **State Management** with Zustand (4 slices with persistence)
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
# REQUIRED: Classification API
VITE_N8N_WEBHOOK_URL=https://n8n.yourdomain.com/webhook/classify

# REQUIRED: ElevenLabs Voice Configuration
VITE_ELEVENLABS_API_KEY=your-api-key-here
VITE_ELEVENLABS_VOICE_ID=charlie-es

# Optional: Backend Rails API URL (for analytics)
VITE_BACKEND_API_URL=https://backend.yourdomain.com

# Optional: ElevenLabs Conversational AI (future feature)
VITE_ELEVENLABS_AGENT_ID=your-agent-id

# Optional: Tenant Configuration
VITE_TENANT_ID=udenar-station-01
VITE_STATION_ID=00000000-0000-0000-0000-000000000001
VITE_ORGANIZATION_ID=00000000-0000-0000-0000-000000000002

# Optional: Feature Flags
VITE_ENABLE_OBJECT_DETECTION=true
VITE_ENABLE_VOICE_FEEDBACK=true
VITE_ENABLE_CONVERSATION=false
```

**Getting ElevenLabs API Key:**
1. Sign up at [elevenlabs.io](https://elevenlabs.io)
2. Navigate to Profile → API Keys
3. Create a new API key
4. Copy to `VITE_ELEVENLABS_API_KEY`

**Recommended Voice IDs:**
- `charlie-es` - Spanish male voice (default)
- `rachel` - English female voice
- `daniel` - English male voice

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

## 🎭 Rive Avatar System

The app features an **emotional Rive-animated avatar** with state-based expressions and background colors.

### Avatar States

| State | Eyes | Mouth | When | Background Color |
|-------|------|-------|------|------------------|
| **Idle** | Open | Neutral | Waiting for waste | Default green |
| **Welcome** | Open | Smile | Greeting user | Default green |
| **Analyzing** | Squinted | Neutral | Processing classification | Default green |
| **Success** | Open | Smile | Classification complete | NTC 2184 color (material-based) |
| **Error** | Confused | Frown | Needs help | Default green |
| **Speaking** | Open | Talking | Voice feedback active | Current state color |

### Setting Up Your Rive Avatar

1. **Create Rive Animation:**
   - Visit [rive.app](https://rive.app) and create a free account
   - Design your avatar character (eco-themed mascot recommended)
   - Create a State Machine named `"State Machine"` with inputs:
     - `eyeState` (Number): 0=open, 1=squinted, 2=confused
     - `mouthState` (Number): 0=neutral, 1=frown, 2=smile, 3=talking
     - `backgroundColor` (Number): Hex color converted to integer

2. **Export and Install:**
   - Export as `.riv` file
   - Place at `/public/avatar.riv`
   - Restart development server

3. **Detailed Instructions:**
   - See complete guide: `/public/RIVE_AVATAR_INSTRUCTIONS.md`
   - Includes state machine configuration, color mappings, and testing checklist

4. **Fallback:**
   - If `/public/avatar.riv` is missing, the app uses an emoji-based fallback avatar
   - All functionality works the same, just without smooth animations

### NTC 2184 Background Colors

The avatar background automatically changes based on classified material:

- 🔵 **AZUL** (`#007BFF`) - Plastic/Glass
- ⚪ **BLANCO** (`#F5F5F5`) - Paper/Cardboard
- 🟢 **VERDE** (`#28A745`) - Organic
- ⚫ **GRIS** (`#6C757D`) - Metal
- ⚫ **NEGRO** (`#343A40`) - Non-recyclable

---

## 🎙️ ElevenLabs Voice Integration

Natural voice feedback powered by **ElevenLabs Text-to-Speech** (required for hackathon).

### Voice Workflow

1. **Welcome**: "¡Hola! Soy tu asistente eco-amigable. Acerca tu residuo a la cámara."
2. **Analyzing**: "Estoy analizando tu residuo, un momento por favor..."
3. **Success**: "Este es [MATERIAL]. Deposítalo en el contenedor [COLOR]."
4. **Educational Tip**: Random eco-fact about the material (2s delay)
5. **Error**: "Hubo un problema al clasificar. Por favor, intenta de nuevo."

### Features

- ✅ **Queue-based playback**: Sequential audio without blocking UI
- ✅ **Spanish voice**: Uses `charlie-es` by default
- ✅ **Customizable settings**: Speed, pitch, stability via config
- ✅ **Educational content**: 3+ tips per material type
- ✅ **Error handling**: Graceful fallback if API fails

### Voice Configuration

Customize in `src/constants/config.ts`:

```typescript
export const VOICE_MESSAGES = {
  welcome: '¡Hola! Soy tu asistente eco-amigable...',
  analyzing: 'Estoy analizando tu residuo...',
  // ... customize all messages
}
```

---

## 🔄 Complete Classification Workflow

End-to-end user experience implemented in `HomePageComplete.tsx`:

```
1. IDLE STATE
   ├─ Avatar: Calm, breathing
   ├─ Camera: Active, detecting
   └─ Voice: Welcome message (on mount)
        ↓
2. WASTE DETECTED (TensorFlow.js COCO-SSD)
   ├─ Object detected with >50% confidence
   ├─ Bounding box drawn on camera
   └─ Image auto-captured
        ↓
3. CLASSIFYING STATE
   ├─ Avatar: Focused, analyzing expression
   ├─ Camera: Hidden
   ├─ Voice: "Estoy analizando..."
   └─ API: POST to N8N webhook (3s timeout)
        ↓
4. SUCCESS STATE
   ├─ Avatar: Happy, smiling + material color background
   ├─ Result Card: Material, color, confidence, message
   ├─ Voice: Success message + educational tip (2s delay)
   ├─ Actions: "Preguntar más" | "Nuevo escaneo"
   └─ Idle Timer: 15s countdown to auto-reset
        ↓
5. AUTO-RESET
   └─ Return to IDLE state
```

### Error Handling

- **Camera denied**: Show permission instructions
- **Detection timeout**: Continue scanning (no hard timeout)
- **API failure**: Show error, speak error message, auto-retry in 5s
- **Network offline**: Display offline indicator, graceful degradation

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

- **HTTPS Required**: Camera API requires HTTPS or localhost
- **Check Permissions**: Browser must allow camera access (check address bar icon)
- **Device Check**: Ensure device has a working camera
- **Console Errors**: Open browser console (F12) for specific error messages
- **Supported Browsers**: Chrome/Edge recommended (Safari may have issues)

### Voice Not Playing

- **API Key**: Verify `VITE_ELEVENLABS_API_KEY` is set correctly in `.env.local`
- **Voice ID**: Ensure `VITE_ELEVENLABS_VOICE_ID` is valid (try "charlie-es" for Spanish)
- **Browser Support**: Check if browser supports Web Audio API (most modern browsers do)
- **Network**: Voice requires active internet connection
- **Console Errors**: Check for ElevenLabs API errors in console
- **Quota**: Free tier has monthly character limit, check your ElevenLabs dashboard

### Rive Avatar Not Animating

- **File Missing**: Check if `/public/avatar.riv` exists
- **State Machine**: Verify Rive file has "State Machine" with correct inputs (eyeState, mouthState, backgroundColor)
- **Console Errors**: Look for Rive loading errors in browser console
- **Fallback Active**: If you see emojis instead of animation, Rive file is missing (app will still function)
- **File Permissions**: Ensure avatar.riv is readable (check file permissions)

### Classification Failing

- **N8N URL**: Verify `VITE_N8N_WEBHOOK_URL` is correct and publicly accessible
- **Timeout**: Default 3s timeout may be too short for complex models (increase in config)
- **Image Size**: Very large images may fail - check compression settings in `imageProcessing.ts`
- **API Response**: Verify N8N returns expected JSON format (check network tab)
- **CORS**: Ensure N8N webhook allows CORS from your domain
- **Authentication**: Check if N8N webhook requires authentication

### TensorFlow.js Fails to Load

- **Network**: Check internet connectivity (model downloaded from CDN)
- **CORS Headers**: Verify CORS headers on model CDN
- **Browser Cache**: Try clearing browser cache
- **CDN Down**: Try alternative CDN URL in config
- **Memory**: COCO-SSD requires ~200MB, ensure device has sufficient memory

### Build Errors

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite
npm run dev

# Type check for errors
npm run type-check

# Check for dependency conflicts
npm list
```

### PWA Not Installing

- **HTTPS Required**: PWA installation requires HTTPS (except localhost)
- **Manifest Valid**: Check `/public/manifest.json` is valid JSON
- **Service Worker**: Ensure service worker registered (check Application tab in DevTools)
- **Icons**: Verify icons exist at paths specified in manifest
- **Desktop**: Try "Install App" from browser menu (three dots)
- **Mobile**: Try "Add to Home Screen" from share menu

---

## 📦 Implemented Components

### Atoms (Basic UI)
- ✅ `Avatar` - Rive-animated avatar with emoji fallback (`src/atoms/Avatar/AvatarRive.tsx`)
- ✅ `Button` - Primary, secondary, danger variants with loading states
- ✅ `Badge` - Info, success, error, warning variants
- ✅ `Spinner` - Loading indicator with size variants

### Molecules (Composite)
- ✅ `CameraView` - Real camera access with TensorFlow.js detection loop (`src/molecules/CameraView/`)
- ✅ `StatusBadge` - Material display with NTC 2184 colors (`src/molecules/StatusBadge/`)
- ✅ `ClassificationCard` - Result card with educational tips (`src/molecules/ClassificationCard/`)

### Organisms (Complex)
- ✅ `ClassificationResult` - Complete result display with actions (`src/organisms/ClassificationResult/`)
- ✅ `AvatarController` - Avatar state management and sync (`src/organisms/AvatarController/`)

### Templates (Layouts)
- ✅ `KioskLayout` - Fullscreen kiosk layout with header/footer (`src/templates/KioskLayout/`)

### Pages (Complete Views)
- ✅ `HomePage` - Complete classification workflow (`src/pages/HomePage/HomePageComplete.tsx`)
  - Camera detection with visual feedback
  - Auto-capture when waste detected
  - API classification with loading state
  - Voice feedback at each step
  - Result display with educational tips
  - Auto-reset idle timer (15s)

### Services (External Integrations)
- ✅ `n8n.service.ts` - N8N webhook client with timeout
- ✅ `backend.service.ts` - Rails backend API client
- ✅ `elevenlabs.service.ts` - ElevenLabs TTS with audio queue
- ✅ `tts.service.ts` - High-level voice wrapper
- ✅ `objectDetection.ts` - TensorFlow.js COCO-SSD wrapper
- ✅ `imageProcessing.ts` - Image compression and cropping
- ✅ `localStorage.ts` - Persistent storage utilities

### Custom Hooks
- ✅ `useCamera` - Camera stream management
- ✅ `useObjectDetection` - TensorFlow.js detection loop
- ✅ `useClassification` - N8N API integration
- ✅ `useVoice` - ElevenLabs voice feedback
- ✅ `useIdleTimer` - Auto-reset timer

### Store (Zustand)
- ✅ `classificationSlice` - Classification state management
- ✅ `avatarSlice` - Avatar state and background color
- ✅ `cameraSlice` - Camera stream state
- ✅ `configSlice` - App configuration with persistence

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

## 🚧 Future Enhancements

The core hackathon features are complete! Optional enhancements for future development:

### Pending Features
- ⏳ **Admin Configuration Page** - UI for managing app settings, voice messages, and educational tips
- ⏳ **Comprehensive Test Suite** - Unit tests (Vitest) + E2E tests (Playwright) for all components
- ⏳ **Storybook Documentation** - Interactive component library with visual testing
- ⏳ **ElevenLabs Conversational AI** - Two-way conversation mode (requires agent setup)
- ⏳ **Analytics Dashboard** - Usage statistics and classification history
- ⏳ **Multi-language Support** - English, Portuguese support (currently Spanish only)

### Contributing to These Features

We welcome contributions! See the **Contributing** section above for guidelines.

---

## 👥 Team & Acknowledgments

### Built With
- **Architecture:** Atomic Design + Clean Architecture
- **Framework:** Ionic React 8.3 + TypeScript 5.3 + Vite 5.0
- **State Management:** Zustand 4.5
- **AI/ML:** TensorFlow.js 4.15 (COCO-SSD)
- **Voice:** ElevenLabs Text-to-Speech API
- **Animation:** Rive React Canvas
- **Classification API:** N8N Workflows

### Special Thanks
- **Ionic Team** - Excellent React framework for mobile/kiosk apps
- **ElevenLabs** - Natural voice synthesis (hackathon requirement ✅)
- **Rive** - Amazing animation tools for emotional avatars
- **TensorFlow.js Team** - Client-side ML capabilities
- **Colombian NTC 2184 Standard** - Waste classification guidance
- All beta testers and contributors

---

## 📞 Support

For issues or questions:

- **GitHub Issues**: [Report bugs or request features](https://github.com/your-org/AVATAR-WASTE-CLASSIFIER/issues)
- **Documentation**: Check `/public/RIVE_AVATAR_INSTRUCTIONS.md` for avatar setup
- **Icon Setup**: See `/public/icons/README.md` for generating PNG icons
- **Discussions**: [GitHub Discussions](https://github.com/your-org/AVATAR-WASTE-CLASSIFIER/discussions)

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](../LICENSE) file for details.

Part of the EcoAssistant Kiosk system for environmental research at Colombian universities.

---

**Built with ❤️ for a sustainable future** 🌍♻️

**Hackathon 2024** - All critical features implemented and production-ready!
