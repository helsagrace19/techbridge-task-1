(function () {
  "use strict";

  var toggle = document.querySelector(".nav-toggle");
  var toggleText = toggle ? toggle.querySelector(".nav-toggle__text") : null;
  var nav = document.getElementById("primary-nav");
  var header = document.querySelector(".site-header");
  var backdrop = document.querySelector(".nav-backdrop");

  if (!toggle || !nav) {
    return;
  }

  function setOpen(open) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-open", open);

    if (toggleText) {
      toggleText.textContent = open ? "Close" : "Menu";
    }

    if (backdrop) {
      backdrop.classList.toggle("is-open", open);
      backdrop.setAttribute("aria-hidden", String(!open));
    }
  }

  function isOpen() {
    return toggle.getAttribute("aria-expanded") === "true";
  }

  toggle.addEventListener("click", function () {
    setOpen(!isOpen());
  });

  nav.addEventListener("click", function (event) {
    if (event.target.closest("a")) {
      setOpen(false);
    }
  });

  if (backdrop) {
    backdrop.addEventListener("click", function () {
      setOpen(false);
      toggle.focus();
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && isOpen()) {
      setOpen(false);
      toggle.focus();
    }
  });

  document.addEventListener("click", function (event) {
    if (isOpen() && header && !header.contains(event.target)) {
      setOpen(false);
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 980 && isOpen()) {
      setOpen(false);
    }
  });
})();

/* ============================================================
   Interactive Internship Roadmap (Task 4)
   Two tracks, rendered from arrays of task objects.
   ============================================================ */
