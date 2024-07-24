import db from "~/server/db/dbConfig.js";

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method === "GET") {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT s.student_id, s.chest_number, s.student_name, 
               s.emis, s.date_of_birth, s.gender, s.grade_level, 
               sch.school_name
        FROM Students s
        LEFT JOIN Schools sch ON s.school_id = sch.school_id`,
        [],
        (err, rows) => {
          if (err) {
            reject({ statusCode: 500, message: err.message });
          } else {
            resolve(rows);
          }
        }
      );
    });
  } else if (method === "POST") {
    const body = await useBody(event);
    const {
      first_name,
      last_name,
      date_of_birth,
      gender,
      grade_level,
      school_id,
    } = body;

    return new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO Students (first_name, last_name, date_of_birth, gender, grade_level, school_id) VALUES (?, ?, ?, ?, ?, ?)",
        [first_name, last_name, date_of_birth, gender, grade_level, school_id],
        function (err) {
          if (err) {
            reject({ statusCode: 500, message: err.message });
          } else {
            resolve({ student_id: this.lastID });
          }
        }
      );
    });
  } else {
    return { statusCode: 405, message: "Method Not Allowed" };
  }
});
