import { Hono } from "hono";
import { cors } from "hono/cors";
import { etag } from "hono/etag";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";
import { timeout } from "hono/timeout";
import { timing } from "hono/timing";

import { ENV } from "@/env";

import { routes as webRoutes } from "../web/routes";
import { routes as httpRoutes } from "./routes";

const app = new Hono();

const DEFAULT_TIMEOUT = 5000; // 5 seconds

app.use("/api/*", cors());
app.use("*", etag());
app.use(
  "*",
  logger(
    ENV.NODE_ENV === "test"
      ? (_message: string, ..._rest: string[]) => {}
      : undefined,
  ),
);
app.use("/*", secureHeaders());
app.use("/api/*", timing());
app.use("/api/*", timeout(DEFAULT_TIMEOUT));

app.route("*", webRoutes);
const apiRoutes = app.route("/api", httpRoutes);

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
