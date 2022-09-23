import bcrypt from "bcrypt";
//const bcrypt = require('bcrypt');
import mongoose from "mongoose";
import Editor from "../models/editor.js";
const saltRounds = 10;

export const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);

  const newEditor = new Editor({ name: name, email: email, password: hash });
  try {
    await newEditor.save();

    res.status(200).json(newEditor);
  } catch (error) {
    console.log(error);
  }
};
