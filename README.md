# TechBridge Website (Tasks 1, 2, 3 & 4)

A responsive website for **TechBridge by Baselink Services Limited**, a learning and career development initiative bridging learning to real-world experience.

Built with **HTML5 + CSS3** (no frameworks), plus vanilla JavaScript for the mobile navigation and the interactive two-track internship roadmap.

## Pages

| Page | Purpose |
| --- | --- |
| `index.html` | Homepage: introduction, About, program preview, 30-Day Practical Internship, Why TechBridge, apply/community call to action, footer. |
| `programs.html` | Dedicated Programs experience: overview, Data Analytics and Web Development program cards, skills, differentiation guide, internship connection and application CTA. |
| `tasks.html` | Internship Tasks experience: an introduction to the 30-day internship, an at-a-glance Day 1 to Day 26 route card, and a difficulty-graded timeline of all eight practical tasks. |
| `roadmap.html` | Interactive Internship Roadmap: a 30-day structure card and a two-track switcher showing all eight Data Analytics and Web Development tasks, difficulty progression and optional saved progress. |

## What the site communicates

- Who TechBridge is (official tagline included)
- Current programs: **Data Analytics** and **Web Development**
- The skills associated with each program, using only the topics supplied in the brief:
  - **Data Analytics:** spreadsheet analysis, data cleaning, SQL, data visualization, business-focused analysis
  - **Web Development:** HTML, CSS, JavaScript, Git/GitHub, building web projects
- How the two programs differ: data and insights, versus websites and web applications
- The **30-Day Practical Internship**, its project-based nature and the possibility of a **recommendation letter based on successful participation/performance**
- The **eight internship tasks** in the 30-day program: each task number, title, description and the day it is introduced (Day 1, 4, 8, 11, 15, 19, 22 and 26)
- The **two internship tracks**, Data Analytics and Web Development, each with its own eight official tasks
- How the tasks build progressively from beginner HTML and CSS to more advanced, interactive interfaces, using the difficulty levels Beginner, Beginner to Intermediate, Intermediate and Intermediate to Advanced Beginner
- An interactive track switcher with a clear **currently viewing** state, the full 30-day structure and a difficulty arc for each track
- Optional personal progress marking, saved in the browser only and clearly identified as a planning aid rather than an official completion record
- How to apply (official application form) and join the community (official WhatsApp group)
- Official contact details: techbridgebaslink@gmail.com, LinkedIn, Instagram and Facebook

## Project structure

```
techbridge-task-1/
├── index.html                     # Homepage (Task 1)
├── programs.html                  # Programs experience (Task 2)
├── tasks.html                     # Internship Tasks experience (Task 3)
├── roadmap.html                   # Interactive Internship Roadmap (Task 4)
├── style.css                      # Shared design tokens, components, all pages
├── script.js                      # Mobile navigation and two-track roadmap
├── images/
│   ├── techbridge-logo.png        # Official TechBridge logo
│   └── internship-illustration.png
├── homepage-screenshot.png        # Desktop screenshot of the homepage
├── programs-screenshot.png        # Desktop screenshot of the Programs experience
├── tasks-screenshot.png           # Desktop screenshot of the Internship Tasks experience
├── roadmap-data-analytics-screenshot.png  # Roadmap with Data Analytics selected
├── roadmap-web-development-screenshot.png # Roadmap with Web Development selected
└── README.md
```

## Running locally

Open `index.html` in any modern browser. No build step or dependencies are required.

## Deployment

Deployed via Vercel: https://techbridge-task-1-plum.vercel.app

The Programs page is available at `/programs.html`, the Internship Tasks page at `/tasks.html`, and the Interactive Internship Roadmap at `/roadmap.html` on the same deployment.

## Task 4 screenshots

| File | Shows |
| --- | --- |
| `roadmap-data-analytics-screenshot.png` | The roadmap with the Data Analytics track selected and all eight Data Analytics tasks visible. |
| `roadmap-web-development-screenshot.png` | The roadmap with the Web Development track selected and all eight Web Development tasks visible. |

Both are full-page desktop captures at 1440px wide.

## Responsive behaviour

- **Desktop (≥ 981px):** two-column heroes, two-column program cards, a two-column Tasks journey with a sticky introduction, and a two-column roadmap task grid. The seven navigation items tighten their spacing between 981px and 1180px so the header stays on one line.
- **Tablet (641–980px):** two-column hero, journey and roadmap layouts that fill the width, key figures spread across three columns, program cards and comparison panels side by side, call to action buttons in a full-width row, a two-column footer, and the mobile navigation.
- **Mobile (≤ 640px):** single-column content that uses the full width, full-width buttons, a single-column track switcher and task list, a compact 30-day grid, two-column "Why TechBridge" feature grid, a single-column difficulty legend, and a full-height off-canvas menu that slides in from the right over a blurred backdrop.

