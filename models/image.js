import mongoose from "mongoose";

const ImageSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
});
const savedImage = mongoose.model("imageSchema", ImageSchema);

export default savedImage;
