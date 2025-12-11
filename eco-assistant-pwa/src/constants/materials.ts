/**
 * Material Constants
 * Waste material types based on NTC 2184 Colombian standard
 */

import type { Material } from '@/types';

export const MATERIALS: Record<Material, string> = {
  PLASTIC: 'Plástico',
  GLASS: 'Vidrio',
  PAPER: 'Papel',
  CARDBOARD: 'Cartón',
  ORGANIC: 'Orgánico',
  METAL: 'Metal',
  OTHER: 'Otro'
};

export const MATERIAL_SUBTYPES: Record<Material, string[]> = {
  PLASTIC: [
    'PET #1',
    'HDPE #2',
    'PVC #3',
    'LDPE #4',
    'PP #5',
    'PS #6',
    'Other #7',
    'Tetra Pak'
  ],
  GLASS: [
    'Transparente',
    'Verde',
    'Ámbar',
    'Azul'
  ],
  PAPER: [
    'Blanco',
    'Periódico',
    'Revista',
    'Archivo'
  ],
  CARDBOARD: [
    'Corrugado',
    'Cartulina',
    'Kraft'
  ],
  ORGANIC: [
    'Frutas',
    'Verduras',
    'Restos de comida',
    'Café',
    'Té'
  ],
  METAL: [
    'Aluminio',
    'Acero',
    'Hojalata',
    'Lata'
  ],
  OTHER: [
    'No reciclable',
    'Mixto',
    'Contaminado'
  ]
};

export const WASTE_DETECTION_CATEGORIES = [
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
  'spoon',
  'sandwich',
  'broccoli',
  'wine glass',
  'cake'
];
