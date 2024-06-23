import { sql } from "drizzle-orm";
import { Hono } from "hono";

import { version } from "../package.json";
import { db } from "./db/connection";
import { ENV } from "./env";

const app = new Hono();

app.get("/", (c) => {
  return c.json({ message: "Hello Hono!" });
});

app.get("/v1/status", async (c) => {
  const databaseVersion = (
    await db.execute<{ server_version: string }>(sql`SHOW server_version`)
  ).rows[0].server_version;

  const databaseMaxConnections = (
    await db.execute<{ max_connections: string }>(sql`SHOW max_connections`)
  ).rows[0].max_connections;

  const databaseOpenedConnections = (
    await db.execute<{ count: number }>(
      sql`SELECT count(*)::int FROM pg_stat_activity WHERE datname = ${ENV.POSTGRESQL_DATABASE}`,
    )
  ).rows[0].count;

  return c.json({
    updated_at: new Date().toISOString(),
    version,
    dependencies: {
      database: {
        version: databaseVersion,
        max_connections: Number(databaseMaxConnections),
        opened_connections: databaseOpenedConnections,
      },
    },
  });
});

app.get("/api/v1/status", async (c) => {
  const databaseVersion = (
    await db.execute<{ server_version: string }>(sql`SHOW server_version`)
  ).rows[0].server_version;

  const databaseMaxConnections = (
    await db.execute<{ max_connections: string }>(sql`SHOW max_connections`)
  ).rows[0].max_connections;

  const databaseOpenedConnections = (
    await db.execute<{ count: number }>(
      sql`SELECT count(*)::int FROM pg_stat_activity WHERE datname = ${ENV.POSTGRESQL_DATABASE}`,
    )
  ).rows[0].count;

  return c.json({
    updated_at: new Date().toISOString(),
    version,
    dependencies: {
      database: {
        version: databaseVersion,
        max_connections: Number(databaseMaxConnections),
        opened_connections: databaseOpenedConnections,
      },
    },
  });
});

export { app };
