import type { Child } from "hono/jsx";

type RootLayoutProps = { title?: string; children: Child };

export function RootLayout({ title, children }: RootLayoutProps) {
  const pageTitle = title ? `${title} | Foodfy` : "Foodfy";

  return (
    <html lang="pt-BR">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{pageTitle}</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
