import mongoose from "mongoose";
import multer from "multer";
import CreateArticle from "../models/article.js";
import savedImage from "../models/image.js";

const Storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: Storage,
}).single("testImage");

export const getArticles = async (req, res) => {
  try {
    const articles = await CreateArticle.find({});

    res.status(200).json(articles);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const gatHeadLine = async (req, res) => {
  try {
    const getAllHeadlines = await CreateArticle.find({
      isHeadLine: { $eq: true },
    });
    res.status(200).json(getAllHeadlines);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createArticle = async (req, res) => {
  const article = req.body;

  const newArticle = new CreateArticle(article);

  // res.status(201).json("newArticle");
  try {
    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateArticle = async (req, res) => {
  const { title, quote, paragraphs, author, tags, isHeadLine } = req.body;

  let articleFields = {};

  if (title) articleFields.title = title;
  if (quote) articleFields.quote = quote;
  if (paragraphs) articleFields.paragraphs = paragraphs;
  if (author) articleFields.author = author;
  if (tags) articleFields.tags = tags;
  if (isHeadLine) articleFields.isHeadLine = isHeadLine;

  try {
    let article = await CreateArticle.find({
      _id: req.body._id,
    });

    if (!article) return res.status(404).json({ msg: "Article not Found." });

    article = await CreateArticle.findByIdAndUpdate(req.body._id, {
      title: title,
      quote: quote,
      paragraphs: paragraphs,
      author: author,
      tags: tags,
      isHeadLine: isHeadLine,
    });

    res.status(200).json(article);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getArticleById = async (req, res) => {
  const articleId = req.body;

  try {
    console.log("---", articleId);
    const article = await CreateArticle.find({ _id: articleId.id });
    res.status(200).json(article);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
