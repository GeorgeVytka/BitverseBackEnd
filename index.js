import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import articles from "./routes/articles.js";
import author from "./routes/author.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();
dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const PORT = process.env.PORT || 8080;

app.use("/api/v1", articles);
app.use("/api/v1/author", author);

mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    app.listen(8080, function () {
      console.log("Server is running on Port: 8080");
    })
  );

// app.listen(8080, () => {
//   console.log(`Listening on: http://localhost: ${PORT}`);
// });
