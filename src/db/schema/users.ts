import { createId } from "@paralleldrive/cuid2";
import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["admin", "publisher"]);

export const users = pgTable("users", {
  id: text("id").$defaultFn(createId).primaryKey(),
  email: text("email").unique().notNull(),
  name: text("name").notNull(),
  password_hash: text("password").notNull(),
  role: userRoleEnum("role").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
