import sqlite3 from "sqlite3";

const DBSOURCE = "db.sqlite";

const db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the database.");
    db.serialize(() => {
      db.run(`CREATE TABLE IF NOT EXISTS user (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name text,
              email text UNIQUE,
              password text,
              CONSTRAINT email_unique UNIQUE (email)
            )`),
        (err) => {
          if (err) {
            console.error(err.message);
            throw err;
          } else {
            console.log("User table created.");
          }
        };
      db.run(`CREATE TABLE IF NOT EXISTS os (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              ct1 INTEGER,
              ct2 INTEGER,
              final INTEGER,
              user_id INTEGER,
              FOREIGN KEY (user_id) REFERENCES user(id)
            )`),
        (err) => {
          if (err) {
            console.error(err.message);
            throw err;
          } else {
            console.log("os table created.");
          }
        };
      db.run(`CREATE TABLE IF NOT EXISTS dbms (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ct1 INTEGER,
            ct2 INTEGER,
            final INTEGER,
            user_id INTEGER,
            FOREIGN KEY (user_id) REFERENCES user(id)
          )`),
        (err) => {
          if (err) {
            console.error(err.message);
            throw err;
          } else {
            console.log("dbms table created.");
          }
        };
      db.run(`CREATE TABLE IF NOT EXISTS dsa(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ct1 INTEGER,
            ct2 INTEGER,
            final INTEGER,
            user_id INTEGER,
            FOREIGN KEY (user_id) REFERENCES user(id)
          )`),
        (err) => {
          if (err) {
            console.error(err.message);
            throw err;
          } else {
            console.log("dsa table created.");
          }
        };
      db.run(`CREATE TABLE IF NOT EXISTS cn(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ct1 INTEGER,
            ct2 INTEGER,
            final INTEGER,
            user_id INTEGER,
            FOREIGN KEY (user_id) REFERENCES user(id)
          )`),
        (err) => {
          if (err) {
            console.error(err.message);
            throw err;
          } else {
            console.log("cn table created.");
          }
        };
      db.run(`CREATE TABLE IF NOT EXISTS plang(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ct1 INTEGER,
            ct2 INTEGER,
            final INTEGER,
            user_id INTEGER,
            FOREIGN KEY (user_id) REFERENCES user(id)
          )`),
        (err) => {
          if (err) {
            console.error(err.message);
            throw err;
          } else {
            console.log("plang table created.");
          }
        };
    });
  }
});

export default db;
