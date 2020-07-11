var mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  imageName: {
    type: String,
    default: "none",
    required: true,
  },
  imageData: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    reqiured: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const Image = mongoose.model("Image", ImageSchema);

module.exports = Image;
