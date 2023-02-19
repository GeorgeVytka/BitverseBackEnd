import mongoose from "mongoose";
const { Schema } = mongoose;

const articleSchema = mongoose.Schema({
  ID: Number,
  title: String,
  quote: String,
  author: String,
  body: [String],
  tags: [String],
  articleImgs: [String],

  views: Number,

  createdAt: { type: Date, default: Date.now },
});

const BobyModel = mongoose.model("ArticleBody", articleSchema);

export default BobyModel;
