# TechBridge — Homepage (Task 1)

A responsive, single-page homepage for **TechBridge by Baselink Services Limited** — a learning and career development initiative bridging learning to real-world experience.

Built with **HTML5 + CSS3** (no frameworks), plus a small vanilla JavaScript file only for the mobile menu.

## What the page communicates

- Who TechBridge is (official tagline included)
- Current programs: **Data Analytics** and **Web Development**
- The **30-Day Practical Internship**, its project-based nature and the possibility of a **recommendation letter based on successful participation/performance**
- How to apply (official application form) and join the community (official WhatsApp group)
- Official contact details: techbridgebaslink@gmail.com, LinkedIn and Facebook

## Project structure

```
techbridge-task-1/
├── index.html          # Single-page homepage (semantic HTML5)
├── style.css           # All styling (design tokens, layout, responsive)
├── script.js           # Mobile navigation toggle only
├── images/
│   ├── techbridge-logo.png          # Official TechBridge logo
│   └── internship-illustration.png  # Internship section illustration
├── homepage-screenshot.png          # Screenshot of the completed homepage
└── README.md
```

## Running locally

Open `index.html` in any modern browser. No build step or dependencies are required.

## Deployment

Deployed via GitHub Pages: https://helsagrace19.github.io/techbridge-task-1/

## Responsive behaviour

- **Desktop (≥ 981px):** centered hero stage panel, side-by-side section layouts
- **Tablet (641–980px):** stacked sections, mobile-style navigation menu
- **Mobile (≤ 640px):** single-column layout, full-width buttons and cards

## Accessibility

- Semantic landmarks and heading order
- Visible keyboard focus states
- "Skip to main content" link
- Respect for `prefers-reduced-motion`
- Descriptive `aria-label`s on icon-only links

## Developer note

> I designed the TechBridge homepage around the idea of a bridge — connecting learners to real-world experience — using a calm off-white page, deep navy text and a strong cobalt accent so the calls to action stand out. I built the hero, About, Programs, Internship, Why TechBridge, Apply/Community and Footer sections with HTML5 and CSS3, and added a short vanilla JavaScript file purely for the mobile menu. During the project I learned how to manage responsive layouts with CSS grid, flexible units and media queries instead of fixed pixel sizes. One challenge I encountered was making the navigation usable on small screens without a framework, which I solved with an accessible toggle button that updates `aria-expanded` and closes on Escape, link clicks and outside clicks.