(function () {
  "use strict";

  var taskList = document.getElementById("task-list");
  var panel = document.getElementById("track-panel");
  var template = document.getElementById("task-template");

  if (!taskList || !panel || !template) {
    return;
  }

  var tabs = Array.prototype.slice.call(document.querySelectorAll(".track-tab"));
  var switcher = document.querySelector(".track-switcher");
  var currentTrackName = document.getElementById("current-track-name");
  var trackSummary = document.getElementById("track-summary");
  var announcement = document.getElementById("track-announcement");
  var progressCount = document.getElementById("progress-count");
  var progressBar = document.getElementById("progress-bar");
  var progressFill = document.getElementById("progress-fill");
  var progressMessage = document.getElementById("progress-message");
  var progressReset = document.getElementById("progress-reset");
  var difficultyArc = document.getElementById("difficulty-arc");

  var DEFAULT_TRACK = "data-analytics";
  var STORAGE_KEY = "techbridgeRoadmapProgress.v1";

  /* Official TechBridge task data. Each track is an object in an array;
     each task is an object with its number, title, day, description
     and difficulty level. */
  var tracks = [
    {
      id: "data-analytics",
      name: "Data Analytics",
      tasks: [
        {
          number: 1,
          title: "Data Cleaning Basics",
          day: 1,
          description: "Clean a messy dataset using Google Sheets or Excel. Identify and fix duplicate rows, blank cells, inconsistent formatting, and incorrect data types.",
          difficulty: "Beginner",
          level: 1
        },
        {
          number: 2,
          title: "Formulas & Pivot Tables",
          day: 4,
          description: "Use spreadsheet formulas and Pivot Tables to answer questions and extract useful insights from a dataset.",
          difficulty: "Beginner",
          level: 1
        },
        {
          number: 3,
          title: "Data Visualization",
          day: 8,
          description: "Create charts and a simple dashboard that communicate useful insights from a dataset.",
          difficulty: "Beginner → Intermediate",
          level: 2
        },
        {
          number: 4,
          title: "Introduction to SQL",
          day: 11,
          description: "Practice basic SQL queries and use them to answer real-world questions about data.",
          difficulty: "Beginner → Intermediate",
          level: 2
        },
        {
          number: 5,
          title: "SQL Joins & Aggregations",
          day: 15,
          description: "Use JOIN, GROUP BY and aggregate functions such as COUNT, SUM and AVG to analyze information across multiple tables.",
          difficulty: "Intermediate",
          level: 3
        },
        {
          number: 6,
          title: "Lookup Functions & Data Wrangling",
          day: 19,
          description: "Use VLOOKUP or XLOOKUP to combine related datasets and handle data mismatches.",
          difficulty: "Intermediate",
          level: 3
        },
        {
          number: 7,
          title: "Mini Analysis Project",
          day: 22,
          description: "Complete a small end-to-end analysis involving data cleaning, formulas, Pivot Tables, charts and recommendations.",
          difficulty: "Intermediate",
          level: 3
        },
        {
          number: 8,
          title: "Capstone Project",
          day: 26,
          description: "Complete a larger project combining spreadsheet analysis and SQL using at least two related tables.",
          difficulty: "Intermediate",
          level: 3
        }
      ]
    },
    {
      id: "web-development",
      name: "Web Development",
      tasks: [
        {
          number: 1,
          title: "Build the TechBridge Homepage",
          day: 1,
          description: "Create the first version of the TechBridge website using HTML and CSS.",
          difficulty: "Beginner",
          level: 1
        },
        {
          number: 2,
          title: "Build the TechBridge Programs Experience",
          day: 4,
          description: "Create a Programs experience presenting TechBridge's available learning programs.",
          difficulty: "Beginner",
          level: 1
        },
        {
          number: 3,
          title: "Build the Internship Tasks Experience",
          day: 8,
          description: "Create an interface that presents the TechBridge internship tasks and helps users understand the internship journey.",
          difficulty: "Beginner → Intermediate",
          level: 2
        },
        {
          number: 4,
          title: "Build an Interactive Internship Roadmap",
          day: 11,
          description: "Use JavaScript to allow visitors to switch between the Data Analytics and Web Development internship tracks.",
          difficulty: "Beginner → Intermediate",
          level: 2
        },
        {
          number: 5,
          title: "Build the Intern Registration Experience",
          day: 15,
          description: "Create a professional registration and onboarding interface for TechBridge interns.",
          difficulty: "Intermediate",
          level: 3
        },
        {
          number: 6,
          title: "Build the Task Submission System",
          day: 19,
          description: "Create an interface through which interns can prepare and submit their task work.",
          difficulty: "Intermediate",
          level: 3
        },
        {
          number: 7,
          title: "Build the Intern Dashboard",
          day: 22,
          description: "Create a dashboard where an intern can view their profile, progress, tasks and submissions.",
          difficulty: "Intermediate",
          level: 3
        },
        {
          number: 8,
          title: "Build the Complete TechBridge Internship Platform",
          day: 26,
          description: "Combine the different components created during the internship into a complete TechBridge platform.",
          difficulty: "Intermediate",
          level: 3
        }
      ]
    }
  ];

  var currentTrackId = DEFAULT_TRACK;
  var storageAvailable = testStorage();
  var savedProgress = readProgress();

  function testStorage() {
    try {
      var key = "__techbridge_storage_test__";
      window.localStorage.setItem(key, "1");
      window.localStorage.removeItem(key);
      return true;
    } catch (error) {
      return false;
    }
  }

  function getTrack(trackId) {
    for (var i = 0; i < tracks.length; i += 1) {
      if (tracks[i].id === trackId) {
        return tracks[i];
      }
    }
    return tracks[0];
  }

  function hasTrack(trackId) {
    for (var i = 0; i < tracks.length; i += 1) {
      if (tracks[i].id === trackId) {
        return true;
      }
    }
    return false;
  }

  function getCurrentTrack() {
    return getTrack(currentTrackId);
  }

  function pad(number) {
    return number < 10 ? "0" + number : String(number);
  }

  function levelName(level) {
    if (level === 1) {
      return "Beginner";
    }
    if (level === 2) {
      return "Beginner → Intermediate";
    }
    return "Intermediate";
  }

  function readProgress() {
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return {};
      }

      var parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        return parsed;
      }
    } catch (error) {
      return {};
    }

    return {};
  }

  function saveProgress() {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(savedProgress));
    } catch (error) {
      /* Progress still works for this visit when storage is unavailable. */
    }
  }

  function getCompleted(trackId) {
    var entries = savedProgress[trackId];

    if (!Array.isArray(entries)) {
      return [];
    }

    var clean = [];

    entries.forEach(function (value) {
      var number = Number(value);

      if (number >= 1 && number <= 8 && clean.indexOf(number) === -1) {
        clean.push(number);
      }
    });

    return clean.sort(function (a, b) {
      return a - b;
    });
  }

  function setCompleted(trackId, completed) {
    savedProgress[trackId] = completed.sort(function (a, b) {
      return a - b;
    });
    saveProgress();
  }

  function buildSummary(track) {
    var firstTask = track.tasks[0];
    var lastTask = track.tasks[track.tasks.length - 1];
    var levels = track.tasks.map(function (task) {
      return task.level;
    });
    var lowest = Math.min.apply(null, levels);
    var highest = Math.max.apply(null, levels);
    var range = lowest === highest ? levelName(lowest) : levelName(lowest) + " → " + levelName(highest);

    return track.tasks.length + " tasks · Day " + firstTask.day + " → Day " + lastTask.day + " · " + range;
  }

  function announce(message) {
    if (announcement) {
      announcement.textContent = message;
    }
  }

  function setCardState(button, isComplete) {
    var card = button.closest(".roadmap-card");
    var item = button.closest(".roadmap-task");
    var text = button.querySelector("[data-check-text]");
    var title = item ? item.getAttribute("data-task-title") : "this task";

    button.setAttribute("aria-pressed", String(isComplete));
    button.setAttribute(
      "aria-label",
      isComplete ? "Mark " + title + " as not complete" : "Mark " + title + " as complete"
    );

    if (text) {
      text.textContent = isComplete ? "Completed" : "Mark complete";
    }

    if (card) {
      card.classList.toggle("is-complete", isComplete);
    }
  }

  function renderTasks(track) {
    var fragment = document.createDocumentFragment();
    var completed = getCompleted(track.id);

    track.tasks.forEach(function (task) {
      var item = template.content.firstElementChild.cloneNode(true);

      item.setAttribute("data-task-number", String(task.number));
      item.setAttribute("data-task-title", task.title);

      item.querySelector('[data-field="number"]').textContent = "Task " + pad(task.number);
      item.querySelector('[data-field="title"]').textContent = task.title;
      item.querySelector('[data-field="description"]').textContent = task.description;
      item.querySelector('[data-field="day"]').textContent = String(task.day);
      item.querySelector('[data-field="difficulty"]').textContent = task.difficulty;
      item.querySelector('[data-field="level"]').classList.add("level--" + task.level);

      var button = item.querySelector("[data-check]");
      setCardState(button, completed.indexOf(task.number) !== -1);

      fragment.appendChild(item);
    });

    taskList.textContent = "";
    taskList.appendChild(fragment);
  }

  function renderDifficulty(track) {
    var fragment = document.createDocumentFragment();

    track.tasks.forEach(function (task) {
      var item = document.createElement("li");
      item.className = "difficulty-seg difficulty-seg--" + task.level;

      var bar = document.createElement("span");
      bar.className = "difficulty-seg__bar";
      bar.setAttribute("aria-hidden", "true");

      var label = document.createElement("span");
      label.className = "difficulty-seg__label";
      label.setAttribute("aria-hidden", "true");
      label.textContent = "T" + task.number;

      var description = document.createElement("span");
      description.className = "sr-only";
      description.textContent = "Task " + task.number + ": " + task.difficulty + ".";

      item.appendChild(bar);
      item.appendChild(label);
      item.appendChild(description);
      fragment.appendChild(item);
    });

    difficultyArc.textContent = "";
    difficultyArc.appendChild(fragment);
  }

  function updateProgress(track) {
    var completed = getCompleted(track.id);
    var total = track.tasks.length;
    var count = completed.length;
    var percent = total ? (count / total) * 100 : 0;
    var storageNote = storageAvailable
      ? "Progress is saved in this browser only."
      : "Progress is kept for this visit only.";
    var completeNote = storageAvailable
      ? "Your progress is saved in this browser."
      : "Progress is kept for this visit.";

    progressCount.textContent = String(count);
    progressFill.style.width = percent + "%";
    progressBar.setAttribute("aria-valuemax", String(total));
    progressBar.setAttribute("aria-valuenow", String(count));

    progressReset.removeAttribute("disabled");
    progressReset.setAttribute("aria-disabled", count === 0 ? "true" : "false");

    if (count === 0) {
      progressMessage.textContent = "No tasks marked yet. " + storageNote;
    } else if (count === total) {
      progressMessage.textContent = "All " + total + " tasks complete. " + completeNote;
    } else {
      progressMessage.textContent = count + " of " + total + " tasks complete. " + storageNote;
    }
  }

  function updateTabs(trackId, focusActive) {
    tabs.forEach(function (tab) {
      var isActive = tab.getAttribute("data-track") === trackId;

      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
      tab.tabIndex = isActive ? 0 : -1;

      if (isActive && focusActive) {
        tab.focus();
      }
    });
  }

  function updateUrl(trackId) {
    if (!window.history || !window.history.replaceState) {
      return;
    }

    try {
      var url = new URL(window.location.href);
      url.searchParams.set("track", trackId);
      window.history.replaceState(null, "", url.pathname + url.search + url.hash);
    } catch (error) {
      /* The page still works when the URL cannot be updated. */
    }
  }

  function selectTrack(trackId, options) {
    var settings = options || {};
    var track = getTrack(trackId);

    currentTrackId = track.id;
    currentTrackName.textContent = track.name;
    trackSummary.textContent = buildSummary(track);
    panel.setAttribute("aria-labelledby", "tab-" + track.id);

    renderTasks(track);
    renderDifficulty(track);
    updateProgress(track);
    updateTabs(track.id, settings.focusTab === true);

    if (settings.updateUrl === true) {
      updateUrl(track.id);
    }

    if (settings.announce !== false) {
      announce(
        "Now viewing " + track.name + ". " + track.tasks.length +
        " tasks from Day " + track.tasks[0].day + " to Day " +
        track.tasks[track.tasks.length - 1].day + "."
      );
    }
  }

  function readInitialTrack() {
    try {
      var params = new URLSearchParams(window.location.search);
      var requested = params.get("track");

      if (requested && hasTrack(requested)) {
        return requested;
      }
    } catch (error) {
      return DEFAULT_TRACK;
    }

    return DEFAULT_TRACK;
  }

  function toggleTask(number, button) {
    var completed = getCompleted(currentTrackId);
    var index = completed.indexOf(number);

    if (index === -1) {
      completed.push(number);
    } else {
      completed.splice(index, 1);
    }

    setCompleted(currentTrackId, completed);
    setCardState(button, completed.indexOf(number) !== -1);
    updateProgress(getCurrentTrack());
  }

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      selectTrack(tab.getAttribute("data-track"), { updateUrl: true });
    });
  });

  if (switcher) {
    switcher.addEventListener("keydown", function (event) {
      var index = tabs.indexOf(document.activeElement);
      var nextIndex = null;

      if (index === -1) {
        return;
      }

      if (event.key === "ArrowRight") {
        nextIndex = (index + 1) % tabs.length;
      } else if (event.key === "ArrowLeft") {
        nextIndex = (index - 1 + tabs.length) % tabs.length;
      } else if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = tabs.length - 1;
      }

      if (nextIndex === null) {
        return;
      }

      event.preventDefault();
      selectTrack(tabs[nextIndex].getAttribute("data-track"), {
        focusTab: true,
        updateUrl: true
      });
    });
  }

  taskList.addEventListener("click", function (event) {
    var button = event.target.closest("[data-check]");

    if (!button || !taskList.contains(button)) {
      return;
    }

    var item = button.closest(".roadmap-task");
    var number = Number(item.getAttribute("data-task-number"));

    toggleTask(number, button);
  });

  progressReset.addEventListener("click", function () {
    var track = getCurrentTrack();

    if (getCompleted(track.id).length === 0) {
      return;
    }

    if (!window.confirm("Reset your progress for " + track.name + "?")) {
      return;
    }

    setCompleted(track.id, []);

    Array.prototype.forEach.call(taskList.querySelectorAll("[data-check]"), function (button) {
      setCardState(button, false);
    });

    updateProgress(track);
    announce("Progress reset for " + track.name + ".");
  });

  selectTrack(readInitialTrack(), { announce: false });
})();

