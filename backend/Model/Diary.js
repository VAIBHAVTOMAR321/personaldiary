const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const diarySchema = Schema(
  {
    name: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    //create a array of image url
    imageUrl: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }

);

module.exports = mongoose.model("diary", diarySchema);
