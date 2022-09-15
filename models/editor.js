import mongoose from "mongoose";
const { Schema } = mongoose;

const editorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    min: 6,
  },
  passwordConfirm: {
    type: String,
  },
});

const Editor = mongoose.model("editorSchema", editorSchema);

export default Editor;
