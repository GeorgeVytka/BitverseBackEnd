import bcrypt from "bcrypt";
//const bcrypt = require('bcrypt');
import mongoose from "mongoose";
import Editor from "../models/editor.js";
const saltRounds = 10;

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    res.status(200).json({ message: hash });
  } catch (error) {}
};
