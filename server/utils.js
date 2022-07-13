export default function validateRequest(req, res) {
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
    return false;
  }
  return true;
}

export function validateScores(req, res) {
  var error = [];
  if (!req.body.ct1) {
    error.push("CT1 is required");
  }
  if (!req.body.ct2) {
    error.push("CT2 is required");
  }
  if (!req.body.final) {
    error.push("Final is required");
  }
  if (error.length) {
    res.status(400).json({ error: error.join(", ") });
    return false;
  }
  return true;
}

export function validateSubject(subject) {
  if (subject !== "os" && subject !== "dbms" && subject !== "dsa" && subject !== "cn" && subject !== "plang") {
    return false;
  }
  return true;
}
