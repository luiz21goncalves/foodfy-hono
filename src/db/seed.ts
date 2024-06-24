import { fakerPT_BR as faker } from "@faker-js/faker";
import chalk from "chalk";

import { db } from "./connection";
import { users } from "./schema";

async function main() {
  await db.delete(users);
  console.info(chalk.yellow("Database reset!"));

  const ADMIN_EMAIL = "admin@admin.com";

  await db.insert(users).values({
    email: ADMIN_EMAIL,
    name: faker.person.fullName(),
    role: "admin",
    password_hash: faker.internet.password(),
  });

  console.info(chalk.yellow(`Created admin with email ${ADMIN_EMAIL}`));

  process.exit();
}

main();