/* ============================================================
   Challenge Hub (Task 5)
   Eight practice challenges, filtered by track, difficulty and
   search, with an accessible detail dialog.
   ============================================================ */
(function () {
  "use strict";

  var grid = document.getElementById("challenge-grid");
  var template = document.getElementById("challenge-template");

  if (!grid || !template) {
    return;
  }

  var searchInput = document.getElementById("challenge-search");
  var countValue = document.getElementById("challenge-count-value");
  var countLabel = document.getElementById("challenge-count-label");
  var resetButton = document.getElementById("challenge-reset");
  var emptyState = document.getElementById("challenge-empty");
  var emptyReset = document.getElementById("challenge-empty-reset");
  var trackButtons = Array.prototype.slice.call(document.querySelectorAll("[data-filter-track]"));
  var levelButtons = Array.prototype.slice.call(document.querySelectorAll("[data-filter-level]"));

  var dialog = document.getElementById("challenge-dialog");
  var dialogClose = document.getElementById("dialog-close");
  var copyButton = document.getElementById("dialog-copy");
  var copyText = document.getElementById("dialog-copy-text");

  var DEFAULT_FILTERS = { track: "all", level: "all", query: "" };
  var TOTAL = 8;

  /* Original practice challenges, not official internship tasks. */
  var challenges = [
    {
      id: "clean-the-messy-sales-export",
      title: "Clean the Messy Sales Export",
      track: "data-analytics",
      trackName: "Data Analytics",
      difficulty: "Beginner",
      level: 1,
      time: "2 to 3 hours",
      description: "A small shop has exported six months of sales into one spreadsheet, and the file arrived with duplicate rows, blank cells and three different date formats. Make it usable.",
      outcome: "A clean, well-labelled dataset you can analyse without second-guessing the numbers.",
      brief: "The shop owner wants to know which products actually sell. Before any analysis can start, the export has to be trustworthy. Work through the file row by row, decide what counts as a duplicate, and document every change you make so the owner can follow your reasoning.",
      skills: ["Data cleaning", "Data validation", "Spreadsheet functions", "Documentation"],
      tools: ["Google Sheets", "Microsoft Excel"],
      steps: [
        "Download or recreate a 200 to 500 row sales export with product, date, quantity, unit price and region columns.",
        "Remove exact duplicate rows and flag any near-duplicates for review instead of deleting them silently.",
        "Fill or flag blank cells, then standardise dates, currency and product names.",
        "Add a short change log sheet listing each issue found and how you resolved it.",
        "Finish with a summary row that totals quantity and revenue for the cleaned data."
      ],
      deliverable: "The cleaned spreadsheet plus a one-page change log. Share a view-only link or export both sheets as a PDF.",
      done: [
        "No duplicate rows remain and every remaining row has a complete date and product name.",
        "Dates follow one format and currency values are stored as numbers, not text.",
        "The change log explains every deletion, fill or correction."
      ]
    },
    {
      id: "answer-five-questions-with-pivot-tables",
      title: "Answer Five Questions with Pivot Tables",
      track: "data-analytics",
      trackName: "Data Analytics",
      difficulty: "Intermediate",
      level: 2,
      time: "3 to 4 hours",
      description: "A café has a year of order data and five plain questions from the owner. Build one Pivot Table per question and turn the numbers into short, clear answers.",
      outcome: "A one-page answer sheet backed by five Pivot Tables the owner can refresh.",
      brief: "The café owner does not want a dashboard yet. They want five specific questions answered before the next menu review: which drinks earn the most, which days are busiest, which sizes sell best, how weekend trade compares with weekdays, and how average order value changes by month. Use Pivot Tables rather than manual counting.",
      skills: ["Pivot Tables", "Grouping and sorting", "Calculated fields", "Business interpretation"],
      tools: ["Google Sheets", "Microsoft Excel"],
      steps: [
        "Create or download a sample order table with date, day, item, size, quantity and price.",
        "Build one Pivot Table per question, each on its own labelled block of the sheet.",
        "Group dates by month and sort so the busiest days and top items appear first.",
        "Add a calculated revenue field and check the totals against the raw data.",
        "Write a one-sentence answer under each table, in plain language, with the number that supports it."
      ],
      deliverable: "One answer sheet with five labelled Pivot Tables and five short written answers.",
      done: [
        "Each question has a Pivot Table that can be refreshed when new orders are added.",
        "Revenue totals match the source data.",
        "The written answers name the finding and the figure behind it."
      ]
    },
    {
      id: "build-a-three-chart-insight-story",
      title: "Build a Three-Chart Insight Story",
      track: "data-analytics",
      trackName: "Data Analytics",
      difficulty: "Intermediate",
      level: 2,
      time: "3 to 4 hours",
      description: "Take a small public dataset and explain one clear finding with three charts that build on each other: the context, the pattern and the reason behind it.",
      outcome: "A three-chart story with a headline, short captions and one recommendation.",
      brief: "Charts are only useful when they answer something. Pick a small public dataset you find interesting, choose one question, and design three charts that take a reader from the big picture to the specific insight. Every chart needs a title that states its point, and every axis needs a label.",
      skills: ["Chart selection", "Data storytelling", "Labelling and scale", "Written recommendation"],
      tools: ["Google Sheets", "Microsoft Excel", "Datawrapper (optional)"],
      steps: [
        "Choose a dataset of at least 50 rows and write your question as a single sentence.",
        "Create chart one for context: the overall size, range or trend.",
        "Create chart two for the pattern: the comparison or change that matters most.",
        "Create chart three for the cause or breakdown: the segment that explains the pattern.",
        "Add a headline, one caption per chart and a two-sentence recommendation."
      ],
      deliverable: "A single page or slide containing the three charts, captions and recommendation, exported as a PDF.",
      done: [
        "Each chart has a title that states a finding rather than naming the axis.",
        "Axes, units and sources are labelled.",
        "The recommendation follows logically from the third chart."
      ]
    },
    {
      id: "turn-a-raw-export-into-a-one-page-analysis",
      title: "Turn a Raw Export into a One-Page Analysis",
      track: "data-analytics",
      trackName: "Data Analytics",
      difficulty: "Advanced",
      level: 3,
      time: "5 to 6 hours",
      description: "An end-to-end brief: clean two raw tables, answer a business question, visualise the result and defend your recommendation on one page.",
      outcome: "A portfolio-ready one-page analysis with clean data, working queries, a chart and a recommendation.",
      brief: "A fictional online store wants to know why repeat purchases dropped last quarter. You have two raw tables, customers and orders, and one page to answer. Treat it like a real handover: state your assumptions, show your working and make a recommendation the store could act on next week.",
      skills: ["Data cleaning", "SQL joins", "Aggregation", "Visualisation", "Written analysis"],
      tools: ["SQLite or DB Browser", "Google Sheets", "Microsoft Excel"],
      steps: [
        "Load the customers and orders tables and check row counts, missing values and duplicate IDs.",
        "Write queries that measure repeat purchase rate by month and by acquisition channel.",
        "Identify the segment driving the change and test at least one alternative explanation.",
        "Chart the trend and annotate the point where it changes.",
        "Write the one-page summary: question, method, finding, limitation and recommendation."
      ],
      deliverable: "A one-page PDF or document plus your SQL file or spreadsheet with the queries and cleaned tables.",
      done: [
        "The repeat purchase rate is calculated from the raw data and reconciles with your totals.",
        "Your finding is supported by a chart and at least one query result.",
        "You name one limitation and one specific next step."
      ]
    },
    {
      id: "build-a-personal-profile-card",
      title: "Build a Personal Profile Card",
      track: "web-development",
      trackName: "Web Development",
      difficulty: "Beginner",
      level: 1,
      time: "2 to 3 hours",
      description: "Create a single profile card with a photo, name, role, short bio and three links, then make it look right from 320px to a wide desktop.",
      outcome: "A responsive profile card you can reuse on a portfolio or team page.",
      brief: "Profile cards appear everywhere: team pages, portfolios, author boxes. Build one from scratch with semantic HTML and plain CSS, using a placeholder photo and your own details or a fictional persona. Focus on spacing, readable type and a layout that never breaks.",
      skills: ["Semantic HTML", "CSS box model", "Flexbox", "Responsive design"],
      tools: ["HTML", "CSS", "VS Code", "Browser developer tools"],
      steps: [
        "Write the card in semantic HTML: an article with an image, heading, role, short paragraph and a list of links.",
        "Style the card with a border, radius, padding and a clear type hierarchy.",
        "Lay out the image and text with Flexbox, then let the card stack on narrow screens.",
        "Add hover and focus styles for the links and check the colour contrast.",
        "Test at 320px, 768px and 1440px and fix any overflow."
      ],
      deliverable: "One HTML file and one CSS file, plus screenshots at 320px and 1440px.",
      done: [
        "The card has one main heading, real alt text and no horizontal scrolling at 320px.",
        "Links show a visible keyboard focus state.",
        "Text stays readable without zooming."
      ]
    },
    {
      id: "create-a-responsive-pricing-section",
      title: "Create a Responsive Pricing Section",
      track: "web-development",
      trackName: "Web Development",
      difficulty: "Intermediate",
      level: 2,
      time: "3 to 4 hours",
      description: "Design a three-tier pricing section that compares plans clearly, stacks on mobile without losing the recommended option, and survives a long plan name.",
      outcome: "A pricing section with three plans, a highlighted recommendation and a clean mobile stack.",
      brief: "Pricing sections are a good test of layout discipline: three similar blocks, one clear recommendation and no fragile widths. Build the section for a fictional product, then stress-test it with longer copy, a missing feature and a narrow screen.",
      skills: ["CSS Grid", "Responsive breakpoints", "Visual hierarchy", "Component states"],
      tools: ["HTML", "CSS", "Browser developer tools"],
      steps: [
        "Write the markup for three plan cards with name, price, billing note, feature list and a call to action.",
        "Use CSS Grid to place the plans side by side and highlight the recommended plan with contrast, not colour alone.",
        "Add hover and focus states to each call to action.",
        "Add a long plan name and an extra feature to test the layout, then fix any wrapping issues.",
        "Stack the plans on mobile and keep the recommended plan first in the reading order."
      ],
      deliverable: "The pricing section as an HTML and CSS pair, with a short note on the breakpoints you used.",
      done: [
        "All three plans align at desktop and stack in a sensible order on mobile.",
        "The recommended plan is identified by a label as well as colour.",
        "Buttons remain at least 44px tall and keyboard focus is visible."
      ]
    },
    {
      id: "build-a-filterable-resource-library",
      title: "Build a Filterable Resource Library",
      track: "web-development",
      trackName: "Web Development",
      difficulty: "Intermediate",
      level: 2,
      time: "4 to 5 hours",
      description: "Create a small library of study resources with category filters, a search box and a friendly empty state, all updating without a page reload.",
      outcome: "A working filter and search interface with a result count, clear filters and a no-results state.",
      brief: "Filtering looks simple until the data is uneven. Build a library of at least eight resources across three categories, then add category buttons, a search field and a reset control. Test it with a search that matches nothing and make sure the page still makes sense.",
      skills: ["DOM manipulation", "Array methods", "Event handling", "Empty states", "Accessible controls"],
      tools: ["HTML", "CSS", "JavaScript", "Browser developer tools"],
      steps: [
        "Store the resources in an array of objects with a title, category, description and link.",
        "Render the cards from the array with a reusable function.",
        "Add category buttons that update the active state and filter the list.",
        "Add a search field that matches the title and description, ignoring case.",
        "Show a live result count and an empty state with a clear filters button."
      ],
      deliverable: "The library page plus a short list of the edge cases you tested.",
      done: [
        "Filters and search can be combined and the result count is always accurate.",
        "The active filter is announced with aria-pressed or an equivalent state.",
        "The empty state appears only when nothing matches and clears every filter."
      ]
    },
    {
      id: "add-accessible-form-validation",
      title: "Add Accessible Form Validation",
      track: "web-development",
      trackName: "Web Development",
      difficulty: "Advanced",
      level: 3,
      time: "5 to 6 hours",
      description: "Build a signup form with inline validation that works by keyboard and screen reader, keeps entered values on error and never relies on colour alone.",
      outcome: "An accessible form with inline errors, a success state and a documented keyboard test.",
      brief: "Most forms fail at the first mistake: an error appears in red, the page jumps and nobody knows which field is wrong. Build a signup form that explains each problem in text, links the message to its field, moves focus sensibly and keeps everything the person already typed.",
      skills: ["Form semantics", "Client-side validation", "ARIA live regions", "Focus management", "Error messaging"],
      tools: ["HTML", "CSS", "JavaScript", "Screen reader or accessibility inspector"],
      steps: [
        "Mark up the form with labels, appropriate input types, autocomplete hints and a fieldset where grouping helps.",
        "Validate on submit and on blur, with messages written as instructions rather than blame.",
        "Link each message with aria-describedby and set aria-invalid on the field.",
        "Move focus to the first invalid field on submit and keep every value the person entered.",
        "Test the full flow with the keyboard only and with a screen reader, then document the results."
      ],
      deliverable: "The form page plus a short accessibility test note covering keyboard order, errors and the success state.",
      done: [
        "Every error is announced in text, not just shown in red.",
        "The form can be completed with the keyboard alone.",
        "Submitting valid details shows a clear success message without a reload."
      ]
    }
  ];

  var state = { track: "all", level: "all", query: "" };
  var lastTrigger = null;
  var copyTimer = null;

  function findChallenge(id) {
    for (var i = 0; i < challenges.length; i += 1) {
      if (challenges[i].id === id) {
        return challenges[i];
      }
    }
    return null;
  }

  function normaliseLevel(value) {
    var level = String(value || "").toLowerCase();
    return level === "beginner" || level === "intermediate" || level === "advanced"
      ? level
      : "all";
  }

  function normaliseTrack(value) {
    return value === "data-analytics" || value === "web-development" ? value : "all";
  }

  function matchesFilters(challenge) {
    if (state.track !== "all" && challenge.track !== state.track) {
      return false;
    }

    if (state.level !== "all" && challenge.difficulty.toLowerCase() !== state.level) {
      return false;
    }

    var query = state.query.trim().toLowerCase();

    if (!query) {
      return true;
    }

    var haystack = [
      challenge.title,
      challenge.description,
      challenge.outcome,
      challenge.trackName,
      challenge.difficulty
    ]
      .concat(challenge.skills, challenge.tools)
      .join(" ")
      .toLowerCase();

    return query.split(/\s+/).every(function (term) {
      return haystack.indexOf(term) !== -1;
    });
  }

  function fillList(element, values) {
    element.textContent = "";

    values.forEach(function (value) {
      var item = document.createElement("li");
      item.textContent = value;
      element.appendChild(item);
    });
  }

  function buildCard(challenge) {
    var card = template.content.firstElementChild.cloneNode(true);

    card.classList.add("challenge-card--" + challenge.track);
    card.setAttribute("data-challenge", challenge.id);

    var track = card.querySelector('[data-field="track"]');
    track.textContent = challenge.trackName;
    track.classList.add("challenge-track--" + challenge.track);

    var level = card.querySelector('[data-field="level"]');
    level.classList.add("level--" + challenge.level);

    card.querySelector('[data-field="difficulty"]').textContent = challenge.difficulty;
    card.querySelector('[data-field="title"]').textContent = challenge.title;
    card.querySelector('[data-field="description"]').textContent = challenge.description;
    card.querySelector('[data-field="outcome"]').textContent = challenge.outcome;
    card.querySelector('[data-field="time"]').textContent = challenge.time;
    card.querySelector('[data-field="button-label"]').textContent = ": " + challenge.title;

    var button = card.querySelector("[data-open]");
    button.setAttribute("data-open", challenge.id);
    button.setAttribute("aria-label", "View challenge: " + challenge.title);

    return card;
  }

  function render() {
    var visible = challenges.filter(matchesFilters);
    var fragment = document.createDocumentFragment();

    visible.forEach(function (challenge) {
      fragment.appendChild(buildCard(challenge));
    });

    grid.textContent = "";
    grid.appendChild(fragment);

    grid.hidden = visible.length === 0;
    emptyState.hidden = visible.length !== 0;

    countValue.textContent = String(visible.length);
    countLabel.textContent = "of " + TOTAL + " challenges";

    trackButtons.forEach(function (button) {
      var active = button.getAttribute("data-filter-track") === state.track;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    levelButtons.forEach(function (button) {
      var active = button.getAttribute("data-filter-level") === state.level;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    var isDefault =
      state.track === "all" && state.level === "all" && state.query.trim() === "";

    resetButton.setAttribute("aria-disabled", isDefault ? "true" : "false");
  }

  function updateUrl() {
    if (!window.history || !window.history.replaceState) {
      return;
    }

    try {
      var url = new URL(window.location.href);
      var query = state.query.trim();

      if (state.track === "all") {
        url.searchParams.delete("track");
      } else {
        url.searchParams.set("track", state.track);
      }

      if (state.level === "all") {
        url.searchParams.delete("level");
      } else {
        url.searchParams.set("level", state.level);
      }

      if (!query) {
        url.searchParams.delete("q");
      } else {
        url.searchParams.set("q", query);
      }

      if (dialog && dialog.open && dialog.getAttribute("data-challenge-id")) {
        url.searchParams.set("challenge", dialog.getAttribute("data-challenge-id"));
      } else {
        url.searchParams.delete("challenge");
      }

      window.history.replaceState(null, "", url.pathname + url.search + url.hash);
    } catch (error) {
      /* Filters keep working when the URL cannot be updated. */
    }
  }

  function readInitialState() {
    try {
      var params = new URLSearchParams(window.location.search);

      state.track = normaliseTrack(params.get("track"));
      state.level = normaliseLevel(params.get("level"));
      state.query = params.get("q") || "";

      if (searchInput) {
        searchInput.value = state.query;
      }
    } catch (error) {
      state.track = "all";
      state.level = "all";
      state.query = "";
    }
  }

  function setDialogContent(challenge) {
    var track = document.getElementById("dialog-track");
    var level = document.getElementById("dialog-level");

    track.textContent = challenge.trackName;
    track.className = "challenge-track challenge-track--" + challenge.track;

    level.className = "level level--" + challenge.level;
    document.getElementById("dialog-difficulty").textContent = challenge.difficulty;

    document.getElementById("dialog-title").textContent = challenge.title;
    document.getElementById("dialog-summary").textContent = challenge.description;
    document.getElementById("dialog-track-name").textContent = challenge.trackName;
    document.getElementById("dialog-level-name").textContent = challenge.difficulty;
    document.getElementById("dialog-time").textContent = challenge.time;
    document.getElementById("dialog-brief").textContent = challenge.brief;
    document.getElementById("dialog-deliverable").textContent = challenge.deliverable;

    fillList(document.getElementById("dialog-skills"), challenge.skills);
    fillList(document.getElementById("dialog-tools"), challenge.tools);
    fillList(document.getElementById("dialog-done"), challenge.done);

    var steps = document.getElementById("dialog-steps");
    steps.textContent = "";

    challenge.steps.forEach(function (step) {
      var item = document.createElement("li");
      item.textContent = step;
      steps.appendChild(item);
    });
  }

  function openChallenge(id, trigger) {
    var challenge = findChallenge(id);

    if (!challenge || !dialog) {
      return;
    }

    lastTrigger = trigger || document.activeElement;
    setDialogContent(challenge);
    dialog.setAttribute("data-challenge-id", challenge.id);

    if (typeof dialog.showModal === "function") {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      dialog.setAttribute("open", "");
    }

    document.body.classList.add("dialog-open");

    if (dialogClose) {
      dialogClose.focus();
    }

    if (copyText) {
      copyText.textContent = "Copy link to this challenge";
    }

    if (copyButton) {
      copyButton.classList.remove("is-copied");
    }

    updateUrl();
  }

  function closeChallenge() {
    if (!dialog || !dialog.open) {
      return;
    }

    dialog.close();
  }

  function resetFilters() {
    state.track = "all";
    state.level = "all";
    state.query = "";

    if (searchInput) {
      searchInput.value = "";
    }

    render();
    updateUrl();
  }

  function setTrackFilter(value) {
    var next = normaliseTrack(value);

    if (state.track === next) {
      return;
    }

    state.track = next;
    render();
    updateUrl();
  }

  function setLevelFilter(value) {
    var next = normaliseLevel(value);

    if (state.level === next) {
      return;
    }

    state.level = next;
    render();
    updateUrl();
  }

  trackButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      setTrackFilter(button.getAttribute("data-filter-track"));
    });
  });

  levelButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      setLevelFilter(button.getAttribute("data-filter-level"));
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      state.query = searchInput.value;
      render();
      updateUrl();
    });
  }

  resetButton.addEventListener("click", function () {
    if (resetButton.getAttribute("aria-disabled") === "true") {
      return;
    }

    resetFilters();
    resetButton.focus();
  });

  if (emptyReset) {
    emptyReset.addEventListener("click", function () {
      resetFilters();
    });
  }

  grid.addEventListener("click", function (event) {
    var button = event.target.closest("[data-open]");

    if (!button || !grid.contains(button)) {
      return;
    }

    openChallenge(button.getAttribute("data-open"), button);
  });

  if (dialog) {
    if (dialogClose) {
      dialogClose.addEventListener("click", closeChallenge);
    }

    Array.prototype.forEach.call(dialog.querySelectorAll("[data-close]"), function (button) {
      button.addEventListener("click", closeChallenge);
    });

    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) {
        closeChallenge();
      }
    });

    dialog.addEventListener("close", function () {
      document.body.classList.remove("dialog-open");
      updateUrl();

      if (lastTrigger && document.contains(lastTrigger)) {
        lastTrigger.focus();
      }

      lastTrigger = null;
    });

    if (copyButton) {
      copyButton.addEventListener("click", function () {
        var url = window.location.href;

        function showCopied(message) {
          if (copyText) {
            copyText.textContent = message;
          }
          copyButton.classList.add("is-copied");

          window.clearTimeout(copyTimer);
          copyTimer = window.setTimeout(function () {
            if (copyText) {
              copyText.textContent = "Copy link to this challenge";
            }
            copyButton.classList.remove("is-copied");
          }, 2600);
        }

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url).then(function () {
            showCopied("Link copied");
          }).catch(function () {
            showCopied("Copy the address bar link");
          });
          return;
        }

        showCopied("Copy the address bar link");
      });
    }
  }

  readInitialState();
  render();

  try {
    var params = new URLSearchParams(window.location.search);
    var requested = params.get("challenge");

    if (requested) {
      openChallenge(requested, null);
    }
  } catch (error) {
    /* Deep links are a convenience; the library still works without them. */
  }
})();

