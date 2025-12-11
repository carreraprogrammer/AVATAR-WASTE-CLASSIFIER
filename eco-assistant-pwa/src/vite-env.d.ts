/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_N8N_WEBHOOK_URL: string;
  readonly VITE_BACKEND_API_URL: string;
  readonly VITE_ELEVENLABS_AGENT_ID: string;
  readonly VITE_ELEVENLABS_API_KEY: string;
  readonly VITE_ELEVENLABS_VOICE_ID: string;
  readonly VITE_TENANT_ID: string;
  readonly VITE_STATION_ID: string;
  readonly VITE_ORGANIZATION_ID: string;
  readonly VITE_ENABLE_OBJECT_DETECTION: string;
  readonly VITE_ENABLE_VOICE_FEEDBACK: string;
  readonly VITE_ENABLE_CONVERSATION: string;
  readonly VITE_ENABLE_ANALYTICS: string;
  readonly VITE_ENABLE_OFFLINE_MODE: string;
  readonly VITE_LOG_LEVEL: string;
  readonly VITE_ENABLE_DEVTOOLS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
