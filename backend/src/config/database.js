import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

export async function connectDatabase() {
  try {
    const client = await pool.connect();

    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("✅ PostgreSQL Connected");
    console.log(`📦 Database: ${process.env.DB_NAME}`);
    console.log(`👤 User: ${process.env.DB_USER}`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    client.release();
  } catch (error) {
    console.error("❌ PostgreSQL Connection Error");
    console.error(error.message);
    process.exit(1);
  }
}