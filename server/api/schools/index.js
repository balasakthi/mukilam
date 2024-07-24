import db from "~/server/db/dbConfig.js";

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method === "GET") {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM Schools", [], (err, rows) => {
        if (err) {
          reject({ statusCode: 500, message: err.message });
        } else {
          resolve(rows);
        }
      });
    });
  } else if (method === "POST") {
    const body = await readBody(event);
    const { school_name, location } = body;

    return new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO Schools (school_name, location) VALUES (?, ?)",
        [school_name, location],
        function (err) {
          if (err) {
            reject({ statusCode: 500, message: err.message });
          } else {
            resolve({ school_id: this.lastID });
          }
        }
      );
    });
  } else if (method === "PUT") {
    const body = await readBody(event);
    const { school_id, school_name, location } = body;

    return new Promise((resolve, reject) => {
      db.run(
        "UPDATE Schools SET school_name = ?, location = ? WHERE school_id = ?",
        [school_name, location, school_id],
        function (err) {
          if (err) {
            reject({ statusCode: 500, message: err.message });
          } else {
            resolve({ message: "School updated successfully" });
          }
        }
      );
    });
  } else if (method === "DELETE") {
    const body = await readBody(event);
    const { school_id } = body;

    return new Promise((resolve, reject) => {
      db.run(
        "DELETE FROM Schools WHERE school_id = ?",
        [school_id],
        function (err) {
          if (err) {
            reject({ statusCode: 500, message: err.message });
          } else {
            resolve({ message: "School deleted successfully" });
          }
        }
      );
    });
  } else {
    return { statusCode: 405, message: "Method Not Allowed" };
  }
});