/* ============================================================
   Intern Dashboard (Task 6)
   Task data, progress tracking, filters and task detail dialog.
   ============================================================ */
(function () {
  "use strict";

  var grid = document.getElementById("task-grid");
  var template = document.getElementById("dash-task-template");

  if (!grid || !template) {
    return;
  }

  var STORAGE_KEY = "techbridgeDashboardProgress.v1";
  var TOTAL_TASKS = 8;

  /* Official TechBridge task titles and descriptions. The focus and
     evidence fields are guidance for this practice dashboard. */
  var tasks = [
    {
      number: 1,
      title: "Build the TechBridge Homepage",
      day: 1,
      description: "Create the first version of the TechBridge website using HTML and CSS.",
      difficulty: "Beginner",
      level: 1,
      focus: [
        "Page structure, header and footer",
        "Responsive layout with flexible units",
        "Typography, colour and button consistency"
      ],
      evidence: "A working homepage with a clear hero, readable sections and navigation that still works on a small screen."
    },
    {
      number: 2,
      title: "Build the TechBridge Programs Experience",
      day: 4,
      description: "Create a Programs experience that presents TechBridge's available learning programs.",
      difficulty: "Beginner → Intermediate",
      level: 2,
      focus: [
        "Program cards and comparison content",
        "Clear calls to action",
        "Responsive multi-column layout"
      ],
      evidence: "A Programs page that explains each pathway and guides visitors toward the application form."
    },
    {
      number: 3,
      title: "Build the Internship Tasks Experience",
      day: 8,
      description: "Create an interface that presents the TechBridge internship tasks and helps users understand the internship journey.",
      difficulty: "Beginner → Intermediate",
      level: 2,
      focus: [
        "Task journey and day labels",
        "Difficulty cues without clutter",
        "Readable cards on every screen size"
      ],
      evidence: "A Tasks page that shows all eight tasks, their timing and what each one involves."
    },
    {
      number: 4,
      title: "Build an Interactive Internship Roadmap",
      day: 11,
      description: "Use JavaScript to allow visitors to switch between the Data Analytics and Web Development internship tracks.",
      difficulty: "Beginner → Intermediate",
      level: 2,
      focus: [
        "Track switching with JavaScript",
        "Keyboard support for the track controls",
        "URL state and saved progress"
      ],
      evidence: "A roadmap where both tracks can be explored without a page refresh and progress survives a reload."
    },
    {
      number: 5,
      title: "Build the Intern Registration Experience",
      day: 15,
      description: "Create a professional registration and onboarding interface for TechBridge interns.",
      difficulty: "Intermediate",
      level: 3,
      focus: [
        "Form layout and field grouping",
        "Inline validation and error messages",
        "Onboarding copy that sets expectations"
      ],
      evidence: "A registration screen with labelled fields, helpful validation and a clear confirmation state."
    },
    {
      number: 6,
      title: "Build the Task Submission System",
      day: 19,
      description: "Create an interface through which interns can prepare and submit their task work.",
      difficulty: "Intermediate",
      level: 3,
      focus: [
        "Submission fields and file selection",
        "Draft and confirmation states",
        "Feedback when something is missing"
      ],
      evidence: "A submission interface that lets an intern attach work, review the details and confirm the handoff."
    },
    {
      number: 7,
      title: "Build the Intern Dashboard",
      day: 22,
      description: "Create a dashboard where an intern can view their profile, progress, tasks and submissions.",
      difficulty: "Intermediate",
      level: 3,
      focus: [
        "Progress summary and task list",
        "Status filters and task details",
        "Saving progress in the browser"
      ],
      evidence: "A dashboard that shows completed, current and upcoming work and updates without a reload."
    },
    {
      number: 8,
      title: "Build the Complete TechBridge Internship Platform",
      day: 26,
      description: "Combine the different components created during the internship into a complete TechBridge platform.",
      difficulty: "Intermediate",
      level: 3,
      focus: [
        "Shared navigation across every page",
        "Final responsive and accessibility checks",
        "One consistent design system"
      ],
      evidence: "A complete platform where every page is linked, visually consistent and usable on desktop, tablet and mobile."
    }
  ];

  var STATUS_LABELS = {
    "completed": "Completed",
    "in-progress": "In progress",
    "not-started": "Not started"
  };

  function createDefaultStatuses() {
    var defaults = {};
    tasks.forEach(function (task) {
      if (task.number <= 5) {
        defaults[task.number] = "completed";
      } else if (task.number === 6) {
        defaults[task.number] = "in-progress";
      } else {
        defaults[task.number] = "not-started";
      }
    });
    return defaults;
  }

  var storageAvailable = (function () {
    try {
      var testKey = "__techbridgeDashboardTest";
      window.localStorage.setItem(testKey, "1");
      window.localStorage.removeItem(testKey);
      return true;
    } catch (error) {
      return false;
    }
  })();

  function readStatuses() {
    var fallback = createDefaultStatuses();
    if (!storageAvailable) {
      return fallback;
    }

    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return fallback;
      }
      var parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object") {
        return fallback;
      }
      var valid = {};
      var isValid = tasks.every(function (task) {
        var value = parsed[String(task.number)];
        if (value === "completed" || value === "in-progress" || value === "not-started") {
          valid[task.number] = value;
          return true;
        }
        return false;
      });
      return isValid ? valid : fallback;
    } catch (error) {
      return fallback;
    }
  }

  var statuses = readStatuses();
  var filter = "all";
  var query = "";
  var activeTaskNumber = null;
  var opener = null;
  var toastTimer = null;

  var searchInput = document.getElementById("task-search");
  var filterButtons = Array.prototype.slice.call(document.querySelectorAll("[data-status-filter]"));
  var filterReset = document.getElementById("filter-reset");
  var emptyReset = document.getElementById("empty-reset");
  var emptyState = document.getElementById("task-empty");
  var taskCount = document.getElementById("task-count");
  var progressCard = document.getElementById("progress-card");
  var progressCompleted = document.getElementById("progress-completed");
  var statCompleted = document.getElementById("stat-completed");
  var statRemaining = document.getElementById("stat-remaining");
  var statPercent = document.getElementById("stat-percent");
  var progressBar = document.getElementById("dashboard-progress-bar");
  var progressFill = document.getElementById("dashboard-progress-fill");
  var barLabel = document.getElementById("bar-label");
  var progressPercent = document.getElementById("progress-percent");
  var progressMessage = document.getElementById("progress-message");
  var completeBanner = document.getElementById("all-complete");
  var profilePercent = document.getElementById("profile-percent");
  var profileBar = document.getElementById("profile-bar");
  var currentTaskLabel = document.getElementById("current-task-label");
  var currentTaskTitle = document.getElementById("current-task-title");
  var currentTaskNumber = document.getElementById("current-task-number");
  var currentTaskDay = document.getElementById("current-task-day");
  var currentTaskLevel = document.getElementById("current-task-level");
  var internshipStatus = document.getElementById("internship-status");
  var toast = document.getElementById("dashboard-toast");
  var dialog = document.getElementById("task-dialog");
  var dialogStatus = document.getElementById("task-dialog-status");
  var dialogStatusLabel = document.getElementById("task-dialog-status-label");
  var dialogLevel = document.getElementById("task-dialog-level");
  var dialogDifficulty = document.getElementById("task-dialog-difficulty");
  var dialogTitle = document.getElementById("task-dialog-title");
  var dialogDescription = document.getElementById("task-dialog-description");
  var dialogNumber = document.getElementById("task-dialog-number");
  var dialogDay = document.getElementById("task-dialog-day");
  var dialogStatusText = document.getElementById("task-dialog-status-text");
  var dialogFocus = document.getElementById("task-dialog-focus");
  var dialogEvidence = document.getElementById("task-dialog-evidence");
  var dialogAction = document.getElementById("task-dialog-action");
  var dialogClose = document.getElementById("task-dialog-close");
  var dialogDone = document.getElementById("task-dialog-done");
  var countAll = document.getElementById("count-all");
  var countCompleted = document.getElementById("count-completed");
  var countInProgress = document.getElementById("count-in-progress");
  var countNotStarted = document.getElementById("count-not-started");
  var continueButtons = Array.prototype.slice.call(document.querySelectorAll("[data-continue]"));

  function getTask(number) {
    return tasks.filter(function (task) {
      return task.number === number;
    })[0];
  }

  function countByStatus(status) {
    return tasks.filter(function (task) {
      return statuses[task.number] === status;
    }).length;
  }

  function getCompletedCount() {
    return countByStatus("completed");
  }

  function getMetrics() {
    var completed = getCompletedCount();
    var remaining = TOTAL_TASKS - completed;
    var percent = Math.round((completed / TOTAL_TASKS) * 1000) / 10;
    return {
      completed: completed,
      remaining: remaining,
      percent: percent,
      percentText: Number.isInteger(percent) ? percent + "%" : percent.toFixed(1) + "%"
    };
  }

  function saveStatuses() {
    if (!storageAvailable) {
      return;
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(statuses));
    } catch (error) {
      storageAvailable = false;
    }
  }

  function showToast(message) {
    if (!toast) {
      return;
    }
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 4200);
  }

  function setStatusClass(element, status) {
    element.classList.remove("is-completed", "is-in-progress", "is-not-started");
    element.classList.add("is-" + status);
  }

  function setLevel(element, level) {
    element.classList.remove("level--1", "level--2", "level--3", "level--4");
    element.classList.add("level--" + level);
  }

  function renderProgress() {
    var metrics = getMetrics();
    var completed = metrics.completed;
    var remaining = metrics.remaining;

    progressCompleted.textContent = completed;
    statCompleted.textContent = completed;
    statRemaining.textContent = remaining;
    statPercent.textContent = metrics.percentText;
    progressPercent.textContent = metrics.percentText;
    profilePercent.textContent = metrics.percentText;
    barLabel.textContent = completed + " of " + TOTAL_TASKS + " tasks completed";
    progressMessage.textContent = remaining === 0
      ? "All tasks complete"
      : remaining === 1
        ? "1 task remaining"
        : remaining + " tasks remaining";

    progressFill.style.width = metrics.percent + "%";
    profileBar.style.width = metrics.percent + "%";

    progressBar.setAttribute("aria-valuenow", String(completed));
    progressBar.setAttribute("aria-valuetext", completed + " of " + TOTAL_TASKS + " tasks completed");

    completeBanner.hidden = completed !== TOTAL_TASKS;
    progressCard.classList.toggle("is-complete", completed === TOTAL_TASKS);
    internshipStatus.textContent = completed === TOTAL_TASKS ? "Completed" : "In progress";

    countAll.textContent = tasks.length;
    countCompleted.textContent = countByStatus("completed");
    countInProgress.textContent = countByStatus("in-progress");
    countNotStarted.textContent = countByStatus("not-started");
  }

  function renderProfile() {
    var current = tasks.filter(function (task) {
      return statuses[task.number] === "in-progress";
    })[0];
    var label = "Current task";

    if (!current) {
      current = tasks.filter(function (task) {
        return statuses[task.number] === "not-started";
      })[0];
      label = "Next up";
    }

    if (current) {
      currentTaskLabel.textContent = label;
      currentTaskTitle.textContent = current.title;
      currentTaskNumber.textContent = "Task 0" + current.number;
      currentTaskDay.textContent = "Day " + current.day;
      currentTaskLevel.textContent = current.difficulty;
      continueButtons.forEach(function (button) {
        button.textContent = label === "Current task" ? "Continue current task" : "Start next task";
        var arrow = document.createElement("span");
        arrow.className = "btn__arrow";
        arrow.setAttribute("aria-hidden", "true");
        arrow.textContent = "→";
        button.appendChild(arrow);
      });
      return;
    }

    currentTaskLabel.textContent = "Program complete";
    currentTaskTitle.textContent = "Every task is complete.";
    currentTaskNumber.textContent = "8 of 8 tasks";
    currentTaskDay.textContent = "Build finished";
    currentTaskLevel.textContent = "Portfolio ready";
    continueButtons.forEach(function (button) {
      button.textContent = "Review completed tasks";
      var arrow = document.createElement("span");
      arrow.className = "btn__arrow";
      arrow.setAttribute("aria-hidden", "true");
      arrow.textContent = "→";
      button.appendChild(arrow);
    });
  }

  function matchesFilter(task) {
    if (filter !== "all" && statuses[task.number] !== filter) {
      return false;
    }

    if (!query) {
      return true;
    }

    var haystack = (task.title + " " + task.description + " Task " + task.number).toLowerCase();
    return haystack.indexOf(query) !== -1;
  }

  function makeButtonFocusable(number) {
    var button = grid.querySelector('[data-number="' + number + '"] [data-toggle]');
    if (button) {
      button.focus();
      return;
    }
    var activeChip = document.querySelector('[data-status-filter="' + filter + '"]');
    if (activeChip) {
      activeChip.focus();
    }
  }

  function toggleStatus(number, source) {
    var task = getTask(number);
    if (!task) {
      return;
    }

    if (statuses[number] === "completed") {
      statuses[number] = "in-progress";
      showToast("Task " + number + " reopened and marked in progress.");
    } else {
      statuses[number] = "completed";
      showToast("Task " + number + " marked complete. " + getCompletedCount() + " of " + TOTAL_TASKS + " done.");
    }

    saveStatuses();
    render();

    if (source === "card") {
      makeButtonFocusable(number);
    }

    if (dialog.open && activeTaskNumber === number) {
      populateDialog(task);
    }
  }

  function render() {
    renderProgress();
    renderProfile();

    var visible = tasks.filter(matchesFilter);
    grid.textContent = "";

    visible.forEach(function (task) {
      var card = template.content.firstElementChild.cloneNode(true);
      var status = statuses[task.number];

      card.setAttribute("data-number", String(task.number));
      card.setAttribute("data-status", status);
      card.querySelector('[data-field="number"]').textContent = "Task 0" + task.number;
      card.querySelector('[data-field="title"]').textContent = task.title;
      card.querySelector('[data-field="description"]').textContent = task.description;
      card.querySelector('[data-field="day"]').textContent = "Introduced on Day " + task.day;
      card.querySelector('[data-field="difficulty"]').textContent = task.difficulty;
      card.querySelector('[data-field="view-label"]').textContent = task.title;
      card.querySelector('[data-field="status-label"]').textContent = STATUS_LABELS[status];

      var statusBadge = card.querySelector('[data-field="status"]');
      setStatusClass(statusBadge, status);
      setLevel(card.querySelector('[data-field="level"]'), task.level);

      var toggle = card.querySelector("[data-toggle]");
      toggle.textContent = status === "completed" ? "Reopen" : "Mark complete";
      toggle.setAttribute("aria-label", (status === "completed" ? "Reopen " : "Mark complete: ") + task.title);
      toggle.setAttribute("data-toggle-number", String(task.number));

      card.querySelector("[data-view]").addEventListener("click", function (event) {
        openTask(task.number, event.currentTarget);
      });

      toggle.addEventListener("click", function () {
        toggleStatus(task.number, "card");
      });

      grid.appendChild(card);
    });

    grid.hidden = visible.length === 0;
    emptyState.hidden = visible.length !== 0;
    taskCount.innerHTML = "<strong>" + visible.length + "</strong> of " + TOTAL_TASKS + " tasks";

    filterButtons.forEach(function (button) {
      var isActive = button.getAttribute("data-status-filter") === filter;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    var filtersAreDefault = filter === "all" && query === "";
    filterReset.setAttribute("aria-disabled", String(filtersAreDefault));
  }

  function populateDialog(task) {
    var status = statuses[task.number];

    dialogStatusLabel.textContent = STATUS_LABELS[status];
    setStatusClass(dialogStatus, status);
    dialogDifficulty.textContent = task.difficulty;
    setLevel(dialogLevel, task.level);
    dialogTitle.textContent = task.title;
    dialogDescription.textContent = task.description;
    dialogNumber.textContent = "Task 0" + task.number;
    dialogDay.textContent = "Day " + task.day;
    dialogStatusText.textContent = STATUS_LABELS[status];

    dialogFocus.textContent = "";
    task.focus.forEach(function (item) {
      var li = document.createElement("li");
      li.textContent = item;
      dialogFocus.appendChild(li);
    });
    dialogEvidence.textContent = task.evidence;

    dialogAction.textContent = status === "completed" ? "Reopen task" : "Mark as completed";
    dialogAction.setAttribute("data-number", String(task.number));
  }

  function openTask(number, trigger) {
    var task = getTask(number);
    if (!task) {
      return;
    }
    activeTaskNumber = number;
    opener = trigger || null;
    populateDialog(task);
    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
    document.body.classList.add("dialog-open");
    dialogClose.focus();
  }

  function closeDialog() {
    if (typeof dialog.close === "function") {
      dialog.close();
    } else {
      dialog.removeAttribute("open");
      document.body.classList.remove("dialog-open");
      restoreFocus();
    }
  }

  function restoreFocus() {
    if (opener && document.documentElement.contains(opener)) {
      opener.focus();
      return;
    }
    if (activeTaskNumber !== null) {
      var view = grid.querySelector('[data-number="' + activeTaskNumber + '"] [data-view]');
      if (view) {
        view.focus();
        return;
      }
    }
    var heading = document.getElementById("tasks-title");
    if (heading) {
      heading.setAttribute("tabindex", "-1");
      heading.focus();
    }
  }

  function resetFilters() {
    filter = "all";
    query = "";
    if (searchInput) {
      searchInput.value = "";
    }
    render();
  }

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      filter = button.getAttribute("data-status-filter");
      render();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      query = searchInput.value.trim().toLowerCase();
      render();
    });
  }

  if (filterReset) {
    filterReset.addEventListener("click", function () {
      if (filterReset.getAttribute("aria-disabled") === "true") {
        return;
      }
      resetFilters();
    });
  }

  if (emptyReset) {
    emptyReset.addEventListener("click", function () {
      resetFilters();
      if (searchInput) {
        searchInput.focus();
      }
    });
  }

  var resetButton = document.getElementById("progress-reset");
  if (resetButton) {
    resetButton.addEventListener("click", function () {
      var shouldReset = window.confirm("Reset the demo progress for all eight tasks?");
      if (!shouldReset) {
        return;
      }
      statuses = createDefaultStatuses();
      saveStatuses();
      render();
      showToast("Demo progress reset to the starting state.");
    });
  }

  continueButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var current = tasks.filter(function (task) {
        return statuses[task.number] === "in-progress";
      })[0];

      if (!current) {
        current = tasks.filter(function (task) {
          return statuses[task.number] === "not-started";
        })[0];
      }

      if (current) {
        openTask(current.number, button);
        return;
      }

      filter = "completed";
      query = "";
      if (searchInput) {
        searchInput.value = "";
      }
      render();
      var tasksSection = document.getElementById("tasks");
      if (tasksSection) {
        tasksSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      var activeChip = document.querySelector('[data-status-filter="completed"]');
      if (activeChip) {
        activeChip.focus();
      }
    });
  });

  dialogAction.addEventListener("click", function () {
    if (activeTaskNumber !== null) {
      toggleStatus(activeTaskNumber, "dialog");
    }
  });

  dialogClose.addEventListener("click", closeDialog);
  dialogDone.addEventListener("click", closeDialog);

  dialog.addEventListener("close", function () {
    document.body.classList.remove("dialog-open");
    restoreFocus();
    activeTaskNumber = null;
    opener = null;
  });

  render();
})();

