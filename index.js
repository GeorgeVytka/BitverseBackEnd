import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";
import bodyParser from "body-parser";
import articles from "./routes/articles.js";
import user from "./routes/user.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const tempUrl =
  "mongodb+srv://colt:murrowstudent22@cluster0.gtiaiqr.mongodb.net/?retryWrites=true&w=majority";
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/api/v1", articles);
app.use("/api/v1/editor", user);
const PORT = process.env.PORT || 5005;
const url = "http://localhost:" + PORT;

mongoose
  .connect(tempUrl, {
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
