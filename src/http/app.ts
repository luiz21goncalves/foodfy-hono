import { Hono } from "hono";
import { cors } from "hono/cors";
import { etag } from "hono/etag";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";
import { timeout } from "hono/timeout";
import { timing } from "hono/timing";

import { ENV } from "@/env";
import { routes } from "./routes";

const app = new Hono();

const DEFAULT_TIMEOUT = 5000; // 5 seconds

app.use("/api/*", cors());
app.use("/api/*", etag());
app.use(
  "/api/*",
  logger(
    ENV.NODE_ENV === "test"
      ? (_message: string, ..._rest: string[]) => {}
      : undefined,
  ),
);
app.use("/api/*", secureHeaders());
app.use("/api/*", timing());
app.use("/api/*", timeout(DEFAULT_TIMEOUT));

const apiRoutes = app.route("/api", routes);

apiRoutes.notFound((c) => {
  const statusCode = 404;

  return c.json(
    {
      message: `Route ${c.req.method}:${c.req.path} not found`,
      statusCode,
      error: "Not Found",
    },
    statusCode,
  );
});

export type ApiRoutes = typeof apiRoutes;
export { app };
