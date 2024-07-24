// server/init-db.js
import db from "./db/dbConfig.js";

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS Schools (
        school_id INTEGER PRIMARY KEY AUTOINCREMENT,
        school_name TEXT NOT NULL,
        location TEXT,
        created_at TEXT DEFAULT (datetime('now', 'localtime'))
    )`);

  db.run(`CREATE TABLE IF NOT EXISTS Students (
        student_id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        date_of_birth TEXT NOT NULL,
        gender TEXT,
        grade_level TEXT,
        school_id INTEGER,
        created_at TEXT DEFAULT (datetime('now', 'localtime')),
        FOREIGN KEY (school_id) REFERENCES Schools(school_id)
    )`);

  db.run(`CREATE TABLE IF NOT EXISTS Events (
        event_id INTEGER PRIMARY KEY AUTOINCREMENT,
        event_name TEXT NOT NULL,
        event_type TEXT NOT NULL,
        age_group TEXT NOT NULL,
        created_at TEXT DEFAULT (datetime('now', 'localtime'))
    )`);

  db.run(`CREATE TABLE IF NOT EXISTS Teams (
        team_id INTEGER PRIMARY KEY AUTOINCREMENT,
        team_name TEXT NOT NULL,
        event_id INTEGER,
        created_at TEXT DEFAULT (datetime('now', 'localtime')),
        FOREIGN KEY (event_id) REFERENCES Events(event_id)
    )`);

  db.run(`CREATE TABLE IF NOT EXISTS Participation (
        participation_id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_id INTEGER,
        event_id INTEGER,
        team_id INTEGER,
        points INTEGER DEFAULT 0,
        performance_record TEXT,
        created_at TEXT DEFAULT (datetime('now', 'localtime')),
        FOREIGN KEY (student_id) REFERENCES Students(student_id),
        FOREIGN KEY (event_id) REFERENCES Events(event_id),
        FOREIGN KEY (team_id) REFERENCES Teams(team_id)
    )`);
});

db.close();
