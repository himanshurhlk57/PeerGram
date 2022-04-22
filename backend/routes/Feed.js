const express = require("express");
const Router = express.Router();
const Feed = require("../models/Feed");
const { cloudinary } = require("../utils/cloudinary");

Router.post("/", async (req, res) => {
  try {
    const fileStr = req.body.feedImage;
    if (fileStr) {
      var uploadedResponse = await cloudinary.uploader.upload(fileStr, {
        upload_preset: "buzzAppImage",
      });
    }
    const { caption, username, postDate, usernameProfilePicture } = req.body;

    const feed = new Feed({
      caption,
      username,
      postDate,
      usernameProfilePicture,
      feedImage: uploadedResponse.url,
    });
    await feed.save();

    res.status(201).json({ message: "Feed created successfully" });
  } catch (err) {
    console.log(err);
  }
});

Router.get("/", async (req, res) => {
  try {
    const feedData = await Feed.find().sort({ _id: -1 });
    res.json(feedData);
  } catch (err) {
    console.log(err);
  }
});

Router.delete("/:id", async (req, res) => {
  const post = await Feed.findByIdAndRemove(req.params.id);

  if (!post) {
    return res.status(404).send("The Post with given id is not exist");
  }

  res.json("Successfully deleted");
});

module.exports = Router;
