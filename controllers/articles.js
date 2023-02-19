import express from "express";
import ArticleModel from "../models/articles.js";
import BobyModel from "../models/articleBody.js";

export const getAllArticles = async (req, res) => {
  try {
    const articles = await ArticleModel.find({});

    res.status(200).json(articles);
    console.log("get all the articles");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAllArticlesByTag = async (req, res) => {
  const { tags } = req.params;
  console.log("***************", tags);
  try {
    const quryedArticles = await ArticleModel.find({
      tags: { $all: [tags] },
    });

    if (quryedArticles.length == 0) {
      res.status(401).json({ message: "No articles with that tag found" });
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

  //if (ID) thumbNail.ID = ID;

  //console.log("000:: ", Date.now());

  const newthumbNail = { ...thumbNail, ID: Date.now() };
  const newarticleBody = { ...articleBody, ID: newthumbNail.ID };

  const newArticle = new ArticleModel(newthumbNail);
  const newArticleBody = new BobyModel(newarticleBody);

  try {
    await newArticle.save();
    await newArticleBody.save();
    res.status(201).json({ message: "Successfull created article" });
    console.log("article saved");
  } catch (error) {
    res.status(401).json({ message: error.message });
    console.error("failed to write article");
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
