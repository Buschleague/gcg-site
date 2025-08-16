# Gemini Capital Group

A minimal, austere landing site for Gemini Capital Group – a family-run investment partner focused on the Boston Mountain region of Arkansas.

## 🌲 Overview

Gemini Capital Group's website showcases their commitment to strategic investments that strengthen local heritage. Built with React, TypeScript, and Vite, the site features a full-bleed hero image with carefully calibrated scrims for optimal readability.

### Key Features
- **Responsive Design**: Optimized for all device sizes
- **Dark/Light Favicon Support**: Automatic favicon switching based on browser theme
- **Modular Architecture**: Component-based structure for easy maintenance
- **Performance Optimized**: Fast loading with Vite's build optimization
- **Accessibility**: Semantic HTML with ARIA labels where appropriate

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm 8+

### Development Setup

```bash
# Clone the repository
git clone https://github.com/[your-username]/gemini-capital-group.git
cd gemini-capital-group

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:5173`

### Building for Production

```bash
# Create optimized build
npm run build

# Preview production build locally
npm run preview
```

## 📁 Project Structure

```
gemini-capital-group/
├── public/
│   ├── favicon-light.ico    # Light theme favicon
│   └── favicon-dark.ico     # Dark theme favicon
├── src/
│   ├── assets/              # Images and brand assets
│   │   ├── GeminiCG.png     # Hero image (required)
│   │   ├── handcrafted.png  # Handcrafted by Ashley logo
│   │   ├── ozark.jpg        # Ozark Events Hub logo
│   │   └── sparkle-logo.jpg # Sparkle Squad logo
│   ├── components/
│   │   ├── ActionCard.tsx
│   │   ├── BrandCard.tsx
│   │   ├── Modal.tsx
│   │   ├── SectionHeader.tsx
│   │   └── forms/
│   │       ├── InvestorForm.tsx
│   │       └── SubmissionForm.tsx
│   ├── config/
│   │   └── assets.ts        # Asset path configuration
│   ├── types/
│   │   └── index.ts         # TypeScript type definitions
│   ├── utils/
│   │   └── mountainLayers.ts # Background generation utilities
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # Application entry point
│   └── styles.css           # Global styles and Tailwind directives
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Pages deployment workflow
└── [Config files...]
```

## 🎨 Asset Requirements

### Hero Image
- **File**: `GeminiCG.png`
- **Recommended**: 1920x1080 minimum
- **Format**: PNG with transparency support
- **Note**: This is the only required asset

### Brand Logos
All brand logos are optional. The site will display fallback initials if images are missing.

- **Dimensions**: Square format recommended (min 200x200px)
- **Formats**: PNG, JPG, JPEG
- **Files**:
  - `handcrafted.png` - Handcrafted by Ashley
  - `ozark.jpg` - Ozark Events Hub
  - `sparkle-logo.jpg` or `sparkle-logo.jpeg` - Sparkle Squad

### Favicons
- **Light Theme**: `favicon-light.ico`
- **Dark Theme**: `favicon-dark.ico`
- **Format**: ICO format, 32x32px minimum
- **Location**: `/public` directory

## 🚢 Deployment

### GitHub Pages (Automatic)

1. Push changes to the `main` branch
2. GitHub Actions workflow automatically builds and deploys
3. Ensure GitHub Pages is configured:
   - Go to Settings → Pages
   - Set Source to "GitHub Actions"

### Manual Deployment

```bash
# Build the project
npm run build

# The 'dist' folder contains all static files for deployment
# Upload contents to any static hosting service
```

### Environment Variables

The build process supports a base URL configuration for subdirectory deployments:

```env
# .env.local (create if needed)
VITE_BASE=/subdirectory/
```

## 🛠️ Customization

### Colors
Main color palette is defined using Tailwind classes:
- Primary Gold: `#c4a070`
- Dark Green: `#0f2a23`
- Border Green: `#24463d`

### Typography
- Serif: Georgia, ui-serif
- Sans: System UI stack

### Adding New Brands

1. Add logo to `/src/assets/`
2. Update `src/config/assets.ts`:
```typescript
export const assetPaths = {
  // ... existing assets
  newBrand: './assets/new-brand-logo.png'
}
```
3. Add BrandCard component in the brands section

## 📦 Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Deployment**: GitHub Actions + GitHub Pages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

Private repository - All rights reserved © Gemini Capital Group

## 📧 Contact

**Gemini Capital Group**  
Boston Mountains, Arkansas  
contact@geminicapitalgroup.com

---

Built with pride in the Boston Mountains 🏔️