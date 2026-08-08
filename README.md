# Pallet Calculator

[Українська версія (Ukrainian)](README.ua.md)

Web application for calculations in a bottling workshop. This application may not be suitable for everyone, as processes may differ across different enterprises.

## Features

- **Quantity Calculator**: Calculate full pallets, bottle remainder, and layer/row counts on the partial pallet.
- **Time Calculator**: Calculate required pallets until a target time or estimate stock duration.
- **Layer Stopwatch**: Calculate pallet processing time based on layer speeds with a built-in stopwatch.
- **Pallet Registry**: Save, edit, and search product pallet presets (bottle count, layers, time, zone, notes). One-tap preset loading into the calculator.
- **Analytics**: Statistics dashboard for total pallets, bottles, layers, and usage metrics.
- **Local Storage**: 100% offline-first local storage with JSON export and import capabilities.
- **PWA & Mobile UI**: Mobile-optimized bottom navigation bar, compact layout, and full offline support.

## Tech Stack

- React 19, TypeScript
- Vite 6
- Vanilla CSS

## Development

```bash
# Install dependencies
npm install

# Run local development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint
```
