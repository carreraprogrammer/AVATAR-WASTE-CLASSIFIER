/**
 * Image Processing Utilities
 * Helper functions for image manipulation
 */

/**
 * Compress and resize base64 image
 * @param base64 Base64 encoded image
 * @param maxWidth Maximum width (default 1024px)
 * @param quality JPEG quality 0-1 (default 0.8)
 * @returns Compressed base64 image
 */
export async function compressImage(
  base64: string,
  maxWidth = 1024,
  quality = 0.8
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }

      // Calculate new dimensions
      let { width, height } = img;
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }

      // Set canvas size
      canvas.width = width;
      canvas.height = height;

      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height);
      const compressed = canvas.toDataURL('image/jpeg', quality);

      resolve(compressed);
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    img.src = base64;
  });
}

/**
 * Convert canvas to base64
 * @param canvas HTMLCanvasElement
 * @param format Image format (default 'image/jpeg')
 * @param quality JPEG quality 0-1 (default 0.9)
 * @returns Base64 encoded image
 */
export function canvasToBase64(
  canvas: HTMLCanvasElement,
  format: 'image/jpeg' | 'image/png' = 'image/jpeg',
  quality = 0.9
): string {
  return canvas.toDataURL(format, quality);
}

/**
 * Convert base64 to Blob
 * @param base64 Base64 encoded image
 * @returns Blob
 */
export function base64ToBlob(base64: string): Blob {
  const parts = base64.split(';base64,');
  const contentType = parts[0].split(':')[1];
  const raw = window.atob(parts[1]);
  const rawLength = raw.length;
  const uInt8Array = new Uint8Array(rawLength);

  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: contentType });
}

/**
 * Convert Blob to base64
 * @param blob Blob
 * @returns Base64 encoded string
 */
export async function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert blob to base64'));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Get image dimensions
 * @param base64 Base64 encoded image
 * @returns Width and height
 */
export async function getImageDimensions(
  base64: string
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    img.src = base64;
  });
}

/**
 * Crop image to square
 * @param base64 Base64 encoded image
 * @returns Cropped square base64 image
 */
export async function cropToSquare(base64: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }

      // Determine square size (smaller dimension)
      const size = Math.min(img.width, img.height);
      canvas.width = size;
      canvas.height = size;

      // Calculate crop position (center)
      const x = (img.width - size) / 2;
      const y = (img.height - size) / 2;

      // Draw cropped square
      ctx.drawImage(img, x, y, size, size, 0, 0, size, size);

      const cropped = canvas.toDataURL('image/jpeg', 0.9);
      resolve(cropped);
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    img.src = base64;
  });
}
