"use strict";

const store = require("../lib/task-store");

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.end(JSON.stringify(body));
}

/* Vercel's standalone Node runtime does not always populate req.query
   for a catch-all route, so fall back to the request URL. */
function pathSegments(req) {
  const raw = req.query && req.query.path;
  if (Array.isArray(raw) && raw.length) {
    return raw.map(String);
  }
  if (typeof raw === "string" && raw) {
    return [raw];
  }

  const rawUrl = req.url || "";
  const queryIndex = rawUrl.indexOf("?");
  const pathname = queryIndex === -1 ? rawUrl : rawUrl.slice(0, queryIndex);
  const parts = pathname.split("/").filter(Boolean).map((part) => {
    try {
      return decodeURIComponent(part);
    } catch (error) {
      return part;
    }
  });

  if (parts[0] === "api") {
    parts.shift();
  }
  return parts;
}

async function readJson(req) {
  if (req.body !== undefined && req.body !== null) {
    if (Buffer.isBuffer(req.body)) {
      const raw = req.body.toString("utf8").trim();
      return raw ? JSON.parse(raw) : {};
    }
    if (typeof req.body === "string") {
      return req.body.trim() ? JSON.parse(req.body) : {};
    }
    return req.body;
  }

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  const raw = Buffer.concat(chunks).toString("utf8").trim();
  return raw ? JSON.parse(raw) : {};
}

module.exports = async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, PUT, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.end();
    return;
  }

  const segments = pathSegments(req);

  if (segments[0] === "health" && segments.length === 1) {
    if (req.method !== "GET") {
      send(res, 405, { error: "Method not allowed." });
      return;
    }
    send(res, 200, {
      status: "ok",
      service: "techbridge-task-api",
      tasks: store.list().length,
      completed: store.countByStatus("completed"),
      uptime: Math.round(process.uptime())
    });
    return;
  }

  if (segments[0] === "tasks") {
    if (segments.length === 1) {
      if (req.method !== "GET") {
        send(res, 405, { error: "Method not allowed. Use GET or PUT." });
        return;
      }
      send(res, 200, store.list());
      return;
    }

    if (segments.length === 2) {
      const id = Number(segments[1]);
      if (!Number.isInteger(id) || id <= 0) {
        send(res, 400, { error: "Task id must be a positive integer." });
        return;
      }

      if (req.method === "GET") {
        const task = store.get(id);
        if (!task) {
          send(res, 404, { error: `Task ${id} was not found.` });
          return;
        }
        send(res, 200, task);
        return;
      }

      if (req.method === "PUT") {
        let body;
        try {
          body = await readJson(req);
        } catch (error) {
          send(res, 400, { error: "The request body is not valid JSON." });
          return;
        }

        if (!store.isStatus(body.status)) {
          send(res, 400, {
            error: "Status must be completed, in-progress or not-started."
          });
          return;
        }

        const result = store.updateStatus(id, body.status);
        if (result.error === "not-found") {
          send(res, 404, { error: `Task ${id} was not found.` });
          return;
        }

        send(res, 200, result.task);
        return;
      }

      send(res, 405, { error: "Method not allowed. Use GET or PUT." });
      return;
    }
  }

  send(res, 404, { error: "API endpoint not found." });
};
