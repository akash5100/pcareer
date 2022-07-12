export default function validateRequest(req, res){
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
  };