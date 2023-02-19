import mongoose from "mongoose";
const { Schema } = mongoose;

const articleSchema = mongoose.Schema({
  ID: Number,
  title: String,
  author: String,
  tags: [String],
  isHeadLine: Boolean,

  thumbnailImg: String,

  views: Number,

  createdAt: { type: Date, default: Date.now },
});

const ArticleModel = mongoose.model("ArticleThumbNail", articleSchema);

export default ArticleModel;