## Accessibility

- Semantic landmarks and a single `h1` per page
- Visible keyboard focus states, including a focus outline on linked program cards, route links and track controls
- "Skip to main content" link
- Mobile menu updates `aria-expanded`, closes with Escape and restores focus to the toggle
- The blurred menu backdrop is hidden from assistive technology; the menu can also be dismissed by tapping it
- The track switcher uses ARIA tabs with roving `tabindex` and Arrow Left, Arrow Right, Home and End keyboard support
- Track changes update a polite `role="status"` live region, the visible "Currently viewing" label and the panel's accessible name
- The progress bar uses `role="progressbar"` with live values, completion buttons use `aria-pressed`, and the reset control uses `aria-disabled`
- A `<noscript>` message points visitors to the Tasks page when JavaScript is unavailable
- Respect for `prefers-reduced-motion`
- Descriptive `aria-label`s on icon-only links

## Developer note, Task 4

> I built Task 4 as a dedicated Interactive Internship Roadmap page that continues the warm off-white, navy and cobalt system from Tasks 1 to 3. Both tracks live in one JavaScript array of track objects, and each track holds an array of task objects with its number, title, day, description and difficulty, so the same official data drives every card, the difficulty arc and the progress total. Selecting a track calls a function that reads the current track, renders all eight cards from a template, updates the "Currently viewing" label, the 30-day summary and the ARIA tab state, and writes the choice into the URL without reloading the page. The page uses variables, arrays, objects, functions, event listeners, conditional logic and DOM manipulation, and adds arrow-key tab navigation, a polite live region and saved progress in `localStorage`. One challenge was keeping each track's progress separate while re-rendering cards on every switch; I solved it by storing completion as numbered entries per track, re-applying that state after each render and updating only the affected card when a task is marked. I also guarded `localStorage` so the page still works when browser storage is unavailable.

## Developer note, Task 3

> I built the Internship Tasks experience as a roadmap that extends the bridge motif from the homepage and the pathway visual from the Programs page. A route card gives visitors the full Day 1 to Day 26 schedule at a glance, while a vertical timeline presents all eight tasks with their number, title, description, difficulty level and the day each one is introduced. I used a four-step difficulty scale with filled dots to show progression, and kept all task content in the HTML so the page works fully without JavaScript. The main challenge was making a long timeline feel calm and readable on small screens, which I solved by shrinking the day markers and moving to a single-column layout with compact cards. I learned how to communicate sequence and progression with layout, typography and small visual cues rather than extra interactivity.

## Developer note, Task 2

> I approached the Programs experience as a continuation of the Task 1 site, keeping the same warm off-white ground, deep navy type and cobalt accent while giving each program its own visual treatment: a light, data-led card for Data Analytics and a deep navy, build-led card for Web Development. Each program card explains what the program covers, its focus, and the skills a learner will develop, and a short "Find your fit" section helps visitors tell the two paths apart before applying. I learned how to carry a design system across a second page and how to adapt a shared component, the navigation, into a full-height mobile sidebar with a blurred backdrop. The main challenge was keeping the two program cards visually distinct without breaking the shared brand system, which I solved with contrast, accent colour and content-led differentiation rather than new decorative styles.

## Developer note, Task 1

> I designed the TechBridge homepage around the idea of a bridge, connecting learners to real-world experience, using a calm off-white page, deep navy text and a strong cobalt accent so the calls to action stand out. I built the hero, About, Programs, Internship, Why TechBridge, Apply/Community and Footer sections with HTML5 and CSS3, and added a short vanilla JavaScript file purely for the mobile menu. During the project I learned how to manage responsive layouts with CSS grid, flexible units and media queries instead of fixed pixel sizes. One challenge I encountered was making the navigation usable on small screens without a framework, which I solved with an accessible toggle button that updates `aria-expanded` and closes on Escape, link clicks and outside clicks.

## Official TechBridge accounts

- Instagram: https://www.instagram.com/techbridgeserves
- LinkedIn: https://www.linkedin.com/company/techbridge-services/

The Task 4 brief also asks interns to follow both accounts and submit screenshot evidence. Those personal account screenshots are submitted separately from this repository.
