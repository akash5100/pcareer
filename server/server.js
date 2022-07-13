import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRouter from "./router/users.js";
import scoresRouter from "./router/scores.js";

const app = express();
dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT;

// Users
app.use("/users", userRouter);

// Scores
app.use("/scores", scoresRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
