const MediaModel = require("../models/mediaModel");
const cloudninary = require("../middleware/cloudinary");
const fs = require("fs");

const AddMedia = async (req, res) => {
  try {
    const uploader = async (path) => await cloudninary.uploads(path, "Assets");
    const { filename, path } = req.file;
    const mediaUrl = await uploader(path);
    const media = { url: mediaUrl.url, img: filename };
    const Media = new MediaModel({
      assets: media,
    });
    await Media.save();
    res.status(201).send("Media Added");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getMedia = async (req, res) => {
  try {
    const media = await MediaModel.find();
    res.send(media);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const deleteMedia = async (req, res) => {
  try {
    const id = req.params.id;
    const media = await MediaModel.findByIdAndDelete(id);
    fs.unlinkSync("Images/" + media.assets[0].img);

    res.send(`Media has been deleted.`);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = {
  AddMedia,
  getMedia,
  deleteMedia,
};
