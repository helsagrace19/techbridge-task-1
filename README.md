# TechBridge — Website (Tasks 1 & 2)

A responsive website for **TechBridge by Baselink Services Limited**, a learning and career development initiative bridging learning to real-world experience.

Built with **HTML5 + CSS3** (no frameworks), plus a small vanilla JavaScript file for the mobile navigation.

## Pages

| Page | Purpose |
| --- | --- |
| `index.html` | Homepage: introduction, About, program preview, 30-Day Practical Internship, Why TechBridge, apply/community call to action, footer. |
| `programs.html` | Dedicated Programs experience: overview, Data Analytics and Web Development program cards, skills, differentiation guide, internship connection and application CTA. |

## What the site communicates

- Who TechBridge is (official tagline included)
- Current programs: **Data Analytics** and **Web Development**
- The skills associated with each program, using only the topics supplied in the brief:
  - **Data Analytics:** spreadsheet analysis, data cleaning, SQL, data visualization, business-focused analysis
  - **Web Development:** HTML, CSS, JavaScript, Git/GitHub, building web projects
- How the two programs differ: data and insights, versus websites and web applications
- The **30-Day Practical Internship**, its project-based nature and the possibility of a **recommendation letter based on successful participation/performance**
- How to apply (official application form) and join the community (official WhatsApp group)
- Official contact details: techbridgebaslink@gmail.com, LinkedIn and Facebook

## Project structure

```
techbridge-task-1/
├── index.html                     # Homepage (Task 1)
├── programs.html                  # Programs experience (Task 2)
├── style.css                      # Shared design tokens, components, both pages
├── script.js                      # Mobile off-canvas navigation only
├── images/
│   ├── techbridge-logo.png        # Official TechBridge logo
│   └── internship-illustration.png
├── homepage-screenshot.png        # Desktop screenshot of the homepage
├── programs-screenshot.png        # Desktop screenshot of the Programs experience
└── README.md
```

## Running locally

Open `index.html` in any modern browser. No build step or dependencies are required.

## Deployment

Deployed via Vercel: https://techbridge-task-1-plum.vercel.app

The Programs page is available at `/programs.html` on the same deployment.

## Responsive behaviour

- **Desktop (≥ 981px):** two-column hero and program cards; full horizontal navigation.
- **Tablet (641–980px):** stacked program cards and comparison panels; the mobile navigation is used.
- **Mobile (≤ 640px):** single-column content, full-width buttons, two-column "Why TechBridge" feature grid, and a full-height off-canvas menu that slides in from the right over a blurred backdrop.

## Accessibility

- Semantic landmarks and a single `h1` per page
- Visible keyboard focus states, including a focus outline on linked program cards
- "Skip to main content" link
- Mobile menu updates `aria-expanded`, closes with Escape and restores focus to the toggle
- The blurred menu backdrop is hidden from assistive technology; the menu can also be dismissed by tapping it
- Respect for `prefers-reduced-motion`
- Descriptive `aria-label`s on icon-only links

## Developer note, Task 2

> I approached the Programs experience as a continuation of the Task 1 site, keeping the same warm off-white ground, deep navy type and cobalt accent while giving each program its own visual treatment: a light, data-led card for Data Analytics and a deep navy, build-led card for Web Development. Each program card explains what the program covers, its focus, and the skills a learner will develop, and a short "Find your fit" section helps visitors tell the two paths apart before applying. I learned how to carry a design system across a second page and how to adapt a shared component, the navigation, into a full-height mobile sidebar with a blurred backdrop. The main challenge was keeping the two program cards visually distinct without breaking the shared brand system, which I solved with contrast, accent colour and content-led differentiation rather than new decorative styles.

## Developer note, Task 1

> I designed the TechBridge homepage around the idea of a bridge, connecting learners to real-world experience, using a calm off-white page, deep navy text and a strong cobalt accent so the calls to action stand out. I built the hero, About, Programs, Internship, Why TechBridge, Apply/Community and Footer sections with HTML5 and CSS3, and added a short vanilla JavaScript file purely for the mobile menu. During the project I learned how to manage responsive layouts with CSS grid, flexible units and media queries instead of fixed pixel sizes. One challenge I encountered was making the navigation usable on small screens without a framework, which I solved with an accessible toggle button that updates `aria-expanded` and closes on Escape, link clicks and outside clicks.