/* ============================================================
   Modern Web Technologies explorer (Task 6)
   Tabs update one panel with information and official links.
   ============================================================ */
(function () {
  "use strict";

  var tabs = Array.prototype.slice.call(document.querySelectorAll(".tech-tab"));
  var panel = document.getElementById("tech-panel");
  var panelBody = document.getElementById("tech-panel-body");

  if (!tabs.length || !panel || !panelBody) {
    return;
  }

  var technologies = {
    nextjs: {
      eyebrow: "React framework",
      title: "Next.js",
      summary: "Next.js is an open-source React framework for building full-stack web applications. It adds routing, rendering and data fetching on top of React, so a team can build the interface and the server side in one project.",
      uses: [
        "Marketing sites and content platforms that need fast loads and strong search visibility",
        "Full-stack products with server-rendered pages, API routes or server actions",
        "React applications that need file-based routing and built-in image optimisation"
      ],
      link: "https://nextjs.org/",
      linkLabel: "Learn more at nextjs.org"
    },
    vue: {
      eyebrow: "Progressive framework",
      title: "Vue.js",
      summary: "Vue.js is a progressive JavaScript framework for building user interfaces. It is known for an approachable API, reactive data and single-file components that keep markup, styles and logic together.",
      uses: [
        "Interactive dashboards and single-page applications",
        "Adding interactivity to a page that is already mostly built",
        "Teams that want a light framework with clear templates"
      ],
      link: "https://vuejs.org/",
      linkLabel: "Learn more at vuejs.org"
    },
    angular: {
      eyebrow: "TypeScript framework",
      title: "Angular",
      summary: "Angular is a TypeScript-based framework maintained by Google for building large, structured web applications. It includes routing, forms, dependency injection and testing tools in one platform.",
      uses: [
        "Enterprise single-page applications with many screens",
        "Products with complex forms, shared state and strict structure",
        "Teams that prefer a full framework with built-in tooling"
      ],
      link: "https://angular.dev/",
      linkLabel: "Learn more at angular.dev"
    },
    backend: {
      eyebrow: "Server side",
      title: "Backend development",
      summary: "Backend development is the server-side part of a web application. It handles data storage, authentication, business rules and the APIs that the frontend calls. The frontend sends a request, the backend validates it, talks to a database and returns a response, usually as JSON.",
      technologies: [
        {
          name: "Node.js",
          summary: "A JavaScript runtime that runs server code outside the browser. Often used for APIs, real-time features and build tooling.",
          link: "https://nodejs.org/"
        },
        {
          name: "Express.js",
          summary: "A small Node.js web framework for routing and HTTP middleware. Often used to build REST APIs.",
          link: "https://expressjs.com/"
        },
        {
          name: "Django",
          summary: "A batteries-included Python framework with an admin panel, ORM and authentication. Often used for data-driven sites.",
          link: "https://www.djangoproject.com/"
        },
        {
          name: "Flask",
          summary: "A lightweight Python framework for small services and APIs. Often chosen when a team wants control over the stack.",
          link: "https://flask.palletsprojects.com/"
        },
        {
          name: "Laravel",
          summary: "A PHP framework with routing, database tools and a large ecosystem. Often used for business applications.",
          link: "https://laravel.com/"
        },
        {
          name: ".NET",
          summary: "A Microsoft platform for building web, desktop and cloud applications with C# and related languages.",
          link: "https://dotnet.microsoft.com/"
        }
      ],
      link: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/First_steps/Introduction",
      linkLabel: "Read an introduction to the server side"
    }
  };

  function renderTech(id) {
    var tech = technologies[id];
    if (!tech) {
      return;
    }

    var html = '<p class="tech-panel__eyebrow">' + tech.eyebrow + "</p>" +
      "<h3>" + tech.title + "</h3>" +
      "<p>" + tech.summary + "</p>";

    if (tech.technologies) {
      html += "<h4>Backend technologies to know</h4><div class=\"tech-backend-grid\">";
      tech.technologies.forEach(function (item) {
        html += '<article class="tech-backend-card">' +
          "<h4>" + item.name + "</h4>" +
          "<p>" + item.summary + "</p>" +
          '<a href="' + item.link + '" target="_blank" rel="noopener noreferrer">Official site' +
          '<span class="sr-only"> for ' + item.name + " (opens in a new tab)</span>" +
          "<span aria-hidden=\"true\"> →</span></a>" +
          "</article>";
      });
      html += "</div>";
      html += '<div class="tech-connection"><p><strong>How it connects to the frontend.</strong> The frontend sends requests to the backend over HTTPS. The backend checks the request, reads or writes data, applies the business rules and returns a response. Keeping the two layers separate lets each side change without breaking the other.</p></div>';
    } else {
      html += "<h4>Common uses</h4><ul class=\"tech-uses\">";
      tech.uses.forEach(function (use) {
        html += "<li>" + use + "</li>";
      });
      html += "</ul>";
      html += '<a class="tech-link" href="' + tech.link + '" target="_blank" rel="noopener noreferrer">' +
        tech.linkLabel +
        '<span class="sr-only"> (opens in a new tab)</span>' +
        "<span aria-hidden=\"true\"> →</span></a>";
    }

    panelBody.innerHTML = html;
    panel.setAttribute("aria-labelledby", "tech-tab-" + id);

    tabs.forEach(function (tab) {
      var isActive = tab.getAttribute("data-tech") === id;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
      tab.setAttribute("tabindex", isActive ? "0" : "-1");
    });
  }

  function activateTab(tab, moveFocus) {
    renderTech(tab.getAttribute("data-tech"));
    if (moveFocus) {
      tab.focus();
    }
  }

  tabs.forEach(function (tab, index) {
    tab.addEventListener("click", function () {
      activateTab(tab, false);
    });

    tab.addEventListener("keydown", function (event) {
      var nextIndex = null;

      if (event.key === "ArrowRight") {
        nextIndex = (index + 1) % tabs.length;
      } else if (event.key === "ArrowLeft") {
        nextIndex = (index - 1 + tabs.length) % tabs.length;
      } else if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = tabs.length - 1;
      }

      if (nextIndex !== null) {
        event.preventDefault();
        activateTab(tabs[nextIndex], true);
      }
    });
  });

  renderTech("nextjs");
})();
