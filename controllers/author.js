import bcrypt from "bcrypt";
//const bcrypt = require('bcrypt');
import mongoose from "mongoose";
import AutherModel from "../models/author.js";
import ArticleModel from "../models/articles.js";
const saltRounds = 10;

export const signUpAuthor = async (req, res) => {
  const author = {};

  const { Name, Email, Password, Bio, ProfilePic, Socials } = req.body;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(Password, salt);

  if (Name) author.Name = Name;
  if (Email) author.Email = Email;
  if (hash) author.Password = hash;
  if (Bio) author.Bio = Bio;
  if (ProfilePic) author.ProfilePic = ProfilePic;
  if (Socials) author.Socials = Socials;
  const newAuthor = new AutherModel(author);
  try {
    await newAuthor.save();

    res.status(201).json({ message: "Successfull created article", newAuthor });
  } catch (error) {
    res.status(401).json(error);
  }
};

export const getArticleByAuthor = async (req, res) => {
  const { author } = req.body;
  console.log("did it fire");
  try {
    const quryedArticles = await ArticleModel.find({
      author: author,
    });
    res.status(200).json(quryedArticles);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAuthor = async (req, res) => {
  const { author } = req.params;
  let quryedArticles = {};
  try {
    const quryedAuthor = await AutherModel.find({
      Name: author,
    }).then(
      (quryedArticles = await ArticleModel.find({
        author: author,
      }))
    );

    delete quryedArticles.Password;

    quryedAuthor[0].Password = "Not for you";
    quryedAuthor[0].Email = "Not for you";
    quryedAuthor[0].Articles = quryedArticles;

    if (quryedAuthor.length == 0) {
      res.status(404).json({ message: "No author with that name" });
    } else {
      res.status(200).json(quryedAuthor);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
  //
};
