# TechBridge Website (Tasks 1 to 7)

A responsive website for **TechBridge by Baselink Services Limited**, a learning and career development initiative bridging learning to real-world experience.

Built with **HTML5 + CSS3** (no frameworks), plus vanilla JavaScript for the mobile navigation, the interactive two-track internship roadmap, the Challenge Hub and the Intern Dashboard. Task 7 adds a **Node.js + Express Task Management API**, and the dashboard now loads and updates its task data through that API.

## Pages

| Page | Purpose |
| --- | --- |
| `index.html` | Homepage: introduction, About, program preview, 30-Day Practical Internship, Why TechBridge, apply/community call to action, footer. |
| `programs.html` | Dedicated Programs experience: overview, Data Analytics and Web Development program cards, skills, differentiation guide, internship connection and application CTA. |
| `tasks.html` | Internship Tasks experience: an introduction to the 30-day internship, an at-a-glance Day 1 to Day 26 route card, and a difficulty-graded timeline of all eight practical tasks. |
| `roadmap.html` | Interactive Internship Roadmap: a 30-day structure card and a two-track switcher showing all eight Data Analytics and Web Development tasks, difficulty progression and optional saved progress. |
| `challenges.html` | Challenge Hub: eight original practice challenges across both tracks, with track and difficulty filters, keyword search, a live result count and a full detail dialog for every challenge. |
| `dashboard.html` | Intern Dashboard: a sample intern welcome, progress summary, API-driven eight-task tracker with status filters and search, task detail dialog, backend status indicator, endpoint documentation, Challenge Hub link and a Modern Web Technologies explorer. |

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
- A **Challenge Hub** with eight original practice challenges, four per track, each showing its name, track, difficulty, short description, expected outcome and a View Challenge button
- A combined track, difficulty and keyword search that updates without a page reload, with a live result count, a no-results state, a reset control and shareable filter URLs
- A challenge detail dialog covering the brief, skills, suggested tools, steps, what to submit and success criteria, plus a shareable deep link for each challenge
- A clear statement that the challenges are practice activities, not official internship tasks, assessments or deadlines
- An **Intern Dashboard** with a sample intern profile, track, internship status, a current task card and a full progress summary
- A task tracker that requests all eight official tasks from the Task API, with Completed, In Progress and Not Started styles, mark complete and reopen actions, status filters, keyword search and task details in a dialog
- A progress bar and percentage that update after the API confirms a status change, with a completion state for all eight tasks
- A loading state, an "Unable to load tasks" error state with a retry control, and a Backend status indicator that reports Connecting, Connected or Offline
- An endpoint reference on the dashboard, plus a direct connection to the Challenge Hub and a **Modern Web Technologies** explorer covering Next.js, Vue.js, Angular and backend development, including six backend technologies
- A clear statement that the dashboard uses a sample intern profile and API-served task statuses, not an official internship record
- How to apply (official application form) and join the community (official WhatsApp group)
- Official contact details: techbridgebaslink@gmail.com, LinkedIn, Instagram and Facebook

## Project structure

```
techbridge-task-1/
├── index.html                     # Homepage (Task 1)
├── programs.html                  # Programs experience (Task 2)
├── tasks.html                     # Internship Tasks experience (Task 3)
├── roadmap.html                   # Interactive Internship Roadmap (Task 4)
├── challenges.html                # Challenge Hub (Task 5)
├── dashboard.html                 # Intern Dashboard (Tasks 6 and 7)
├── style.css                      # Shared design tokens, components, all pages
├── script.js                      # Mobile navigation, roadmap, Challenge Hub and dashboard
├── backend/
│   ├── server.js                  # Express server, API routes and static hosting (Task 7)
│   └── data/
│       └── tasks.json             # The eight internship tasks and their statuses
├── lib/
│   └── task-store.js              # Shared task reads, validation and persistence
├── api/
│   └── [...path].js               # Vercel serverless adapter for the same API
├── package.json                   # Express dependency and start script
├── .gitignore                     # Excludes node_modules and local logs
├── images/
│   ├── techbridge-logo.png        # Official TechBridge logo
│   └── internship-illustration.png
├── homepage-screenshot.png        # Desktop screenshot of the homepage
├── programs-screenshot.png        # Desktop screenshot of the Programs experience
├── tasks-screenshot.png           # Desktop screenshot of the Internship Tasks experience
├── roadmap-data-analytics-screenshot.png  # Roadmap with Data Analytics selected
├── roadmap-web-development-screenshot.png # Roadmap with Web Development selected
├── challenges-screenshot.png      # Desktop screenshot of the Challenge Hub
├── challenges-detail-screenshot.png       # Challenge detail dialog
├── dashboard-screenshot.png       # Full Intern Dashboard, API connected
├── dashboard-detail-screenshot.png        # Task detail dialog loaded from the API
├── dashboard-api-screenshot.png   # Endpoint documentation on the dashboard
├── dashboard-error-screenshot.png # Offline error state
├── dashboard-tech-screenshot.png  # Backend tab of the technology explorer
└── README.md
```

