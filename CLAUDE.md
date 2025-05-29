# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **8sh.ru landing page** - a high-conversion landing page for an international payments platform. The project is built as a modern Next.js application with a focus on personalization, smart recommendations, and conversion optimization.

**Key Business Context:**
- International money transfer platform targeting Russian businesses and freelancers
- Competes with RealPay.tech and traditional banks
- Focus on transparency, smart routing, and education-first approach
- Target conversion rate: 15-25% visitor-to-lead

## Commands

### Development Commands
```bash
# Main development (run from /landing directory)
cd landing && npm run dev          # Start development server on localhost:3000
cd landing && npm run build        # Build for production
cd landing && npm run start        # Start production server
cd landing && npm run lint         # Run ESLint

# Installation
cd landing && npm install          # Install dependencies
```

### Project Structure Commands
```bash
# Navigate to main application
cd landing/

# Key directories
cd landing/app/          # Next.js 14 app directory (pages and layouts)
cd landing/components/   # Reusable React components
cd landing/styles/       # Global styles
```

## Architecture & Technology Stack

### Core Technologies
- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Database:** Supabase (integrated)

### Project Structure
```
8sh_landing/
├── landing/                 # Main Next.js application
│   ├── app/                # Next.js 14 app directory
│   │   ├── layout.tsx      # Root layout with SEO meta tags
│   │   ├── page.tsx        # Home page (main landing)
│   │   ├── globals.css     # Global styles
│   │   └── [pages]/        # Additional pages (about, contact, etc.)
│   ├── components/         # Reusable components
│   │   ├── Header.tsx      # Navigation header
│   │   ├── HeroSection.tsx # Main hero with value proposition
│   │   ├── FeaturesSection.tsx # Features showcase
│   │   └── Footer.tsx      # Footer component
│   └── package.json        # Dependencies and scripts
├── docs/                   # Project documentation
│   ├── prd_landing.md      # Detailed product requirements
│   └── competitors/        # Competitive analysis
└── package.json           # Root dependencies (Supabase client)
```

### Key Components Architecture

**Landing Page Components:**
- `HeroSection`: Main value proposition with smart calculator
- `FeaturesSection`: Platform capabilities showcase  
- `HowItWorksSection`: Step-by-step process explanation
- `CountriesSection`: Supported countries grid
- `CTASection`: Call-to-action with animated elements
- `Footer`: Links and contact information

**Layout Components:**
- `Header`: Responsive navigation with mobile menu
- `ClientHeader`: Client-side header component
- `Footer`: Site footer with links and information

## Development Guidelines

### Styling Conventions
- Use **Tailwind CSS** for all styling
- Custom color palette defined in `tailwind.config.js`:
  - Primary: `#3B82F6` (blue)
  - Secondary: `#06B6D4` (cyan)  
  - Success: `#10B981` (green)
  - Dark: `#0F172A`
- Custom animations for scroll effects and interactions
- Responsive-first approach (mobile-first design)

### SEO Requirements
- **Critical:** All pages must have proper meta tags for SEO
- Russian language keywords focused on international payments
- Yandex.Metrika integration for analytics
- Schema.org markup for FAQ sections
- Performance targets: LCP < 2.5s, CLS < 0.1

### Component Patterns
- Use TypeScript interfaces for all props
- Implement responsive design with Tailwind breakpoints
- Follow Next.js 14 app directory conventions
- Use Framer Motion for animations and transitions

### Key Features to Implement
1. **Smart Calculator**: Interactive payment calculator with personalized recommendations
2. **Personalization**: Content adaptation based on user persona (freelancer/business/crypto)
3. **A/B Testing**: Infrastructure for testing different variants
4. **Lead Generation**: Forms and CTAs for converting visitors to leads

### Performance Requirements
- Page Speed Score > 90
- Mobile-first responsive design
- Image optimization using Next.js Image component
- Critical CSS inlining for above-the-fold content

### API Integration Points
- Currency exchange rates (CoinGecko, Alpha Vantage, CB RF)
- CRM integration for lead management
- Supabase for database operations
- Analytics tracking (Google Analytics, Mixpanel)

## Important Context

### Target Personas
1. **Freelancers (35%)**: IT professionals needing fast, cheap international payments
2. **Business Owners (45%)**: Trading companies seeking reliable payment routes
3. **Crypto Investors (20%)**: Users interested in stablecoin programs

### Competitive Positioning
- **vs Banks**: 3-5x cheaper (0.5% vs 2-5%), 10x faster
- **vs RealPay**: Better UX, smart recommendations, B2C support
- **vs Payment Agents**: Transparent pricing, verified providers

### Conversion Strategy
- Education-first approach with comprehensive explanations
- Smart system providing personalized recommendations
- Social proof through verified testimonials and case studies
- Transparent pricing without hidden fees

When working on this project, always consider the conversion optimization goals and ensure any changes support the primary objective of converting visitors into qualified leads.