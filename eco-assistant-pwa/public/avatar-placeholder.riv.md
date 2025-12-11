# Placeholder for Rive Avatar

## Required File: `avatar.riv`

This is a placeholder document. You need to create and place your Rive animation file here:

**Location**: `/public/avatar.riv`

## Why This File Is Missing

The Rive avatar file is not included in the repository because:
1. It's a binary asset that should be created specifically for your project
2. The file size can be large (1-10 MB depending on complexity)
3. You may want to customize the avatar design for your brand

## How to Create Your Avatar

Please see the detailed instructions in:
**`/public/RIVE_AVATAR_INSTRUCTIONS.md`**

This document contains:
- Complete State Machine configuration
- Required input definitions (eyeState, mouthState, backgroundColor)
- Avatar state mappings
- NTC 2184 color specifications
- Step-by-step creation guide

## Fallback Behavior

If `avatar.riv` is not present, the application will:
- Fall back to a simple emoji-based avatar
- Still function normally with all features
- Display a console warning about missing Rive file

## Quick Start

1. Visit [rive.app](https://rive.app) and create a free account
2. Design your avatar character
3. Follow the State Machine setup in `RIVE_AVATAR_INSTRUCTIONS.md`
4. Export as `.riv` file
5. Place the file at `/public/avatar.riv`
6. Restart the development server

## Testing Your Avatar

After placing `avatar.riv`:

```bash
npm run dev
```

The avatar should:
- Load and animate smoothly
- Respond to classification states (idle, welcome, analyzing, success, error, speaking)
- Change background colors based on waste material (NTC 2184 colors)
- Display appropriate facial expressions (eyes and mouth states)

## Need Help?

- [Rive Documentation](https://rive.app/community/doc/)
- [State Machines Tutorial](https://rive.app/community/doc/state-machine/docAcCCIFmb)
- [Rive React Integration](https://rive.app/community/doc/react-canvas/docAlG9SIrLs)
