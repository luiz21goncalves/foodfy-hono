import { ENV } from "../env";
import { app } from "./app";

export default {
  fetch: app.fetch,
  port: ENV.PORT,
};
