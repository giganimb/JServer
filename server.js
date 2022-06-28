const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Post = require("./models/post");
const Contact = require("./models/contact");

const app = express();

app.set("view engine", "ejs");

const PORT = 3000;
const db = "mongodb+srv://qwerty:1234567890@cluster0.52o1j.mongodb.net/node-course?retryWrites=true&w=majority";

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Connected to DB"))
    .catch((error) => console.log(error));

const createPath = (page) => path.resolve(__dirname, "ejs-views", `${page}.ejs`);

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}...`);
});

app.use(express.urlencoded({extended: false}));

app.get("/", (req, res) => {
    // res.send("<h1>Hello world!</h1>");
    const title = 'Home';
    res.render(createPath("index"), {title});
});

app.get("/contacts", (req, res) => {
    const title = 'Contacts';
    Contact
        .find()
        .then((contacts) => res.render(createPath("contacts"), {contacts, title}))
        .catch((error) => {
            console.log(error);
            res.render(createPath("error"), {title: "Error"});
        });
});

app.get("/about-us", (req, res) => {
    res.render("/contacts");
});

app.get("/posts/:id", (req, res) => {
    const title = 'Post';
    Post
        .findById(req.params.id)
        .then((post) => res.render(createPath("post"), {post, title}))
        .catch((error) => {
            console.log(error);
            res.render(createPath("error"), {title: "Error"});
        });
  });
  
  app.get("/posts", (req, res) => {
    const title = 'Posts';
    Post
        .find()
        .sort({ createdAt: -1 })
        .then((posts) => res.render(createPath("posts"), {posts, title}))
        .catch((error) => {
            console.log(error);
            res.render(createPath("error"), {title: "Error"});
        });
  });
  
  app.post("/add-post", (req, res) => {
    const { title, author, text} = req.body;
    const post = new Post({title, author, text});
    post
        .save()
        .then((result) => res.redirect("/posts"))
        .catch((error) => {
            console.log(error);
            res.render(createPath("error"), {title: "Error"});
        });
  });

  app.get("/add-post", (req, res) => {
    const title = 'Add Post';
    res.render(createPath('add-post'), { title });
  });


app.use((req, res) => {
    res
    .status(404)
    .render(createPath("error"));
});