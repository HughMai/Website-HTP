import http from "node:http";
import type { AddressInfo } from "node:net";

/**
 * Stand-in for crm.hungthanhphat.vn.
 *
 * The whole point: no test may ever send a real Telegram message, a real
 * Resend email, or a real CRM webhook. Telegram and Resend are handled by
 * leaving their env vars unset (each channel then reports "not-configured"),
 * and the CRM is pointed here instead.
 *
 *   POST /crm         → records the payload, answers per `mode`
 *   GET  /__received  → everything recorded so far
 *   POST /__reset     → clear recordings, set `mode` ("ok" | "fail")
 */

export const CRM_MOCK_PORT = 4571;

type Mode = "ok" | "fail";

let mode: Mode = "ok";
let received: unknown[] = [];

function readBody(req: http.IncomingMessage): Promise<string> {
  return new Promise((resolve) => {
    let data = "";
    req.on("data", (c) => (data += c));
    req.on("end", () => resolve(data));
  });
}

export function createCrmMock() {
  const server = http.createServer(async (req, res) => {
    const url = req.url ?? "";

    if (req.method === "POST" && url.startsWith("/__reset")) {
      const body = await readBody(req);
      received = [];
      try {
        mode = (JSON.parse(body || "{}").mode as Mode) ?? "ok";
      } catch {
        mode = "ok";
      }
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ ok: true, mode }));
      return;
    }

    if (req.method === "GET" && url.startsWith("/__received")) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(received));
      return;
    }

    if (req.method === "POST" && url.startsWith("/crm")) {
      const body = await readBody(req);
      try {
        received.push(JSON.parse(body));
      } catch {
        received.push({ unparseable: body });
      }
      if (mode === "fail") {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "mock failure" }));
        return;
      }
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ ok: true }));
      return;
    }

    res.writeHead(404);
    res.end();
  });

  return {
    server,
    listen: () =>
      new Promise<number>((resolve) => {
        server.listen(CRM_MOCK_PORT, "127.0.0.1", () =>
          resolve((server.address() as AddressInfo).port)
        );
      }),
    close: () => new Promise<void>((resolve) => server.close(() => resolve())),
  };
}

// Helpers used from the specs.
const base = `http://127.0.0.1:${CRM_MOCK_PORT}`;

export async function resetCrm(mode: Mode = "ok") {
  await fetch(`${base}/__reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mode }),
  });
}

export async function crmReceived<T = Record<string, unknown>>(): Promise<T[]> {
  const res = await fetch(`${base}/__received`);
  return (await res.json()) as T[];
}