The existing site at the project root is the **frontend**. It stays at the root so every published URL from Tasks 1 to 6 keeps working. All server code lives in `backend/`, `lib/` and `api/`, so the frontend and backend remain clearly separated.

## Running locally

Task 7 needs Node.js and the Express dependency, because the dashboard now loads its tasks from the API.

```bash
npm install
npm start
```

Then open http://localhost:3000/dashboard.html. The server also hosts every other page, for example http://localhost:3000/index.html.

`npm start` runs `backend/server.js`. Set `PORT` to use a different port:

```powershell
$env:PORT=4000; npm start
```

Opening `dashboard.html` directly from the filesystem no longer loads tasks, because there is no API at `file://`. The page shows its error state and explains that the backend is offline, which is the intended fallback.

## API

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/api/tasks` | Get all tasks |
| `GET` | `/api/tasks/:id` | Get one task |
| `PUT` | `/api/tasks/:id` | Update a task status |
| `GET` | `/api/health` | Check that the API is running (supporting endpoint) |

`GET /api/tasks` returns a JSON array of all eight tasks. Each task includes its `id`, `title`, `description`, `status`, `day`, `difficulty`, `level`, `focus` points and `evidence` guidance.

```bash
curl http://localhost:3000/api/tasks
curl http://localhost:3000/api/tasks/3
```

`GET /api/tasks/:id` returns one task, or `404` when the id does not exist. A non-numeric id returns `400`.

`PUT /api/tasks/:id` accepts a JSON body with one of three statuses:

```json
{ "status": "completed" }
```

Valid statuses are `completed`, `in-progress` and `not-started`. The response is the updated task. An unknown status returns `400`, a missing task returns `404`, and malformed JSON returns `400`.

```bash
curl -X PUT http://localhost:3000/api/tasks/7 \
  -H "Content-Type: application/json" \
  -d "{\"status\":\"completed\"}"
