# SOUND OF FRACTURES

A multidisciplinary electronic music and art project website built with Next.js, TypeScript, and Tailwind CSS.

## Overview

SOUND OF FRACTURES is an artist website showcasing electronic music, digital art, audio-visual installations, and interactive experiences. The site features a modern, terminal-inspired aesthetic with smooth animations and immersive project galleries.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Smooth Scrolling**: Lenis
- **UI Components**: Radix UI (via shadcn/ui)
- **Package Manager**: pnpm
- **Deployment**: Vercel

## Features

- Interactive 3D project sphere navigation
- Smooth scroll animations
- Press/media gallery with parallax effects
- Responsive design for all devices
- Dark mode terminal aesthetic
- Video backgrounds and media integration
- Cloudinary integration for optimized media delivery

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (or npm/yarn)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sofractures/sofwebsite.git
cd sofwebsite
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
/
├── app/              # Next.js app directory
│   ├── layout.tsx   # Root layout
│   ├── page.tsx     # Home page
│   └── globals.css  # Global styles
├── components/       # React components
│   ├── ui/          # shadcn/ui components
│   ├── press-gallery.tsx
│   ├── smooth-scroll.tsx
│   └── theme-provider.tsx
├── public/          # Static assets
└── styles/          # Additional stylesheets
```

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Deployment

The project is deployed on Vercel and automatically deploys on push to the main branch.

## License

© 2025 SOUND OF FRACTURES // ALL RIGHTS RESERVED

