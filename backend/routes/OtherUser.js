const express = require("express");
const Router = express.Router();
const User = require("../models/User");

Router.get("/:id", async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });

  const firstName = user.firstName;
  const lastName = user.lastName;
  const picture = user.picture;
  const designation = user.designation;
  const websiteUrl = user.websiteUrl;
  const city = user.city;
  const state = user.state;

  res.json({
    firstName,
    lastName,
    picture,
    websiteUrl,
    designation,
    city,
    state,
  });
});

module.exports = Router;
