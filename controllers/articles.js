import express from "express";
import ArticleModel from "../models/articles.js";
import AutherModel from "../models/author.js";
import BobyModel from "../models/articleBody.js";
import bcrypt from "bcrypt";
import { AuthAuthor } from "../ult/helper.js";
const saltRounds = 10;
let temp = false;

export const getAllArticles = async (req, res) => {
  try {
    const headlines = await ArticleModel.find({
      isHeadLine: { $all: true },
    })
      .sort({ createdAt: -1 })
      .limit(6);
    const articles = await ArticleModel.find({ isHeadLine: { $all: false } });
    let temp = { articles, headlines };

    res.status(200).json(temp);
    console.log("get all the articles");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getHeadline = async (req, res) => {
  console.log("yo::: :");
  try {
    const articles = await ArticleModel.find({
      isHeadLine: { $all: true },
    })
      .sort({ createdAt: -1 })
      .limit(2);

    res.status(200).json(articles);
  } catch (error) {
    res.status(404).json({ message: "error.message" });
  }
};

export const getAllArticlesByTag = async (req, res) => {
  const { tags } = req.params;

  try {
    const quryedArticles = await ArticleModel.find({
      tags: { $all: [tags] },
    });

    console.log("---", quryedArticles);
    if (quryedArticles.length == 0) {
      res.status(401).json({ message: "No articles with that tag found!!" });
    } else {
      console.log("***************", quryedArticles);
      res.status(200).json(quryedArticles);
    }
  } catch (error) {
    res.status(404).json({ message44: error.message });
  }
};

export const getArticleById = async (req, res) => {
  const articleId = req.params;
  console.log("88::: ");
  try {
    const article = await BobyModel.find({ ID: articleId.id });

    if (article.length > 0) {
      const articleUpdate = await BobyModel.updateOne(
        { ID: articleId.id },
        {
          $inc: { views: 1 },
        }
      );

      res.status(200).json(article);
    } else {
      res.status(409).json({ message: "Error finding the article" });
    }
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const createArticle = async (req, res) => {
  const article = req.body;

  const {
    title,
    author,
    authorPassword,
    email,
    tags,
    isHeadLine,
    thumbnailImg,
    body,
    quote,
    articleImgs,
    views,
  } = req.body;

  const thumbNail = {};
  const articleBody = {};

  const quryedAuthor = await AutherModel.find({
    Name: author,
  });

  // console.log("000000========= ", quryedAuthor[0].Password);

  if (title) thumbNail.title = title;
  if (title) articleBody.title = title;

  if (views == 0) thumbNail.views = views;
  if (views == 0) articleBody.views = views;

  if (author) thumbNail.author = author;
  if (author) articleBody.author = author;

  if (tags) thumbNail.tags = tags;
  if (tags) articleBody.tags = tags;

  thumbNail.isHeadLine = isHeadLine;
  if (thumbnailImg) thumbNail.thumbnailImg = thumbnailImg;

  if (author) articleBody.body = body;
  if (author) articleBody.quote = quote;
  if (author) articleBody.articleImgs = articleImgs;

  let editor = await AutherModel.findOne({ Email: email });

  const newthumbNail = { ...thumbNail, ID: Date.now() };
  const newarticleBody = { ...articleBody, ID: newthumbNail.ID };

  const newArticle = new ArticleModel(newthumbNail);
  const newArticleBody = new BobyModel(newarticleBody);

  try {
    let authResponse;
    if (editor) {
      authResponse = AuthAuthor(email, authorPassword, editor.Email, editor);
    } else {
      res.status(404).json({ message: "Email not matched" });
      return;
    }

    if (authResponse.isAuth) {
      await newArticle.save();
      await newArticleBody.save();
      res.status(201).json({ message: "Successfull created article" });
    } else {
      res.status(401).json({ message: authResponse.message });
      return;
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const updateArticleBoby = async (req, res) => {
  const {
    title,
    quote,
    body,
    author,
    tags,
    isHeadLine,
    articleImgs,
    thumbnailImg,
    ID,
  } = req.body;

  let articleFields = {};
  let bodyField = {};

  if (title) articleFields.title = title;
  if (title) bodyField.title = title;

  if (quote) articleFields.quote = quote;
  if (quote) bodyField.quote = quote;

  if (body) bodyField.body = body;
  if (author) articleFields.author = author;

  if (author) bodyField.author = author;

  if (tags) articleFields.tags = tags;
  if (tags) bodyField.tags = tags;

  if (articleImgs) bodyField.articleImgs = articleImgs;
  if (articleImgs) articleFields.thumbnailImg = thumbnailImg;
  if (isHeadLine) articleFields.isHeadLine = isHeadLine;
  console.log("00 :: ", req.body._id);
  try {
    let article = await ArticleModel.find({
      _id: req.body._id,
    });
    console.log("----  ", bodyField);
    if (article.length === 0)
      return res.status(404).json({ msg: "Article not Found." });

    const articleUpdate = await BobyModel.updateOne(
      { ID: { $eq: article[0].ID } },
      bodyField
    );

    return res.status(200).json(articleUpdate);
  } catch (error) {
    res.status(409).json({ message11: error.message });
  }
};

export const deleteAerticle = async (req, res) => {
  const idToDelete = req.body;

  let articleThumbnail = await ArticleModel.findOne({ ID: idToDelete.ID });

  let articleBodies = await BobyModel.findOne({ ID: idToDelete.ID });

  try {
    let result = await ArticleModel.deleteOne({
      _id: articleThumbnail._id,
    });

    let result2 = await BobyModel.deleteOne({
      _id: articleBodies._id,
    });

    res.status(200).json({ ArticleThumbnail: result, ArticleBody: result2 });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
