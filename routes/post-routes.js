const express = require("express");

const { getPost, getEditPost, editPost, getPosts, deletePost, addPost, getAddPost } = require("../controllers/post-controller");

const router = express.Router();


router.get("/posts/:id", getPost);

router.get("/edit/:id", getEditPost);

router.put("/edit/:id", editPost);

router.get("/posts", getPosts);

router.delete("/posts/:id", deletePost);

router.post("/add-post", addPost);

router.get("/add-post", getAddPost);


module.exports = router;