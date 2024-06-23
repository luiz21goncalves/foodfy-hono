import { ENV } from "@/env";

import { app } from "./app";

const server = Bun.serve({
  fetch: app.fetch,
  port: ENV.PORT,
  hostname: "0.0.0.0",
});

console.log(`HTTP server running at: ${server.url}`);
