import express from "express";
import {
  signUpAuthor,
  getArticleByAuthor,
  getAuthor,
} from "../controllers/author.js";

const router = express.Router();

router.get("/articles", getArticleByAuthor);
router.get("/info/:author", getAuthor);

router.put("/signup", signUpAuthor);

export default router;
