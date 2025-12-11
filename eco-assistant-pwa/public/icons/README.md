# EcoAssistant PWA Icons

## Quick Start

The PWA requires PNG icons at the following sizes:
- `icon-192.png` (192x192px)
- `icon-512.png` (512x512px)

## Generating PNG Icons from SVG

We provide SVG source files (`icon-192.svg`, `icon-512.svg`) that should be converted to PNG.

### Option 1: Using ImageMagick (Recommended)

```bash
# Install ImageMagick if not already installed
# Ubuntu/Debian: sudo apt-get install imagemagick
# macOS: brew install imagemagick

# Convert SVG to PNG
convert -background none -density 300 icon-192.svg icon-192.png
convert -background none -density 300 icon-512.svg icon-512.png
```

### Option 2: Using Online Tools

1. Open [CloudConvert](https://cloudconvert.com/svg-to-png) or similar
2. Upload `icon-192.svg` and `icon-512.svg`
3. Convert to PNG with transparent background
4. Download and save as `icon-192.png` and `icon-512.png`

### Option 3: Using Inkscape

```bash
inkscape icon-192.svg --export-type=png --export-filename=icon-192.png
inkscape icon-512.svg --export-type=png --export-filename=icon-512.png
```

### Option 4: Using Node.js (sharp)

```bash
npm install -g sharp-cli
sharp -i icon-192.svg -o icon-192.png
sharp -i icon-512.svg -o icon-512.png
```

## Icon Design

The icons feature:
- **Green background** (#28A745) - represents eco-friendliness
- **White recycling symbol** - universal symbol for waste management
- **Clean, modern design** - professional appearance for kiosk deployment

## Customization

To customize the icons:

1. Edit the SVG files with any vector graphics editor (Figma, Inkscape, Adobe Illustrator)
2. Maintain the 1:1 aspect ratio
3. Export as PNG with transparent background if desired (though current design uses solid green)
4. Update `public/manifest.json` if you change the icon sizes

## Maskable Icons

The current icons are designed to work as maskable icons (safe area in center). If you modify them:
- Keep important content within the center 80% of the canvas
- Test with [Maskable.app](https://maskable.app) before deploying
