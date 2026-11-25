"use strict";

const fs = require("fs");

/* The JSON file is required so Vercel traces and bundles it with the
   serverless function. Local runs write updated statuses back to the
   same file; serverless runs keep changes in memory because their
   filesystem is read only. */
const dataFile = require.resolve("../backend/data/tasks.json");
const seed = require("../backend/data/tasks.json");
const STATUSES = ["completed", "in-progress", "not-started"];

let tasks = JSON.parse(JSON.stringify(seed));

function clone(task) {
  return JSON.parse(JSON.stringify(task));
}

function isStatus(value) {
  return STATUSES.indexOf(value) !== -1;
}

function list() {
  return tasks.map(clone);
}

function get(id) {
  const task = tasks.find((item) => item.id === id);
  return task ? clone(task) : null;
}

function persist() {
  if (process.env.VERCEL) {
    return;
  }
  try {
    fs.writeFileSync(dataFile, JSON.stringify(tasks, null, 2) + "\n", "utf8");
  } catch (error) {
    console.error("Could not save task data:", error.message);
  }
}

function updateStatus(id, status) {
  if (!isStatus(status)) {
    return { error: "invalid-status" };
  }

  const task = tasks.find((item) => item.id === id);
  if (!task) {
    return { error: "not-found" };
  }

  task.status = status;
  task.updatedAt = new Date().toISOString();
  persist();
  return { task: clone(task) };
}

function countByStatus(status) {
  return tasks.filter((task) => task.status === status).length;
}

module.exports = {
  STATUSES,
  list,
  get,
  updateStatus,
  isStatus,
  countByStatus
};
