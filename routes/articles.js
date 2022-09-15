import express from "express";
import {
  getArticles,
  gatHeadLine,
  createArticle,
  updateArticle,
  getArticleById,
} from "../controllers/articles.js";
const router = express.Router();

router.get("/articles", getArticles);
router.post("/test", createArticle);
router.put("/article", updateArticle);
router.get("/headline", gatHeadLine);
router.put("/articleId/", getArticleById);

export default router;
