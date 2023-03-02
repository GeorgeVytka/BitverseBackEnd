import express from "express";

import {
  getAllArticles,
  createArticle,
  getArticleById,
  updateArticleBoby,
  getAllArticlesByTag,
  deleteAerticle,
  getHeadline,
} from "../controllers/articles.js";

const router = express.Router();

router.get("/articles", getAllArticles);
router.get("/article/:id", getArticleById);
router.get("/articles/:tags", getAllArticlesByTag);
router.get("/headline", getHeadline);

router.put("/article", createArticle);

router.put("/articlebody", updateArticleBoby);

router.delete("/article/remove", deleteAerticle);

export default router;
