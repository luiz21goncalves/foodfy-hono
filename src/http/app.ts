import { Hono } from "hono";

import { apiRoutes } from "./routes";

const app = new Hono().route("/api", apiRoutes);

export type ApiRoutes = typeof app;
export { app };
