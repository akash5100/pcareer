var sqlite3 = require("sqlite3").verbose();
var md5 = require("md5");

const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the database.");
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
          console.log("Table created.");
          var insert = "INSERT INTO user (name, email, password) VALUES (?, ?, ?)";
          db.run(insert, ["admin", "admin@example.com", md5("strong_password")]);
          db.run(insert, ["user", "user@example.com", md5("weak_password")]);
        }
      };
  }
});

module.exports = db;
