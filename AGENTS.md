# AGENTS.md - Project Guidelines for Jasper Gao's Personal Blog

## 1. Project Overview
- **Owner**: Jasper Gao (NYU Tandon Math Major, Class of 2027 / Incoming Sophomore)
- **Project Type**: Personal Website & Mathematics/Tech Blog
- **Core Concept**: A minimal, elegant static website with high readability, showcasing mathematical articles, personal thoughts, and academic projects.

## 2. Design Philosophy (Japanese Minimalist)
- **Theme**: Light Mode Priority (Warm, serene, clean, paper-like aesthetic).
- **Color Palette**:
  - Background: Off-white / Muted paper tone (`#FAF9F6` or `#F7F7F7`).
  - Text: Charcoal / Warm dark gray (`#2D2D2D` or `#1A1A1A`) for softer contrast than pure black.
  - Accent: Muted indigo (`#2B4C7E`), subtle sage green, or traditional Japanese vermilion (`#C84B31`).
- **Typography**:
  - Sans-serif (Main Body): Modern, clean sans-serif (e.g., `-apple-system`, `Inter`).
  - Serif (Headings/Math): Elegant serif font for section titles and math contexts where appropriate.
  - Generous whitespace, high line-height (`1.6` - `1.8`), and minimal border decorations.

## 3. Tech Stack & Architecture (Static Web)
- **Core Standard**: HTML5, CSS3, Vanilla JavaScript (ES6+).
- **Styling Utility**: Tailwind CSS (via CDN or Vite build) is preferred for rapid layout tweaks, configured with custom colors matching the design philosophy.
- **Math Rendering**: MathJax or KaTeX integration for rendering LaTeX math formulas cleanly.
- **No Heavy Frameworks**: Keep the client bundle minimal, fast-loading, and zero-dependency where possible.

## 4. Coding Conventions & Best Practices
- **HTML**:
  - Use semantic HTML tags (`<header>`, `<main>`, `<article>`, `<section>`, `<footer>`).
  - Mobile-first responsive layout (optimized for reading on mobile and desktop).
- **CSS / Tailwind**:
  - Keep styling modular and reusable.
  - Avoid inline CSS (`style="..."`). Use Tailwind classes or dedicated `.css` files.
- **JavaScript**:
  - Use clean, modern ES6+ syntax (`const`/`let`, arrow functions, modules).
  - Minimal DOM manipulation, prioritize performance and smooth micro-interactions.

## 5. Agent Instructions for AI Assistant (Aider / DeepSeek)
- **Iterative Development**: Build component by component (e.g., Header/Nav -> Hero -> Article List -> Footer).
- **Code Clarity**: Write clean, self-documenting code with concise comments explaining non-obvious logic.
- **Math-Friendly**: Ensure HTML structure natively accommodates LaTeX blocks without breaking layouts.
- **Do Not Bloat**: Avoid adding unnecessary npm packages or extra JS dependencies unless explicitly requested.