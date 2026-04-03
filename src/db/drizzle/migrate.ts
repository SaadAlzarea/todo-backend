import "dotenv/config";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DB_URL_SQL_POSTGRESQL,
});

const db = drizzle(pool);

async function main() {
  await migrate(db, {
    migrationsFolder: "./src/db/drizzle/migrations",
  });

  await pool.end();
}

main();