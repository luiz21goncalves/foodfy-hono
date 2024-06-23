import { Hono } from "hono";
import { cors } from "hono/cors";
import { etag } from "hono/etag";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";
import { timeout } from "hono/timeout";
import { timing } from "hono/timing";
import { getStatus } from "./status";

const apiRoutes = new Hono().basePath("/v1");

const DEFAULT_TIMEOUT = 5000; // 5 seconds

apiRoutes.use(cors());
apiRoutes.use(etag());
apiRoutes.use(logger());
apiRoutes.use(secureHeaders());
apiRoutes.use(timing());
apiRoutes.use(timeout(DEFAULT_TIMEOUT));

apiRoutes.route("/", getStatus);

export { apiRoutes };
