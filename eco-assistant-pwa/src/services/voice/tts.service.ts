/**
 * Text-to-Speech Service
 * High-level wrapper for voice synthesis
 */

import { elevenLabsService } from './elevenlabs.service';
import { VOICE_MESSAGES, EDUCATIONAL_TIPS } from '@/constants';
import type { Material } from '@/types';

class TTSService {
  /**
   * Speak welcome message
   */
  async speakWelcome(): Promise<void> {
    const message = elevenLabsService.getRandomMessage(VOICE_MESSAGES.welcome);
    await elevenLabsService.speak(message);
  }

  /**
   * Speak analyzing message
   */
  async speakAnalyzing(): Promise<void> {
    const message = elevenLabsService.getRandomMessage(
      VOICE_MESSAGES.analyzing
    );
    await elevenLabsService.speak(message);
  }

  /**
   * Speak classification success
   * @param material Classified material
   */
  async speakSuccess(material: Material): Promise<void> {
    const messages = VOICE_MESSAGES.success[material];
    const message = elevenLabsService.getRandomMessage(messages);
    await elevenLabsService.speak(message);
  }

  /**
   * Speak educational tip
   * @param material Material type
   */
  async speakEducationalTip(material: Material): Promise<void> {
    const tips = EDUCATIONAL_TIPS[material];
    const tip = elevenLabsService.getRandomMessage(tips);

    // Add a brief pause before the tip
    setTimeout(async () => {
      await elevenLabsService.speak(tip);
    }, 1000);
  }

  /**
   * Speak error message
   * @param errorType Type of error
   */
  async speakError(
    errorType: 'noWaste' | 'lowConfidence' | 'apiError'
  ): Promise<void> {
    const messages = VOICE_MESSAGES.error[errorType];
    const message = elevenLabsService.getRandomMessage(messages);
    await elevenLabsService.speak(message);
  }

  /**
   * Speak custom text
   * @param text Text to speak
   */
  async speak(text: string): Promise<void> {
    await elevenLabsService.speak(text);
  }

  /**
   * Stop all speech
   */
  stop(): void {
    elevenLabsService.stop();
  }
}

export const ttsService = new TTSService();
export default ttsService;
