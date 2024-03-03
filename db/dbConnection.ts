import { Pool } from "pg";

export const pool = new Pool({
  user: "admin",
  host: "cl845053-001.eu.clouddb.ovh.net",
  database: "android-game-db",
  password: "TGw4yPrG",
  port: 35954,
});