```

The local Express server writes each status change back to `backend/data/tasks.json`, so the change survives a server restart. The API also sends CORS headers and answers `OPTIONS` requests, so the frontend can be tested from another port during development.

The dashboard uses `GET /api/tasks` for the tracker and progress summary, `GET /api/tasks/:id` when View Task opens the dialog, and `PUT /api/tasks/:id` when a task is marked complete or reopened.

## Deployment

Deployed via Vercel: https://techbridge-task-1-plum.vercel.app

The Programs page is available at `/programs.html`, the Internship Tasks page at `/tasks.html`, the Interactive Internship Roadmap at `/roadmap.html`, the Challenge Hub at `/challenges.html` and the Intern Dashboard at `/dashboard.html` on the same deployment.

The same deployment serves the API through `api/[...path].js`, so the live dashboard can use relative `/api/tasks` requests without a separate API host. Serverless functions have a read-only filesystem and no shared database, so live status changes are kept in memory for the life of a warm function instance and reset after a cold start. The local Express server is the version that writes changes back to `backend/data/tasks.json`.

## Task 7 screenshots

| File | Shows |
| --- | --- |
| `dashboard-screenshot.png` | The full dashboard with the Connected backend badge, API-driven progress summary, task tracker and endpoint documentation. |
| `dashboard-detail-screenshot.png` | The task detail dialog opened with View Task, showing the task returned by `GET /api/tasks/6`. |
| `dashboard-api-screenshot.png` | The endpoint documentation section listing the three Task 7 routes. |
| `dashboard-error-screenshot.png` | The dashboard after the backend was stopped, with the "Unable to load tasks" message, cleared filter counts and Try again control. |

The full dashboard is a 1440px-wide capture. The endpoint and error captures are 1440px-wide section captures.

## Task 6 screenshots

| File | Shows |
| --- | --- |
| `dashboard-screenshot.png` | The full dashboard with the sample welcome, progress summary, task tracker, Challenge Hub link and technology explorer. Regenerated for Task 7 with the API connection active. |
| `dashboard-detail-screenshot.png` | The task detail dialog open over the dashboard, showing status, focus points and suggested evidence. Regenerated for Task 7 from the single-task endpoint. |
| `dashboard-tech-screenshot.png` | The backend tab of the technology explorer with six backend technologies. |

The first two are full-page or dialog captures at 1440px wide. The technology panel capture is 1184px wide.

## Task 5 screenshots

| File | Shows |
| --- | --- |
| `challenges-screenshot.png` | The Challenge Hub with all eight practice challenges visible and the filter toolbar in its default state. |
| `challenges-detail-screenshot.png` | The challenge detail dialog open over the hub, showing the brief, skills, tools and steps. |

Both are desktop captures at 1440px wide.

## Task 4 screenshots

| File | Shows |
| --- | --- |
| `roadmap-data-analytics-screenshot.png` | The roadmap with the Data Analytics track selected and all eight Data Analytics tasks visible. |
| `roadmap-web-development-screenshot.png` | The roadmap with the Web Development track selected and all eight Web Development tasks visible. |

Both are full-page desktop captures at 1440px wide.

## Responsive behaviour

- **Desktop (≥ 981px):** two-column heroes, two-column program cards, a two-column Tasks journey with a sticky introduction, and a two-column roadmap task grid. The challenge library uses four cards per row with the filter toolbar beside the search field. The dashboard uses a two-column welcome and task grid, a four-part progress summary, a three-column endpoint reference and a tabbed technology panel. The nine navigation items tighten their spacing, and the brand tagline steps aside between 981px and 1100px, so the header stays on one line.
- **Tablet (641–980px):** two-column hero, journey and roadmap layouts that fill the width, key figures spread across three columns, program cards and comparison panels side by side, call to action buttons in a full-width row, a two-column footer, and the mobile navigation. The challenge hero stacks, the filters move below the search field and the challenge grid drops to two columns. The dashboard hero stacks, the progress summary moves below the large total, the task grid keeps two columns and the endpoint reference drops to two columns.
- **Mobile (≤ 640px):** single-column content that uses the full width, full-width buttons, a single-column track switcher and task list, a compact 30-day grid, two-column "Why TechBridge" feature grid, a single-column difficulty legend, and a full-height off-canvas menu that slides in from the right over a blurred backdrop. Challenge cards become a single column, the filters stack, and the challenge dialog becomes a full-width bottom sheet. The dashboard becomes a single column, its progress figures form a 2 by 2 grid, task cards and endpoint cards stack, and the task dialog becomes a full-width bottom sheet.

## Accessibility

- Semantic landmarks and a single `h1` per page
- Visible keyboard focus states, including a focus outline on linked program cards, route links and track controls
- "Skip to main content" link
- Mobile menu updates `aria-expanded`, closes with Escape and restores focus to the toggle
- The blurred menu backdrop is hidden from assistive technology; the menu can also be dismissed by tapping it
- The track switcher uses ARIA tabs with roving `tabindex` and Arrow Left, Arrow Right, Home and End keyboard support
- Track changes update a polite `role="status"` live region, the visible "Currently viewing" label and the panel's accessible name
- The progress bar uses `role="progressbar"` with live values, completion buttons use `aria-pressed`, and the reset control uses `aria-disabled`
- Challenge filters are grouped with `role="group"` labels, expose their state with `aria-pressed` and update a polite `role="status"` result count
- The challenge detail uses a native dialog with `aria-labelledby`, a visible close button, Escape to close, focus trapped while open and focus returned to the View Challenge button on close
- The dialog body is a labelled, focusable region, so keyboard users can scroll a long brief without leaving the dialog
- Challenge search has a visible label, and each View Challenge button includes the challenge name for screen readers
- Shareable URLs keep the track, difficulty, search term and open challenge without a page reload
- Dashboard status filters are grouped with a label, expose their state with `aria-pressed` and update a live result count in a polite `role="status"` region
- The dashboard progress bar uses `role="progressbar"` with `aria-valuemin`, `aria-valuemax`, `aria-valuenow` and `aria-valuetext`, and the visible percentage updates at the same time
- The dashboard task dialog is a native `<dialog>` with a stable `aria-label`, a labelled and focusable scroll region, Escape to close, focus kept inside while open and focus returned to the task card on close
- Task completion and reopen actions show a polite status message, and each card button names its task for screen readers
- The backend status indicator is a polite `role="status"` live region, and the loading state uses `role="status"` so screen readers hear when tasks are being fetched
- The API error state uses `role="alert"`, keeps the heading and retry control in the reading order, and the task dialog has its own loading and error states with a retry control
- Buttons are disabled while a request is in flight, and the visible label changes to Saving so the state is clear without relying on colour
- The technology explorer uses ARIA tabs with roving `tabindex` and Arrow Left, Arrow Right, Home and End keyboard support
- The sample profile and API-served statuses are labelled in the welcome section and in the task dialog, so the page is not mistaken for an official record
- A `<noscript>` message explains that the task tracker needs JavaScript and the API, and points visitors to the Tasks page
- Respect for `prefers-reduced-motion`, including a static loading spinner
- Descriptive `aria-label`s on icon-only links

## Developer note, Task 7

> I built Task 7 by connecting the existing Task 6 dashboard to a small Node.js and Express API instead of starting a separate project. The backend keeps the eight tasks in `backend/data/tasks.json` and exposes `GET /api/tasks`, `GET /api/tasks/:id` and `PUT /api/tasks/:id`, with a shared store module for validation and local persistence. The frontend now starts in a loading state, fetches all tasks, renders the cards, progress summary, profile card and filter counts from that response, requests one task when View Task opens the dialog, and sends a PUT when a task is marked complete or reopened. I added a backend status indicator, a full "Unable to load tasks" state with a retry control, and a separate loading and error state inside the dialog, then tested the full flow by stopping and restarting the server. The same routes are exposed on Vercel through a serverless adapter so the live dashboard can use relative API requests. One challenge was keeping the UI consistent when a request failed halfway through, which I solved by keeping the last known task list until the refresh fails, showing the error state without leaving a blank page, and disabling actions while a request is in flight. The local server writes status changes back to the JSON file; the serverless version keeps them in memory because its filesystem is read only. The sample profile is still clearly labelled, and task statuses now come from the API rather than the page.

## Developer note, Task 6

> I built Task 6 as a dedicated Intern Dashboard that turns the site into something closer to a working platform. The eight official task titles and descriptions come from the existing TechBridge task list, and each one also carries focus points and suggested evidence for this practice dashboard. A single `statuses` object holds the state for all eight tasks, and one render function updates the cards, completed and remaining counts, the percentage, the progress bar, the profile card and the filter counts together, so the page never shows two different versions of the same progress. The tracker supports marking a task complete, reopening it, filtering by status, searching by keyword, opening a task in a native dialog and saving progress in `localStorage`, with safe fallbacks when storage is unavailable. The dashboard also links to the Challenge Hub and includes an interactive technology explorer for Next.js, Vue.js, Angular and backend development, with six backend technologies and official links. The main challenge was keeping the progress numbers, profile card, filtered list and open dialog in sync after every action; I solved it by treating the status object as the only source of truth and re-rendering the dependent views from it. The sample profile and demo progress are clearly labelled as practice data rather than an official internship record. Task 7 replaced the browser storage with the Task API while keeping the same dashboard behaviour.

## Developer note, Task 5

> I built Task 5 as a dedicated Challenge Hub that extends the warm off-white, navy and cobalt system to a new kind of page. All eight original practice challenges live in one array of objects, and each object holds its track, difficulty, description, expected outcome, skills, tools, steps and success criteria, so the same data drives the cards, the filters and the detail dialog. The filter function combines a track value, a difficulty value and a search term, then re-renders the grid from a template and updates a live result count, an empty state and the URL. Choosing View Challenge fills a native `<dialog>` and opens it with the browser's built-in focus handling, and closing returns focus to the button that opened it. One challenge was keeping the filter state and the open challenge in the same URL without a reload, which I solved by writing both through `replaceState` and reading them back on load. The challenge content is clearly labelled as practice work rather than official internship tasks.

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
