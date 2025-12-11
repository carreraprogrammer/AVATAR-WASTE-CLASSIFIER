/**
 * Color Utilities
 * Helper functions for color manipulation and NTC 2184 mapping
 */

import type { Material, ContainerColor } from '@/types';
import { MATERIAL_COLORS } from '@/constants';

/**
 * Get NTC 2184 color for material
 * @param material Material type
 * @returns Hex color code
 */
export function getMaterialColor(material: Material): string {
  return MATERIAL_COLORS[material].hex;
}

/**
 * Get container color name for material
 * @param material Material type
 * @returns Container color (AZUL, BLANCO, VERDE, etc.)
 */
export function getContainerColor(material: Material): ContainerColor {
  return MATERIAL_COLORS[material].color;
}

/**
 * Get text color for background (ensures contrast)
 * @param backgroundColor Hex color code
 * @returns Text color (black or white)
 */
export function getTextColor(backgroundColor: string): string {
  const colorInfo = Object.values(MATERIAL_COLORS).find(
    (info) => info.hex === backgroundColor
  );
  return colorInfo?.textColor || '#000000';
}

/**
 * Convert hex to RGB
 * @param hex Hex color code
 * @returns RGB array [r, g, b]
 */
export function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    return [0, 0, 0];
  }
  return [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ];
}

/**
 * Convert RGB to hex
 * @param r Red (0-255)
 * @param g Green (0-255)
 * @param b Blue (0-255)
 * @returns Hex color code
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return (
    '#' +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('')
  );
}

/**
 * Lighten color by percentage
 * @param color Hex color code
 * @param percent Percentage to lighten (0-100)
 * @returns Lightened hex color
 */
export function lightenColor(color: string, percent: number): string {
  const [r, g, b] = hexToRgb(color);
  const amount = Math.round(2.55 * percent);

  return rgbToHex(
    Math.min(255, r + amount),
    Math.min(255, g + amount),
    Math.min(255, b + amount)
  );
}

/**
 * Darken color by percentage
 * @param color Hex color code
 * @param percent Percentage to darken (0-100)
 * @returns Darkened hex color
 */
export function darkenColor(color: string, percent: number): string {
  const [r, g, b] = hexToRgb(color);
  const amount = Math.round(2.55 * percent);

  return rgbToHex(
    Math.max(0, r - amount),
    Math.max(0, g - amount),
    Math.max(0, b - amount)
  );
}

/**
 * Get color with opacity
 * @param color Hex color code
 * @param opacity Opacity (0-1)
 * @returns RGBA color string
 */
export function getColorWithOpacity(color: string, opacity: number): string {
  const [r, g, b] = hexToRgb(color);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
