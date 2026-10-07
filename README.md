# Aryan Mukund Singh — Portfolio

A premium, Awwwards-quality personal portfolio website featuring a talking-video hero, smooth animations, and a clean black/white/gray design system.

![Portfolio Preview](/og.jpg)

## ✨ Features

- **Talking Video Hero** — Looping intro video with smart sound controls and visibility-based pause/play
- **Pendulum ID Card** — Physics-based spring animation with 3D flip interaction
- **Periodic Table Skills** — Interactive skill grid with family filters and inspector panel
- **Expanding Accordion Gallery** — Smooth project showcase with illustrative UI mockups
- **Horizontal Pinned Achievements** — Scroll-driven horizontal gallery with count-up animations
- **Smooth Scrolling** — Lenis-powered buttery smooth scroll experience
- **Fully Responsive** — Works flawlessly from 360px to 1920px+
- **Accessible** — Semantic HTML, keyboard navigation, reduced motion support

## 🛠 Tech Stack

| Category | Technologies |
|----------|-------------|
| Framework | Next.js 15 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS 4, CSS Custom Properties |
| Animation | Lenis (smooth scroll), CSS animations, IntersectionObserver |
| Fonts | Inter Tight, Instrument Serif, JetBrains Mono (via next/font) |

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx      # Root layout with fonts and metadata
│   ├── page.tsx        # Main entry point
│   └── globals.css     # Design system and base styles
├── components/
│   ├── App.tsx         # Main app wrapper with Lenis provider
│   ├── Navigation.tsx  # Sticky nav with mobile menu
│   ├── hero/
│   │   └── Hero.tsx    # Video hero section
│   ├── sections/
│   │   ├── About.tsx   # ID card + intro
│   │   ├── Skills.tsx  # Periodic table grid
│   │   ├── Work.tsx    # Project accordion
│   │   ├── Certifications.tsx
│   │   ├── Experience.tsx  # Timeline
│   │   ├── Achievements.tsx # Horizontal gallery
│   │   └── Contact.tsx # Contact + footer
│   └── ui/
│       └── TechLogo.tsx # Brand/concept icons
├── lib/
│   ├── data.ts         # All portfolio content (single source of truth)
│   ├── hooks.ts        # Custom React hooks
│   └── scroll.tsx      # Lenis provider and scroll utilities
public/
├── hero/
│   ├── hero.mp4        # Main video (H.264)
│   ├── hero.webm       # Fallback (VP9)
│   └── poster.jpg      # Video poster
├── logos/              # Brand SVGs (with LICENSE files)
├── portrait-bust.webp  # ID card photo
├── og.jpg              # Open Graph image
└── Aryan_Singh_Resume.pdf
scripts/
└── build-hero-assets.py  # Video processing script
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
npm run build
npm start
```

## 🎬 Rebuilding Hero Video Assets

If you need to process a new intro video:

### Prerequisites
- Python 3.8+
- ffmpeg installed and in PATH

### Usage

```bash
python scripts/build-hero-assets.py path/to/your/intro-video.mp4
```

This will generate:
- `public/hero/hero.mp4` — H.264 video (CRF 24, AAC 96kbps)
- `public/hero/hero.webm` — VP9 video (CRF 36, Opus 80kbps)
- `public/hero/poster.jpg` — Video poster frame
- `public/portrait-bust.webp` — ID card portrait
- `public/og.jpg` — Open Graph image

### Video Requirements
- Landscape (16:9) recommended
- Person standing centered against white/light background
- Clear audio, 8-15 seconds duration
- Start and end with brief pauses for seamless looping

## 📐 Sections Overview

| # | Section | Description |
|---|---------|-------------|
| 00 | Hero | Talking video, role title, CTAs |
| 01 | About | 3-column layout, pendulum ID card, quick facts |
| 02 | Skills | Periodic table grid, family filters, inspector |
| 03 | Work | Expanding accordion, illustrative UI mockups |
| 04 | Certifications | Ink-flood hover list |
| 05 | Experience | Vertical timeline with scroll-driven spine |
| 06 | Achievements | Horizontal pinned gallery, count-up numbers |
| 07 | Contact | Letter-hop heading, spinning badge, footer |

## 🎨 Design System

### Colors (white, black, grays only)
```css
--paper: #f4f2ee;    /* Page background */
--card: #ffffff;     /* Card backgrounds */
--ink: #0d0d0d;      /* Primary text, buttons */
--ink-2: #3a3a3a;    /* Secondary text */
--mute: #77756f;     /* Muted text */
--faint: #a9a6a0;    /* Very light text */
--line: rgba(13,13,13,0.1);  /* Borders */
--soft: #e9e6e0;     /* Subtle backgrounds */
```

### Typography
- **Inter Tight** — Headings and body text
- **Instrument Serif** — Italic accent words in headings
- **JetBrains Mono** — Indices, labels, numbers

### Spacing
- Gutter: `clamp(18px, 4vw, 64px)`
- Section padding: `clamp(96px, 14vh, 160px)`
- Max content width: 1320px

## ♿ Accessibility

- Semantic HTML5 sections with correct heading hierarchy
- Keyboard focus styles on all interactive elements
- `prefers-reduced-motion` disables smooth scroll and decorative animations
- All images have alt text
- ARIA labels on icon-only buttons
- Color contrast meets WCAG AA standards

## 📄 Content Updates

All portfolio content lives in a single file: `src/lib/data.ts`

To update content:
1. Edit the relevant constant (PROFILE, PROJECTS, EXPERIENCE, etc.)
2. Changes appear immediately in development mode
3. Rebuild for production

## 📜 Credits & Licenses

### Brand Logos
Tech stack logos are sourced from:
- [Simple Icons](https://simpleicons.org/) — MIT License
- [Devicon](https://devicon.dev/) — MIT License

Logo files and their licenses are stored in `public/logos/`.

### Fonts
All fonts are self-hosted via `next/font`:
- [Inter Tight](https://fonts.google.com/specimen/Inter+Tight) — OFL
- [Instrument Serif](https://fonts.google.com/specimen/Instrument+Serif) — OFL
- [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) — OFL

### Animation Library
- [Lenis](https://github.com/darkroomengineering/lenis) — MIT License

## 📝 License

This portfolio template is MIT licensed. Feel free to use it as inspiration for your own portfolio, but please:
- Replace all personal content with your own
- Don't claim the design as entirely your own creation
- Credit is appreciated but not required

---

Built with ❤️ using Next.js, Tailwind CSS, and Lenis
