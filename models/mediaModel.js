const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mediaSchema = new Schema({
  assets: {
    type: [Object],
    required: true,
  },
});

module.exports = mongoose.model("MediaModel", mediaSchema);
