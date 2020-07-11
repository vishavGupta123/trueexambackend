const express = require("express");
const Image = require("../../models/image");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const ImagePath = path.join("uploads");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../..", ImagePath));
  },
  filename: function (req, file, cb) {
    cb(null, req.body.imageName);
  },
});

const upload = multer({ storage: storage });

router
  .route("/uploadImage")
  .post(upload.single("imageData"), (req, res, next) => {
    console.log(req.file);
    console.log(req.file.path);
    const newImage = new Image({
      imageName: req.body.imageName,
      imageData: ImagePath + "/" + req.file.filename,
      description: req.body.description,
      title: req.body.title,
    });
    newImage
      .save()
      .then((result) => {
        console.log(result);
        res.status(200).json({
          success: true,
          document: result,
        });
      })
      .catch((err) => next(err));
  });

router.get("/", (req, res) => {
  Image.find({}, function (err, images) {
    if (err) {
      return res.status(500).json({
        msg: "Error in database",
      });
    }
    return res.status(200).json({
      msg: "Images fetched successfully",
      images: images,
    });
  });
});

router.get("/:filename", (req, res) => {
  const fileName = req.params.filename;
  console.log(fileName);
  Image.findOne({ imageName: fileName }, function (err, file) {
    if (err) {
      console.log("Error in finding the image ");
      return res.status(500).json({
        msg: "Error in the database",
      });
    }
    console.log(file.imageData);
    return res.json({
      file: file,
    });
  });
});

module.exports = router;
