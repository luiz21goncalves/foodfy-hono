import { sql } from "drizzle-orm";
import { Hono } from "hono";
import { endTime, startTime } from "hono/timing";

import { db } from "@/db/connection";
import { ENV } from "@/env";

import { version } from "../../../package.json";

export const status = new Hono().get("/", async (c) => {
  startTime(c, "database_version");
  const databaseVersion = (
    await db.execute<{ server_version: string }>(sql`SHOW server_version`)
  ).rows[0].server_version;
  endTime(c, "database_version");

  startTime(c, "database_max_connections");
  const databaseMaxConnections = (
    await db.execute<{ max_connections: string }>(sql`SHOW max_connections`)
  ).rows[0].max_connections;
  endTime(c, "database_max_connections");

  startTime(c, "database_opened_connections");
  const databaseOpenedConnections = (
    await db.execute<{ count: number }>(
      sql`SELECT count(*)::int FROM pg_stat_activity WHERE datname = ${ENV.POSTGRESQL_DATABASE}`,
    )
  ).rows[0].count;
  endTime(c, "database_opened_connections");

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
