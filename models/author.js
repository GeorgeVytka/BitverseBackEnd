import mongoose from "mongoose";
const { Schema } = mongoose;

const authorSchema = mongoose.Schema({
  Name: {
    type: String,
    required: true,
    trim: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  Password: {
    type: String,
    required: true,
    trim: true,
    min: 6,
  },
  Post: Number,
  Bio: String,
  ProfilePic: String,
  Articles: [String],
  Joined: { type: Date, default: Date.now },
});

const AutherModel = mongoose.model("Author", authorSchema);

export default AutherModel;
