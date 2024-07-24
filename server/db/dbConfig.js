// server/db/db.js
import sqlite3 from "sqlite3";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Adjust the path to point to the 'db' folder under 'server'
const dbPath = join(__dirname, "/../../server/db/mukilam.db");

console.log(dbPath);

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database:", err);
  } else {
    console.log("Database opened successfully");
  }
});

export default db;
