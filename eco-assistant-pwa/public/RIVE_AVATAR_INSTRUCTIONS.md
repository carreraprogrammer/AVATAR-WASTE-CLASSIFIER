# Rive Avatar Setup Instructions

## Overview
The EcoAssistant avatar uses Rive for smooth, state-based animations. The avatar responds to classification states with emotional expressions.

## Required Rive File
Place your Rive animation file at: `/public/avatar.riv`

## State Machine Configuration

Your Rive file should include a **State Machine** named `"State Machine"` with the following inputs:

### Inputs

#### 1. eyeState (Number)
Controls eye expressions:
- `0` = Open eyes (idle, success, speaking)
- `1` = Squinted/focused eyes (analyzing)
- `2` = Confused/raised eyebrows (error)

#### 2. mouthState (Number)
Controls mouth expressions:
- `0` = Neutral mouth (idle, analyzing)
- `1` = Frown (error)
- `2` = Smile (welcome, success)
- `3` = Animated/talking mouth (speaking)

#### 3. backgroundColor (Number)
Background color as a number (hex converted to integer):
- Example: `#007BFF` → `32767` (0x007BFF)

## Avatar States

The component maps application states to Rive inputs:

| App State | Eye State | Mouth State | Description |
|-----------|-----------|-------------|-------------|
| `idle` | 0 | 0 | Waiting, subtle breathing |
| `welcome` | 0 | 2 | Greeting user with smile |
| `analyzing` | 1 | 0 | Concentrating on waste |
| `success` | 0 | 2 | Celebrating correct classification |
| `error` | 2 | 1 | Confused, needs help |
| `speaking` | 0 | 3 | Mouth animated with voice |

## Background Colors (NTC 2184)

The avatar background changes based on classified material:

- **AZUL** (`#007BFF`) - Plastic/Glass
- **BLANCO** (`#F5F5F5`) - Paper/Cardboard
- **VERDE** (`#28A745`) - Organic
- **GRIS** (`#6C757D`) - Metal
- **NEGRO** (`#343A40`) - Non-recyclable

## Creating Your Rive Animation

1. Design your avatar in Rive Editor (rive.app)
2. Create a State Machine named "State Machine"
3. Add Number inputs: `eyeState`, `mouthState`, `backgroundColor`
4. Create animations for each state combination
5. Export as `.riv` file
6. Place in `/public/avatar.riv`

## Fallback

If `/public/avatar.riv` is not found, the app falls back to a simple emoji-based avatar.

## Testing

Start the development server and navigate to the home page:

```bash
npm run dev
```

The avatar should:
- Load and display the Rive animation
- Change eye/mouth states when classification state changes
- Smoothly transition background colors (500ms fade)
- Respond to all 6 states (idle, welcome, analyzing, success, error, speaking)

## Resources

- [Rive Editor](https://rive.app)
- [Rive React Documentation](https://rive.app/community/doc/react-canvas/docAlG9SIrLs)
- [State Machines Guide](https://rive.app/community/doc/state-machine/docAcCCIFmb)
