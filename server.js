/* Local development server. In production the same handlers run as Vercel
   functions under api/ — see lib/handlers.js. */

import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import * as handlers from "./lib/handlers.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT || 4173);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon"
};

const routes = {
  "/api/config": handlers.config,
  "/api/expand": handlers.expand,
  "/api/scheme": handlers.scheme
};

function send(res, status, body) {
  res.writeHead(status, { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" });
  res.end(JSON.stringify(body));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (c) => {
      raw += c;
      if (raw.length > 1e5) reject(new Error("Request too large"));
    });
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        reject(new Error("Malformed request body"));
      }
    });
    req.on("error", reject);
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const route = routes[url.pathname];

  if (route) {
    try {
      handlers.checkAccess(req.headers["x-polarity-access"]);
      const body = req.method === "POST" ? await readBody(req) : {};
      send(res, 200, await route(body));
    } catch (error) {
      const status = error.status || 500;
      if (status >= 500) console.error(error);
      send(res, status, { error: error.message });
    }
    return;
  }

  const rel = url.pathname === "/" ? "index.html" : url.pathname.replace(/^\/+/, "");
  const file = path.join(here, "public", rel);
  if (!file.startsWith(path.join(here, "public"))) return send(res, 403, { error: "Forbidden" });

  fs.readFile(file, (err, data) => {
    if (err) return send(res, 404, { error: "Not found" });
    res.writeHead(200, { "content-type": MIME[path.extname(file)] || "application/octet-stream" });
    res.end(data);
  });
});

server.listen(PORT, () => {
  const mode = handlers.LIVE
    ? "live — analysing any thesis via claude-opus-5"
    : `reference — ${handlers.referenceCatalogue.length} built-in theses (set ANTHROPIC_API_KEY for live analysis)`;
  console.log(`\n  Polarity  ·  http://localhost:${PORT}`);
  console.log(`  mode: ${mode}\n`);
});
