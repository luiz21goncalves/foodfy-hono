import { Hono } from "hono";

import { status } from "./status";

export const routes = new Hono().basePath("/v1").route("/status", status);
