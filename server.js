var express = require("express");
var db = require("./database");
var bodyParser = require("body-parser");
var md5 = require("md5");

const PORT = process.env.PORT || 8000;
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var validateRequest = (req, res) => {
  var error = [];
  if (!req.body.name) {
    error.push("Name is required");
  }
  if (!req.body.password) {
    error.push("Password is required");
  }
  if (!req.body.email) {
    error.push("Email is required");
  }
  if (error.length) {
    res.status(400).json({ error: error.join(", ") });
    return;
  }
};

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Routes
app.get("/", (_req, res, _next) => {
  res.json({ message: "Ok" });
});

// Get all users
app.get("/users", (_req, res, _next) => {
  var sql = "select * from user";
  var params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "Success",
      data: rows,
    });
  });
});

// Get a single user by id
app.get("/users/:id", (req, res, _next) => {
  var sql = "select * from user where id = ?";
  var params = [req.params.id];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "Success",
      data: row,
    });
  });
});

// Create a new user
app.post("/create/users", (req, res, _next) => {
  validateRequest(req, res);
  var data = {
    name: req.body.name,
    email: req.body.email,
    password: md5(req.body.password),
  };

  var sql = "INSERT INTO user (name, email, password) VALUES (?,?,?)";
  var params = [data.name, data.email, data.password];

  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "Success",
      data: data,
      id: this.lastID,
    });
  });
});

// Update a user by id
app.patch("/update/users/:id", (req, res, _next) => {
  validateRequest(req, res);

  var data = {
    name: req.body.name,
    email: req.body.email,
    password: md5(req.body.password),
  };

  db.run(
    `UPDATE user SET 
      name = COALESCE(?, name),
      email = COALESCE(?, email), 
      password = COALESCE(?, password) 
      WHERE id = ?`,
    [data.name, data.email, data.password, req.params.id],
    (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: "Success",
        data: data,
        change: this.change,
      });
    }
  );
});

// Delete a user by id
app.delete("/delete/users/:id", (req, res, _next) => {
  db.run(`DELETE FROM user WHERE id = ?`, [req.params.id], (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "Deleted Successfully",
      change: this.change,
    });
  });
});

app.use((req, res) => {
  res.status(404);
});
