import { Hono } from "hono";
import { Home } from "../pages/home";

export const routes = new Hono();

routes.get("/", (c) => {
  return c.render(<Home />);
});
