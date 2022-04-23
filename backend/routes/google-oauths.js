const mongoose = require("mongoose");
const express = require("express");
const Router = express.Router();
const dotenv = require("dotenv");
const { OAuth2Client } = require("google-auth-library");
const Login = require("../models/google-oauth");
const User = require("../models/User");

dotenv.config();
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

Router.post("/", async (req, res) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  });

  const { name, email, picture } = ticket.getPayload();

  const splitData = name.split(" ");

  let loginuser = await Login.findOne({ email: email });

  let user = await User.findOne({ email: email });

  let id = null;

  if (!loginuser && !user) {
    loginuser = new Login({
      name: name,
      email: email,
      picture: picture,
    });

    user = new User({
      firstName: splitData[0],
      lastName: splitData[1],
      email: email,
      picture: picture,
    });

    const result1 = await loginuser.save();
    const result2 = await user.save();

    id = result2._id;

    console.log(result1);
    console.log(result2);
  }

  if (!id) {
    id = user._id;
  }

  res.status(201);
  res.json({ id, email, name, picture });
});

module.exports = Router;
