# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**IberApp** is a cultural translation app for the NEA (Northeast Argentina) region, built as a hackathon project. It helps tourists understand local slang/expressions and creates personalized cultural experiences by connecting their background with NEA culture.

## Commands

### Development
- `npm run dev` - Start development server (runs on port 8080)
- `npm run build` - Production build
- `npm run build:dev` - Development build
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Installation
```sh
npm i
```

## Architecture

### Tech Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Supabase (PostgreSQL database + Auth)
- **Styling**: Tailwind CSS + shadcn/ui components
- **Routing**: React Router DOM
- **State**: React Query (TanStack) for server state
- **Forms**: React Hook Form + Zod validation
- **Animations**: Custom CSS animations with Intersection Observer
- **AI**: Gemini API for enhanced translations

### Project Structure
```
src/
├── components/ui/          # shadcn/ui components + custom UI components
│   ├── animated-section.tsx    # Scroll-triggered animations
│   ├── floating-particles.tsx  # Hero section particles
│   ├── animated-counter.tsx    # Number counting animations
│   └── [shadcn components]     # Button, Card, Input, etc.
├── hooks/                  # Custom React hooks
│   ├── use-scroll-animation.tsx  # Intersection Observer hook
│   └── use-mobile.tsx           # Mobile detection
├── pages/                  # Page components
│   ├── Index.tsx          # Main landing page
│   └── NotFound.tsx       # 404 page
├── lib/
│   ├── utils.ts           # Utility functions (cn, clsx)
│   └── supabase.ts        # Supabase client and database services
└── assets/                # Static assets
```

### Key Components

**Main Application** (src/App.tsx):
- Single-page app with React Router
- Global providers: QueryClient, Tooltip, Toast notifications

**Index Page** (src/pages/Index.tsx):
- Hero section with background image and floating particles
- Tourism form for cultural experience configuration
- Cultural translator with mock translation system
- Extensive use of scroll animations

**Animation System**:
- `AnimatedSection` component wraps content for scroll-triggered animations
- `useScrollAnimation` hook uses Intersection Observer for performance
- CSS animations defined in index.css: fade-up, fade-in, scale-in, bounce-in
- `FloatingParticles` component creates floating background effects

### Styling Architecture
- Tailwind CSS with custom configuration (tailwind.config.ts)
- CSS custom properties for theming
- Custom animation classes defined in index.css
- Gradient utilities and shadow effects

### Mock Data Structure
The cultural translator uses predefined translations with cultural bridge comparisons:
```typescript
{
  word: string;
  translation: string;
  explanation: string;
  example: string;
  culturalBridge: string;
  comparison: string;
}
```

## Development Notes

### Animation System
The app features extensive scroll-triggered animations using:
- Custom `useScrollAnimation` hook with Intersection Observer
- `AnimatedSection` wrapper component
- CSS keyframe animations with GPU-accelerated transforms
- Staggered animations for child elements

### Component Patterns
- Heavy use of shadcn/ui components for consistent design
- Form state managed with React useState hooks
- Mock API responses for translator functionality
- Responsive design with Tailwind breakpoint system

### Cultural Translation Feature
Currently uses mock data for translations of NEA slang terms like "che", "mate", "mitaí", "sapucai" with cultural context and comparisons to other world cultures.

### Theming
Uses CSS custom properties with Tailwind for theme customization. Color scheme includes warm gradients and accent colors suitable for a cultural app.

### Database & Backend Services

**Supabase Integration** (src/lib/supabase.ts):
- PostgreSQL database with real-time subscriptions
- Built-in authentication and authorization
- Three main services: `translationService`, `userService`, `tourService`

**Database Tables**:
- `translations` - NEA slang/expressions with cultural context
- `user_profiles` - User information and preferences
- `tour_experiences` - Generated cultural tours and history

**Environment Variables**:
```
VITE_GEMINI_API_KEY - Gemini AI API key
VITE_SUPABASE_URL - Supabase project URL
VITE_SUPABASE_ANON_KEY - Supabase anonymous key
DATABASE_URL - PostgreSQL connection string
```

### AI Integration
- Gemini API for enhanced cultural translations
- Real-time cultural context and comparisons
- Future: Tour generation based on user preferences