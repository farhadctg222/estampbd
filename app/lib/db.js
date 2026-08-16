import mysql from "mysql2/promise";

// ✅ Database connection using environment variables
const database = await mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "stampbd",
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
});

export default database;
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_PORT:", process.env.DB_PORT);

console.log("✅ Database connected successfully");