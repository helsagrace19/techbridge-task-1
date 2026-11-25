"use strict";

const path = require("path");
const express = require("express");
const store = require("../lib/task-store");

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const root = path.join(__dirname, "..");

app.disable("x-powered-by");
app.use(express.json({ limit: "16kb" }));

/* The dashboard is served from the same origin, but these headers let a
   developer open the frontend from another port or from file:// while
   testing the API. */
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }
  next();
});

if (process.env.API_LOG) {
  app.use((req, res, next) => {
    const started = Date.now();
    res.on("finish", () => {
      console.log(`${req.method} ${req.originalUrl} ${res.statusCode} ${Date.now() - started}ms`);
    });
    next();
  });
}

function parseId(raw) {
  const id = Number(raw);
  return Number.isInteger(id) && id > 0 ? id : null;
}

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "techbridge-task-api",
    tasks: store.list().length,
    completed: store.countByStatus("completed"),
    uptime: Math.round(process.uptime())
  });
});

app.get("/api/tasks", (req, res) => {
  res.json(store.list());
});

app.get("/api/tasks/:id", (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) {
    res.status(400).json({ error: "Task id must be a positive integer." });
    return;
  }

  const task = store.get(id);
  if (!task) {
    res.status(404).json({ error: `Task ${id} was not found.` });
    return;
  }

  res.json(task);
});

app.put("/api/tasks/:id", (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) {
    res.status(400).json({ error: "Task id must be a positive integer." });
    return;
  }

  const status = req.body && req.body.status;
  if (!store.isStatus(status)) {
    res.status(400).json({
      error: "Status must be completed, in-progress or not-started."
    });
    return;
  }

  const result = store.updateStatus(id, status);
  if (result.error === "not-found") {
    res.status(404).json({ error: `Task ${id} was not found.` });
    return;
  }

  res.json(result.task);
});

app.use("/api", (req, res) => {
  res.status(404).json({ error: "API endpoint not found." });
});

app.use((error, req, res, next) => {
  if (error.type === "entity.parse.failed") {
    res.status(400).json({ error: "The request body is not valid JSON." });
    return;
  }
  next(error);
});

/* Keep the server-side files out of the static frontend. */
app.use((req, res, next) => {
  if (
    /^\/(?:backend|lib|node_modules)(?:\/|$)/.test(req.path) ||
    req.path === "/package.json" ||
    req.path === "/package-lock.json" ||
    req.path === "/vercel.json"
  ) {
    res.status(404).type("text").send("Not found");
    return;
  }
  next();
});

app.use(express.static(root, { extensions: ["html"] }));

app.use((req, res) => {
  res.status(404).type("text").send("Page not found. Start again from /index.html.");
});

const server = app.listen(PORT, () => {
  console.log(`TechBridge Task API running at http://localhost:${PORT}`);
  console.log(`Dashboard: http://localhost:${PORT}/dashboard.html`);
});

function shutdown() {
  server.close(() => process.exit(0));
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
