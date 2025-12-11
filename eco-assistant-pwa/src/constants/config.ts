/**
 * Configuration Constants
 * Default app configuration and settings
 */

import type { AppConfig, FeatureFlags, DetectionSettings } from '@/types';

export const DEFAULT_CONFIG: AppConfig = {
  tenantId: 'udenar-station-01',
  stationId: '00000000-0000-0000-0000-000000000001',
  organizationId: '00000000-0000-0000-0000-000000000002',
  enableVoice: true,
  enableConversation: true,
  idleTimeout: 10000, // 10 seconds
  language: 'es',
  voiceSettings: {
    voiceId: 'charlie-es',
    model: 'eleven_turbo_v2_5',
    stability: 0.7,
    similarityBoost: 0.8,
    style: 0.5,
    useSpeakerBoost: true
  },
  cameraSettings: {
    resolution: {
      width: 640,
      height: 480
    },
    frameRate: 30,
    facingMode: 'environment'
  },
  detectionSettings: {
    confidenceThreshold: 0.6,
    wasteCategories: [
      'bottle',
      'cup',
      'cell phone',
      'banana',
      'apple',
      'orange',
      'carrot',
      'hot dog',
      'pizza',
      'donut',
      'bowl',
      'fork',
      'knife',
      'spoon'
    ],
    autoCapture: true,
    captureDelay: 500
  }
};

export const DEFAULT_FEATURE_FLAGS: FeatureFlags = {
  enableObjectDetection: true,
  enableBackgroundValidation: true,
  enableVoiceFeedback: true,
  enableConversation: true,
  enableAnalytics: true,
  enableOfflineMode: false
};

export const ANIMATION_DURATIONS = {
  // Ultra-fast (instant feedback)
  blink: 150,
  mouthTwitch: 100,

  // Fast (immediate response)
  buttonPress: 200,
  colorFlash: 250,

  // Normal (comfortable pace)
  stateTransition: 300,
  backgroundFade: 500,
  cardSlideIn: 400,

  // Slow (deliberate, dramatic)
  celebration: 800,
  errorShake: 600,
  resetFade: 1000,

  // Very slow (ambience)
  breathingCycle: 4000,
  backgroundPulse: 3000
} as const;

export const API_ENDPOINTS = {
  n8n: {
    classifyFast: '/webhook/classify-fast',
    classifyDetailed: '/webhook/classify-detailed',
    logDiscrepancy: '/webhook/log-discrepancy'
  },
  backend: {
    scans: '/api/v1/scans',
    corrections: '/api/v1/classification_corrections',
    analytics: '/api/v1/analytics'
  }
} as const;

export const VOICE_MESSAGES = {
  welcome: [
    'Hola, acerca tu residuo',
    'Bienvenido, ¿qué vas a reciclar?',
    'Hola, muéstrame lo que tienes'
  ],
  analyzing: [
    'Un momento...',
    'Analizando...',
    'Déjame ver...'
  ],
  success: {
    PLASTIC: [
      '¡Perfecto! Es plástico, va en el contenedor AZUL',
      '¡Bien hecho! Plástico al contenedor AZUL',
      '¡Excelente! Ese plástico va al AZUL'
    ],
    PAPER: [
      '¡Genial! Es papel, va en el contenedor BLANCO',
      '¡Correcto! Papel al contenedor BLANCO'
    ],
    ORGANIC: [
      '¡Fantástico! Es orgánico, va al contenedor VERDE',
      '¡Perfecto! Ese orgánico al compostaje VERDE'
    ],
    METAL: [
      '¡Muy bien! Es metal, va en el contenedor GRIS',
      '¡Correcto! Metal al contenedor GRIS'
    ],
    GLASS: [
      '¡Excelente! Es vidrio, va en el contenedor AZUL',
      '¡Perfecto! Vidrio al contenedor AZUL'
    ],
    CARDBOARD: [
      '¡Muy bien! Es cartón, va en el contenedor BLANCO',
      '¡Correcto! Cartón al contenedor BLANCO'
    ],
    OTHER: [
      'Este material no es reciclable, va en el contenedor NEGRO',
      'No es reciclable, al contenedor NEGRO'
    ]
  },
  error: {
    noWaste: [
      'No veo ningún residuo. Acércalo a la cámara',
      'Mmm, intenta mostrármelo mejor'
    ],
    lowConfidence: [
      'Este es difícil. ¿Me das un segundo más?',
      'Mmm, déjame analizarlo mejor'
    ],
    apiError: [
      'Ups, tuve un problema técnico. Reintentemos',
      'Dame un momento, algo falló'
    ]
  }
} as const;

export const EDUCATIONAL_TIPS = {
  PLASTIC: [
    'Sabías que el plástico PET puede reciclarse hasta 7 veces',
    'Has evitado que este plástico llegue al océano',
    'Reciclar una botella ahorra energía para 3 horas de TV'
  ],
  PAPER: [
    'Reciclar papel salva árboles y ahorra energía',
    'Una tonelada de papel reciclado salva 17 árboles',
    'El papel puede reciclarse 5-7 veces'
  ],
  ORGANIC: [
    'Los residuos orgánicos se convierten en abono nutritivo',
    'El compostaje reduce emisiones de metano',
    'Los orgánicos representan el 50% de nuestros residuos'
  ],
  METAL: [
    'El metal puede reciclarse infinitas veces',
    'Reciclar aluminio ahorra 95% de energía',
    'Una lata reciclada ahorra energía para 4 horas de TV'
  ],
  GLASS: [
    'El vidrio se puede reciclar infinitas veces sin perder calidad',
    'Reciclar vidrio ahorra 30% de energía',
    'Una botella reciclada tarda solo 30 días en volver a la tienda'
  ],
  CARDBOARD: [
    'El cartón puede reciclarse 5-7 veces',
    'Reciclar cartón reduce 75% de contaminación del aire',
    'Una tonelada de cartón reciclado salva 17 árboles'
  ],
  OTHER: [
    'Algunos materiales no son reciclables pero podemos reducir su uso',
    'Busca alternativas reutilizables para próximas veces'
  ]
} as const;
