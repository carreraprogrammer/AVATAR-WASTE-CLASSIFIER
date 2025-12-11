/**
 * ElevenLabs Voice Service
 * Text-to-Speech and Conversational AI integration
 */

import type { VoiceSettings } from '@/types';

class ElevenLabsService {
  private apiKey: string;
  private voiceId: string;
  private model: string;
  private audioQueue: HTMLAudioElement[] = [];
  private isPlaying = false;

  constructor() {
    this.apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY || '';
    this.voiceId = import.meta.env.VITE_ELEVENLABS_VOICE_ID || 'charlie-es';
    this.model = 'eleven_turbo_v2_5';
  }

  /**
   * Convert text to speech using ElevenLabs API
   * @param text Text to convert to speech
   * @param settings Optional voice settings
   * @returns Audio URL
   */
  async textToSpeech(
    text: string,
    settings?: Partial<VoiceSettings>
  ): Promise<string> {
    try {
      const voiceSettings = {
        stability: settings?.stability ?? 0.7,
        similarity_boost: settings?.similarityBoost ?? 0.8,
        style: settings?.style ?? 0.5,
        use_speaker_boost: settings?.useSpeakerBoost ?? true
      };

      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${this.voiceId}`,
        {
          method: 'POST',
          headers: {
            'Accept': 'audio/mpeg',
            'Content-Type': 'application/json',
            'xi-api-key': this.apiKey
          },
          body: JSON.stringify({
            text,
            model_id: this.model,
            voice_settings: voiceSettings
          })
        }
      );

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.statusText}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      return audioUrl;
    } catch (error) {
      console.error('[ElevenLabs] TTS failed:', error);
      throw error;
    }
  }

  /**
   * Speak text using TTS
   * @param text Text to speak
   * @param settings Optional voice settings
   * @returns Promise that resolves when speech completes
   */
  async speak(
    text: string,
    settings?: Partial<VoiceSettings>
  ): Promise<void> {
    try {
      const audioUrl = await this.textToSpeech(text, settings);
      const audio = new Audio(audioUrl);

      // Add to queue
      this.audioQueue.push(audio);

      // Start playback if not already playing
      if (!this.isPlaying) {
        await this.playQueue();
      }
    } catch (error) {
      console.error('[ElevenLabs] Speak failed:', error);
      throw error;
    }
  }

  /**
   * Play audio queue sequentially
   */
  private async playQueue(): Promise<void> {
    if (this.audioQueue.length === 0) {
      this.isPlaying = false;
      return;
    }

    this.isPlaying = true;
    const audio = this.audioQueue.shift()!;

    return new Promise((resolve) => {
      audio.onended = () => {
        URL.revokeObjectURL(audio.src);
        resolve();
        this.playQueue(); // Play next in queue
      };

      audio.onerror = (error) => {
        console.error('[ElevenLabs] Audio playback error:', error);
        URL.revokeObjectURL(audio.src);
        resolve();
        this.playQueue(); // Continue with next
      };

      audio.play().catch((error) => {
        console.error('[ElevenLabs] Audio play error:', error);
        resolve();
        this.playQueue();
      });
    });
  }

  /**
   * Stop all audio playback
   */
  stop(): void {
    this.audioQueue.forEach((audio) => {
      audio.pause();
      URL.revokeObjectURL(audio.src);
    });
    this.audioQueue = [];
    this.isPlaying = false;
  }

  /**
   * Get random message from array
   * @param messages Array of messages
   * @returns Random message
   */
  getRandomMessage(messages: readonly string[]): string {
    return messages[Math.floor(Math.random() * messages.length)];
  }
}

export const elevenLabsService = new ElevenLabsService();
export default elevenLabsService;
