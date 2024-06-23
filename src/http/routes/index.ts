import { Hono } from "hono";
import { cors } from "hono/cors";
import { etag } from "hono/etag";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";
import { timeout } from "hono/timeout";
import { timing } from "hono/timing";

import { status } from "./status";

const apiRoutes = new Hono().basePath("/v1").route("/status", status);

const DEFAULT_TIMEOUT = 5000; // 5 seconds

apiRoutes.use(cors());
apiRoutes.use(etag());
apiRoutes.use(logger());
apiRoutes.use(secureHeaders());
apiRoutes.use(timing());
apiRoutes.use(timeout(DEFAULT_TIMEOUT));

export { apiRoutes };
