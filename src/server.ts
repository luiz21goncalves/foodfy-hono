import { app } from "./app";
import { ENV } from "./env";

export default {
  fetch: app.fetch,
  port: ENV.PORT
}
