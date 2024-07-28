import { Hono } from "hono";
import { jsxRenderer } from "hono/jsx-renderer";

import { Home } from "../pages/home";

export const routes = new Hono();

routes.get(
  "*",
  jsxRenderer(({ children }) => {
    return <>{children}</>;
  }),
);

routes.get("/", (c) => {
  return c.render(<Home />);
});
