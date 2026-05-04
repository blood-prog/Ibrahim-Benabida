<p align="center">
  <img src="public/favicon.svg" width="60" alt="Ibrahim Benabida Logo" />
</p>

<h1 align="center">Ibrahim Benabida — Portfolio</h1>

<p align="center">
  <strong>A high-performance, dark-themed creative portfolio built with React, Three.js, and GSAP.</strong>
</p>

<p align="center">
  <a href="https://ibrahimbenabida.me">Live Site</a> ·
  <a href="#getting-started">Getting Started</a> ·
  <a href="#project-structure">Structure</a> ·
  <a href="#tech-stack">Tech Stack</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white" alt="Vite 8" />
  <img src="https://img.shields.io/badge/GSAP-3.14-88CE02?logo=greensock&logoColor=white" alt="GSAP" />
  <img src="https://img.shields.io/badge/Three.js-0.183-000000?logo=threedotjs&logoColor=white" alt="Three.js" />
</p>

---

## About

A premium personal portfolio for **Ibrahim Benabida** — front-end developer and creative designer based in Algiers, Algeria. The site showcases selected works through an immersive, scroll-driven experience featuring:

- **Horizontal showcase gallery** with a pinned scroll effect, dot-grid canvas background, and floating 3D-projected text
- **Interactive 3D wireframe hero** using `@react-three/fiber` and `@react-three/drei`
- **GSAP-powered scroll animations** throughout every section — scrub-linked reveals, staggered entrances, and parallax effects
- **Lenis smooth scrolling** integrated with GSAP's `ScrollTrigger` for buttery-smooth navigation
- **Accordion-style specialties section** with hover-triggered line expansion and rotating iconography
- **Interactive globe** in the footer via `react-globe.gl`
- **Custom cursor** that responds to interactive elements
- **Full SEO optimization** with JSON-LD structured data, Open Graph meta, and semantic HTML

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | [React 19](https://react.dev) + [TypeScript 5.9](https://www.typescriptlang.org) |
| **Build Tool** | [Vite 8](https://vite.dev) |
| **Animation** | [GSAP 3.14](https://gsap.com) + [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger) |
| **3D Graphics** | [Three.js](https://threejs.org) via [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) + [@react-three/drei](https://github.com/pmndrs/drei) |
| **Smooth Scroll** | [Lenis](https://lenis.darkroom.engineering) |
| **Motion** | [Framer Motion](https://www.framer.com/motion) |
| **Globe** | [react-globe.gl](https://github.com/vasturiano/react-globe.gl) |
| **Icons** | [Lucide React](https://lucide.dev) |
| **Fonts** | [Syne](https://fonts.google.com/specimen/Syne), [Inter](https://fonts.google.com/specimen/Inter), [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) (via Google Fonts) |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) **v18+**
- [npm](https://www.npmjs.com) **v9+** (or pnpm / yarn)

### Installation

```bash
# Clone the repository
git clone https://github.com/blood-prog/Ibrahim-Benabida.git
cd Ibrahim-Benabida

# Install dependencies
npm install

# Start the development server
npm run dev
```

The dev server will start at `http://localhost:5173/` (or the next available port).

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Vite development server with HMR |
| `npm run build` | Type-check with `tsc` and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |

---

## Project Structure

```
├── public/
│   └── images/              # Project screenshots & assets
├── src/
│   ├── components/
│   │   ├── Hero.tsx          # Full-viewport hero with 3D floating shapes
│   │   ├── Header.tsx        # Fixed dark-mode navigation bar
│   │   ├── Intro.tsx         # About section with bold typography
│   │   ├── WorkGallery.tsx   # Horizontal-scroll showcase effect
│   │   ├── Services.tsx      # GSAP accordion specialties section
│   │   ├── Manifesto.tsx     # Scroll-reveal design philosophy
│   │   ├── Footer.tsx        # Contact CTA with magnetic button + globe
│   │   ├── ProjectPage.tsx   # Full-screen case study overlay
│   │   ├── CustomCursor.tsx  # Custom cursor with hover states
│   │   ├── FloatingShapes.tsx    # Three.js wireframe geometry
│   │   └── InteractiveGlobe.tsx  # react-globe.gl world visualization
│   ├── data/
│   │   └── projects.ts      # Project data (titles, images, tech stacks)
│   ├── App.tsx               # Root component with Lenis + ScrollTrigger
│   ├── index.css             # Design tokens, CSS variables, responsive rules
│   └── main.tsx              # React entry point
├── index.html                # SEO-optimized HTML with JSON-LD schemas
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript configuration
└── package.json
```

### Key Components

| Component | What It Does |
|-----------|-------------|
| **WorkGallery** | Pins the viewport and scrolls project cards horizontally (700% scroll distance). Renders a dot-grid canvas background and floating "WORK" letters on 3D sine-wave paths with lerp interpolation. |
| **Services** | Interactive accordion where hovering a specialty expands a description panel with tag pills and a rotating icon. Uses GSAP `ScrollTrigger` for staggered entrance. |
| **Manifesto** | Three-block scroll-reveal section. Each block's heading and body animate independently with blur and vertical offset, scrubbed to scroll position. |
| **Hero** | Displays the name with a mouse-tracking parallax orb and lazy-loaded `FloatingShapes` (Three.js wireframe icosahedron). |
| **Footer** | Magnetic "Email Me" button with GSAP physics, interactive globe background, and structured contact information. |

---

## Design System

The site uses CSS custom properties defined in `src/index.css`:

```css
:root {
  --bg-primary:      #0A0A0A;     /* Deep black background */
  --bg-secondary:    #141414;     /* Slightly lifted dark surface */
  --accent-electric: #E0E0E0;     /* Silver accent */
  --text-neutral:    #FAFAFA;     /* Primary white text */
  --text-muted:      #888888;     /* Subdued gray text */

  --font-headings:   'Syne';      /* Bold, uppercase headings */
  --font-body:       'Inter';     /* Clean body text */
  --font-vibe:       'Playfair Display'; /* Italic editorial accent */
}
```

---

## Featured Projects

| # | Project | Category | Stack |
|---|---------|----------|-------|
| 01 | **Smart Residency** | Mobile Application | React Native · Supabase · TypeScript |
| 02 | **Tarek Graphics** | Design Portfolio | React · Framer Motion · Three.js |
| 03 | **USTHB TIC Projects** | Educational Platform | Next.js · Tailwind · PostgreSQL |
| 04 | **Ibrahim Benabida Portfolio** | Personal Portfolio | React · Three.js · GSAP |
| 05 | **Oussama Benabida Academic** | Academic Portfolio | React · Vite · Neo-Brutalist CSS |

---

## Performance Notes

- **Code splitting**: `FloatingShapes` and `InteractiveGlobe` are lazy-loaded via `React.lazy()` to keep the initial bundle lean
- **Font optimization**: Fallback font-face declarations with `size-adjust` and `ascent-override` minimize CLS during font loading
- **Animation performance**: All scroll-driven animations use GSAP's optimized `ScrollTrigger` with `scrub` mode and `requestAnimationFrame`-synced updates
- **Canvas rendering**: The dot-grid background in `WorkGallery` uses native `<canvas>` API for GPU-accelerated rendering

---

## Deployment

Build the production bundle:

```bash
npm run build
```

The optimized output is in the `dist/` directory, ready for deployment to any static hosting provider (Vercel, Netlify, Cloudflare Pages, etc.).

---

## License

This project is the personal portfolio of **Ibrahim Benabida**. All rights reserved.

---

<p align="center">
  <sub>Crafted with precision in Algiers, Algeria 🇩🇿</sub>
</p>
