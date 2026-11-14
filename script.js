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
