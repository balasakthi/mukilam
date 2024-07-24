// server/db/db.js
import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./mukilam.db", (err) => {
  if (err) {
    console.error("Error opening database:", err);
  } else {
    console.log("Database opened successfully");
  }
});

export default db;
