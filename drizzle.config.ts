import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const DB_URL_SQL_POSTGRESQL = process.env.DB_URL_SQL_POSTGRESQL as string;
export const connectDB_postgres = () => {
    if (!DB_URL_SQL_POSTGRESQL) {
        console.log("fail connection with postgres database");
    } else {
        console.log("Postgresql connected successfully");
        // console.log(DB_URL_SQL_POSTGRESQL);
    }
};
console.log("postgres run on", process.env.DB_URL_SQL_POSTGRESQL);
export default defineConfig({
    out: "./src/db/drizzle/migrations",
    schema: "./src/db/drizzle/schema.ts",
    dialect: "postgresql",
    dbCredentials: {
        url: DB_URL_SQL_POSTGRESQL,
    },
    // verbose: true,
    // strict: true,
});

/**
 * * this is commands
 * ! for create : pnpm drizzle-kit generate
 * ! to migrate : pnpm drizzle-kit migrate
 * ! to push : pnpm drizzle-kit push
 * ! to drop : pnpm drizzle-kit drop
 * ! to run drizzle studio : pnpm drizzle-kit studio
 * ! check on env : node -e "console.log()"
 * ! to delete migration folder : rm -rf src/db/drizzle/migrations
 */
