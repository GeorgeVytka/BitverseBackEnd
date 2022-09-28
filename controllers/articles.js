import mongoose from "mongoose";
import multer from "multer";
import CreateArticle from "../models/article.js";
import bcrypt from "bcrypt";
import Editor from "../models/editor.js";
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
  let newArticle = "";
  let temp = "";
  // res.status(201).json("newArticle");
  try {
    let editor = await Editor.findOne({ email: article.email });
    if (editor) {
      temp = bcrypt.compareSync(article.password, editor.password); // true
      if (temp) {
        newArticle = new CreateArticle(article);
      } else {
        res.status(409).json({ message: "wrong password" });
        return;
      }
    } else {
      res.status(409).json({ message: "no email exits" });
      return;
    }

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
    const article = await CreateArticle.find({ _id: articleId.id });
    res.status(200).json(article);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteArticle = async (req, res) => {
  const article = req.body;
  let temp = "";
  let editor = await Editor.findOne({ email: article.email });
  if (editor) {
    temp = bcrypt.compareSync(article.password, editor.password); // true
    if (temp) {
      let result = await CreateArticle.deleteOne({
        _id: req.body.id,
      });
      res.status(200).json(result);
    } else {
      res.status(409).json({ message: "wrong password" });
      return;
    }
  } else {
    res.status(409).json({ message: "no email exits" });
    return;
  }
};

export const getArticleByTags = async (req, res) => {
  const { tags } = req.body;

  console.log("-=-", tags);
  try {
    const articles = await CreateArticle.find({
      tags: tags,
      isHeadLine: { $eq: false },
    });

    res.status(200).json(articles);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
