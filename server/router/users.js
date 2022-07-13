import express from "express";
import md5 from "md5";
import db from "../database.js";
import validateRequest from "../utils.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    status: "Ok",
    message: "This endpoint is for users",
  });
});

router.get("/getusers", (_req, res, _next) => {
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

router.get("/getuser/:id", (req, res, _next) => {
  var sql = "select * from user where id = ?";
  var params = [req.params.id];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    } else if (row === undefined) {
      res.status(400).json({ error: "User does not exist." });
      return;
    }
    res.json({
      message: "Success",
      data: row,
    });
  });
});

router.post("/adduser", (req, res, _next) => {
  const Valid = validateRequest(req, res);
  if (!Valid) {
    return;
  }
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

router.patch("/update/:id", (req, res, _next) => {
  const Valid = validateRequest(req, res);
  if (!Valid) {
    return;
  }
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
        // change: this.change,
      });
    }
  );
});

router.delete("/delete/:id", (req, res, _next) => {
  var sql = "DELETE FROM user WHERE id = ?";
  var params = [req.params.id];
  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    // delete all scores of this user
    db.run(`DELETE FROM os WHERE user_id = ?`, [req.params.id], (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: "Deleted scores",
      });
    });
  });
});

export default router;
