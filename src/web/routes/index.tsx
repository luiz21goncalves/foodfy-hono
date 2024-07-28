import { Hono } from "hono";
import { jsxRenderer } from "hono/jsx-renderer";

import { Home } from "../pages/home";

export const routes = new Hono();

routes.get(
  "*",
  jsxRenderer(({ children }) => {
    return (
      <html lang="pt-BR">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/public/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/public/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/public/favicon-16x16.png"
          />
          <link rel="manifest" href="/public/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/public/safari-pinned-tab.svg"
            color="#5bbad5"
          />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
          <title>Foodfy</title>
        </head>
        <body>{children}</body>
      </html>
    );
  }),
);

routes.get("/", (c) => {
  return c.render(<Home />);
});
