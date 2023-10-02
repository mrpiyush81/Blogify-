const express = require("express");
const cors = require("cors");
const multer = require("multer");
const uploadMiddle = multer({ dest: "uploads/" });
const fs = require("fs");
const jwt = require("jsonwebtoken");
const app = express();
var cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const User = require("./models/User");
const Post = require("./models/Post");
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
const bcrypt = require("bcrypt");
const screte = "opopop";
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
async function mongoconnet() {
     try {
          await mongoose.connect("mongodb://127.0.0.1:27017/blog-web");
     } catch (error) {
          console.log(error);
     }
}

app.use("/uploads", express.static(__dirname + "/uploads"));

app.post("/register", async (req, res) => {
     try {
          const { formData } = await req.body;

          let { username, password } = await formData;
          password = await bcrypt.hash(password, 10);
          try {
               const userdoc = await User.create({ username, password });
               res.json({ username, password });
          } catch (error) {
               res.status(400).json(error);
          }
     } catch (error) {
          console(error);
     }
});
app.get("/profile", async (req, res) => {
     try {
          let { token } = req.cookies;
          if (token) {
               let verified = jwt.verify(token, screte);
               res.json(verified);
          }
     } catch (error) {
          console.log(error);
     }
});

app.get("/logout", (req, res) => {
     res.clearCookie("token");
     res.send("Cookie cleared");
});

app.post("/post", uploadMiddle.single("file"), async (req, res) => {
     try {
          var { originalname, path } = req.file;
          var parts = originalname.split(".");
          var ext = parts[parts.length - 1];
          var newpath = path + "." + ext;

          fs.renameSync(path, newpath);

          var { title, summary, content } = req.body;
          var { token } = req.cookies;

          var verified = jwt.verify(token, screte);
     } catch (error) {
          console.log(error);
     }

     try {
          const postdoc = await Post.create({
               title,
               summary,
               content,
               file: newpath,
               author: verified.id,
          });
          res.json(postdoc);
     } catch (error) {
          console.log(error);
     }
});

app.post("/login", async (req, res) => {
     const { formData } = await req.body;
     let { username, password } = await formData;

     try {
          const userdoc = await User.findOne({ username });

          let passok = await bcrypt.compare(password, userdoc.password);

          if (passok) {
               let token = jwt.sign({ username, id: userdoc.id }, screte, {
                    expiresIn: "2h",
               });

               res.cookie("token", token).json({
                    username,
               });
          } else {
               res.status(400).json("wrong credentaial");
          }
     } catch (error) {
          res.status(400).json(error);
     }
});
app.get("/post", async (req, res) => {
     try {
          const posts = await Post.find()
               .populate("author", ["username"])
               .sort({ date: -1 });
          res.json(posts);
     } catch (error) {
          console(error);
     }
});

app.get("/post/:id", async (req, res) => {
     const { id } = req.params;
     try {
          const postdoc = await Post.findById(id).populate("author", [
               "username",
          ]);

          res.json(postdoc);
     } catch (error) {
          console(error);
     }
});

app.put("/post", uploadMiddle.single("file"), async (req, res) => {
     try {
          let newpath = null;
          if (req.file) {
               const { originalname, path } = req.file;
               const parts = originalname.split(".");
               const ext = parts[parts.length - 1];
               newpath = path + "." + ext;

               fs.renameSync(path, newpath);
          }
          const { id, title, summary, content } = req.body;

          let { token } = req.cookies;
          let verified = jwt.verify(token, screte);

          const postdoc = await Post.findById(id);

          const isauthor =
               JSON.stringify(postdoc.author._id) ===
               JSON.stringify(verified.id);

          if (!isauthor) {
               res.status(400).json("you are not author");
          }

          const resss = await Post.findByIdAndUpdate(id, {
               title,
               summary,
               content,
               file: newpath ? newpath : postdoc.file,
          });

          res.json(resss);
     } catch (error) {
          res.json(error);
     }
});
app.delete("/delete/:id", async (req, res) => {
     const { id } = req.params;
     try {
          const delet = await Post.findByIdAndDelete(id);
          res.json(delet);
     } catch (error) {
          console.log(error);
     }
});

mongoconnet();

app.listen(4000);
