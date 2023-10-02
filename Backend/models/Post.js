const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
     title: {
          type: String,
     },
     summary: {
          type: String,
     },
     content: {
          type: String,
     },
     file: {
          type: String,
     },
     author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
     },
     date: {
          type: Date,
          default: Date.now(),
     },
});
module.exports = mongoose.model("Post", PostSchema);
