import mongoose from "mongoose";
const { Schema } = mongoose;
const articleSchema = mongoose.Schema({
  title: String,
  quote: String,
  author: String,
  paragraphs: [String],
  tags: [String],
  isHeadLine: Boolean,

  thumbnail: String,
  articleImgs: [String],

  createdAt: { type: Date, default: Date.now },
});

const CreateArticle = mongoose.model("createArticle", articleSchema);

export default CreateArticle;
