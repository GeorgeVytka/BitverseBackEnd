import express from "express";
import {
  getArticles,
  gatHeadLine,
  createArticle,
  updateArticle,
  getArticleById,
  deleteArticle,
  getArticleByTags,
} from "../controllers/articles.js";
const router = express.Router();

router.get("/articles", getArticles);
router.put("/articles/tag", getArticleByTags);
router.post("/test", createArticle);
router.put("/article", updateArticle);
router.get("/headline", gatHeadLine);
router.put("/articleId/", getArticleById);
router.delete("/deleteArticle", deleteArticle);

export default router;
