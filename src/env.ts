import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number(),
  POSTGRESQL_USERNAME: z.string(),
  POSTGRESQL_PASSWORD: z.string(),
  POSTGRESQL_DATABASE: z.string(),
  POSTGRESQL_HOST: z.string(),
  POSTGRESQL_PORT: z.coerce.number(),
  DATABASE_URL: z.string().url(),
  NODE_ENV: z.enum(["development", "test", "production"]),
});

export const ENV = envSchema.parse(process.env);
