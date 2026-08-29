/* Adapter between Vercel's function signature and the shared handlers.
   Underscore-prefixed, so Vercel does not expose it as a route. */

import { checkAccess } from "../lib/handlers.js";

export function route(handler, { method = "POST" } = {}) {
  return async function (req, res) {
    res.setHeader("cache-control", "no-store");

    if (req.method !== method && req.method !== "OPTIONS") {
      return res.status(405).json({ error: `Use ${method} for this endpoint.` });
    }
    if (req.method === "OPTIONS") return res.status(204).end();

    try {
      checkAccess(req.headers["x-polarity-access"]);
      const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
      return res.status(200).json(await handler(body));
    } catch (error) {
      const status = error.status || 500;
      if (status >= 500) console.error(error);
      return res.status(status).json({ error: error.message });
    }
  };
}
