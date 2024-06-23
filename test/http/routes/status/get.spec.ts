import { describe, expect, it, setSystemTime } from "bun:test";
import { testClient } from "hono/testing";

import { type ApiRoutes, app } from "@/http/app";

describe("GET /api/v1/status", () => {
  it("should be able to get api status", async () => {
    console.log(Bun.env.NODE_ENV);

    const date = new Date();
    setSystemTime(date);

    const response = await testClient<ApiRoutes>(app).api.v1.status.$get();
    const body = await response.json();

    expect(response.status).toEqual(200);
    expect(body).toStrictEqual({
      updated_at: date.toISOString(),
      version: "0.0.0",
      dependencies: {
        database: {
          version: "16.3",
          max_connections: 100,
          opened_connections: 1,
        },
      },
    });
  });
});
