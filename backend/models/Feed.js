const mongoose = require("mongoose");

const feedSchema = new mongoose.Schema({
  caption: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  postDate: {
    type: Date,
    default: Date.now,
  },
  usernameProfilePicture: {
    type: String,
    required: true,
  },
  feedImage: {
    type: String,
    required: true,
  },
});

const Feed = mongoose.model("Feed", feedSchema);

module.exports = Feed;
