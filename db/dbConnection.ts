import { Pool } from "pg";

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "android-game-db",
  password: "root",
  port: 5432,
});
