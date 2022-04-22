const express = require("express");
const Router = express.Router();
const User = require("../models/User");
const { cloudinary } = require("../utils/cloudinary");

Router.get("/:email", async (req, res) => {
  const userdata = await User.findOne({ email: req.params.email });
  res.json(userdata);
});

Router.put("/:id", async (req, res) => {
  // fetch previous store image
  const prevData = await User.findById({ _id: req.params.id });
  const prevPicture = prevData.picture;

  try {
    const fileStr = req.body.base64EncodedImage;
    var uploadedResponse = null;

    if (fileStr) {
      uploadedResponse = await cloudinary.uploader.upload(fileStr, {
        upload_preset: "dev_setups",
      });
      console.log(uploadedResponse);
    }

    let user = await User.findByIdAndUpdate(
      { _id: req.params.id },
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        designation: req.body.designation,
        websiteUrl: req.body.websiteUrl,
        gender: req.body.gender,
        birthday: req.body.birthday,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        picture: uploadedResponse ? uploadedResponse.url : prevPicture,
      },
      { new: true }
    );

    user = await user.save();
    console.log(user);
    res.send(user);
  } catch (error) {
    console.log(error);
  }
});

module.exports = Router;
