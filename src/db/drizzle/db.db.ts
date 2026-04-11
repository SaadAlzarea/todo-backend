import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.DB_URL_SQL_POSTGRESQL as string,
});

export const db = drizzle(pool);
// import "dotenv/config";
// import { drizzle } from "drizzle-orm/node-postgres";
// import { Pool } from "pg";

// const pool = new Pool({
//     connectionString: process.env.DATABASE_URL!,
// });
// const db = drizzle({ client: pool });
