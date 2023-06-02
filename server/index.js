import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/user.js";
import { recipesRouter } from "./routes/recipes.js";
import "dotenv/config";
//request.setHeader("Content-Security-Policy", "default-src 'self'");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  res.setHeader(
    "Content-Security-Policy-Report-Only",
    "default-src *; script-src *; style-src *; font-src *; img-src *; frame-src 'self'"
  );

  next();
});

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DataBase is working");
  })
  .catch((err) => console.log("Database Error", err));

app.listen(process.env.PORT_LOCAL || process.env.PORT, () =>
  console.log("Server Run")
);
