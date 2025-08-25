# VitePress Configuration for ShipYo API Documentation

This directory contains the VitePress configuration and custom components for the ShipYo API documentation.

## Structure

```
.vitepress/
├── config.ts              # Main VitePress configuration
├── theme/
│   ├── index.ts           # Custom theme setup
│   └── custom.css         # Custom styles
├── components/
│   └── HeaderBadge.vue    # Header authentication badge component
└── README.md              # This file
```

## HeaderBadge Component

The `HeaderBadge` component displays authentication requirements for API endpoints with visual indicators.

### Usage

```vue
<HeaderBadge 
  type="jwt" 
  icon="🔒" 
  label="JWT Required"
  :headers="['x-api-key: <your-api-key>', 'Authorization: Bearer <token>', 'Content-Type: application/json']"
/>
```

### Props

- `type`: Authentication type (`'anonymous'`, `'apikey'`, `'jwt'`)
- `icon`: Display icon (`'🌐'`, `'🔑'`, `'🔒'`)
- `label`: Text label for the authentication type
- `headers`: Array of required headers

### Authentication Types

- 🌐 **Anonymous**: No authentication required (green)
- 🔑 **API Key Only**: Requires x-api-key header (orange)
- 🔒 **JWT Required**: Requires both x-api-key and Authorization headers (blue)

## Development

To add new components:

1. Create the component in `components/`
2. Register it in `theme/index.ts`
3. Use it in your markdown files

## Running VitePress

```bash
# Install dependencies
npm install

# Start dev server
npm run docs:dev

# Build for production
npm run docs:build
```
