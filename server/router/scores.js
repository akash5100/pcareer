import express from "express";
import db from "../database.js";
import { validateScores } from "../utils.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: "This endpoint is used to get/post scores of a user in different subjects.",
  });
});

router.get("/os", (_req, res, _next) => {
  db.all(`SELECT * FROM os`, (err, rows) => {
    if (err) {
      console.error(err.message);
      throw err;
    } else {
      res.status(200).json(rows);
    }
  });
});

router.get("/os/:user_id", (req, res, _next) => {
  var params = [req.params.user_id];
  var name = "";

  db.get(`SELECT name FROM user WHERE id = ?`, params, (err, row) => {
    if (err) {
      console.error(err.message);
      throw err;
    } else if (row === undefined) {
      res.status(400).json({ error: "User does not exist." });
      return;
    } else {
      name = row.name;
    }
  });

  db.all(`SELECT * FROM os WHERE user_id = ?`, params, (err, rows) => {
    if (err) {
      console.error(err.message);
      throw err;
    } else {
      res.status(200).json({
        name: name,
        scores: rows,
      });
    }
  });
});

router.post("/os/:user_id", (req, res, _next) => {
  const Valid = validateScores(req, res);
  if (!Valid) {
    return;
  }
  var data = {
    ct1: req.body.ct1,
    ct2: req.body.ct2,
    final: req.body.final,
    user_id: req.params.user_id,
  };
  var sql = "INSERT INTO os (ct1, ct2, final, user_id) VALUES (?,?,?,?)";
  var params = [data.ct1, data.ct2, data.final, data.user_id];
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

export default router;
