import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";
import bodyParser from "body-parser";
import articles from "./routes/articles.js";
import user from "./routes/user.js";
import dotenv from "dotenv";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
dotenv.config();
app.use("/api/v1", articles);
app.use("/api/v1/editor", user);
const PORT = process.env.PORT || 5005;
const url = "http://localhost:" + PORT;

mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    app.listen(5005, function () {
      console.log("Server is running on Port: 5005");
    })
  );

// app.listen(PORT, () => {
//   console.log(`Listening on PORT: ${url}`);
// });
