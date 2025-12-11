/**
 * NTC 2184 Color Constants
 * Colombian waste classification color standard
 */

import type { Material, ContainerColor } from '@/types';

export interface ColorInfo {
  color: ContainerColor;
  hex: string;
  rgb: [number, number, number];
  pantone: string;
  textColor: string; // For contrast on colored backgrounds
  description: string;
}

export const MATERIAL_COLORS: Record<Material, ColorInfo> = {
  PLASTIC: {
    color: 'AZUL',
    hex: '#007BFF',
    rgb: [0, 123, 255],
    pantone: '2925 C',
    textColor: '#FFFFFF',
    description: 'Plástico y Vidrio'
  },
  GLASS: {
    color: 'AZUL',
    hex: '#007BFF',
    rgb: [0, 123, 255],
    pantone: '2925 C',
    textColor: '#FFFFFF',
    description: 'Vidrio y Plástico'
  },
  PAPER: {
    color: 'BLANCO',
    hex: '#F5F5F5',
    rgb: [245, 245, 245],
    pantone: 'Cool Gray 1 C',
    textColor: '#343A40',
    description: 'Papel y Cartón'
  },
  CARDBOARD: {
    color: 'BLANCO',
    hex: '#F5F5F5',
    rgb: [245, 245, 245],
    pantone: 'Cool Gray 1 C',
    textColor: '#343A40',
    description: 'Cartón y Papel'
  },
  ORGANIC: {
    color: 'VERDE',
    hex: '#28A745',
    rgb: [40, 167, 69],
    pantone: '354 C',
    textColor: '#FFFFFF',
    description: 'Residuos Orgánicos'
  },
  METAL: {
    color: 'GRIS',
    hex: '#6C757D',
    rgb: [108, 117, 125],
    pantone: 'Cool Gray 8 C',
    textColor: '#FFFFFF',
    description: 'Metales'
  },
  OTHER: {
    color: 'NEGRO',
    hex: '#343A40',
    rgb: [52, 58, 64],
    pantone: 'Black 6 C',
    textColor: '#FFFFFF',
    description: 'No Reciclable'
  }
};

export const CONTAINER_COLORS: Record<ContainerColor, ColorInfo> = {
  AZUL: {
    color: 'AZUL',
    hex: '#007BFF',
    rgb: [0, 123, 255],
    pantone: '2925 C',
    textColor: '#FFFFFF',
    description: 'Plástico y Vidrio'
  },
  BLANCO: {
    color: 'BLANCO',
    hex: '#F5F5F5',
    rgb: [245, 245, 245],
    pantone: 'Cool Gray 1 C',
    textColor: '#343A40',
    description: 'Papel y Cartón'
  },
  VERDE: {
    color: 'VERDE',
    hex: '#28A745',
    rgb: [40, 167, 69],
    pantone: '354 C',
    textColor: '#FFFFFF',
    description: 'Orgánico'
  },
  GRIS: {
    color: 'GRIS',
    hex: '#6C757D',
    rgb: [108, 117, 125],
    pantone: 'Cool Gray 8 C',
    textColor: '#FFFFFF',
    description: 'Metal'
  },
  NEGRO: {
    color: 'NEGRO',
    hex: '#343A40',
    rgb: [52, 58, 64],
    pantone: 'Black 6 C',
    textColor: '#FFFFFF',
    description: 'No Reciclable'
  }
};

// Semantic colors
export const SEMANTIC_COLORS = {
  success: '#28A745',
  error: '#DC3545',
  warning: '#FFC107',
  info: '#17A2B8',
  neutral: '#F5F5F5'
};
