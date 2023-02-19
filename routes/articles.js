import express from "express";

import {
  getAllArticles,
  createArticle,
  getArticleById,
  updateArticleBoby,
  getAllArticlesByTag,
} from "../controllers/articles.js";

const router = express.Router();

router.get("/articles", getAllArticles);
router.get("/article/:id", getArticleById);
router.get("/articles/:tags", getAllArticlesByTag);

router.put("/article", createArticle);

router.put("/articlebody", updateArticleBoby);

export default router;
