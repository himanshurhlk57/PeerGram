const express = require("express");
const app = express();

const mongoose = require("mongoose");
const googleAuth = require("./routes/google-oauths");
const userManage = require("./routes/Users");
const feed = require("./routes/Feed");
const allUser = require("./routes/AllUsers");
const otherUser = require("./routes/OtherUser");
const path = require("path");

require("dotenv").config();

const mongoUri = process.env.MONGO_URI;
mongoose
  .connect(mongoUri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err.message));

// app.use(express.json());
app.use(express.json({ limit: "50mb" }));

app.use("/api/google-login", googleAuth);

app.use("/api/data", userManage);

app.use("/api/feeds", feed);

app.use("/api/users", allUser);

app.use("/api/data/other", otherUser);

//serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    );
  });
} else {
  app.get("/", (req, res) => {
    res.send("Please set to production");
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
