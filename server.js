const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
require("dotenv").config();

const postRoutes = require("./routes/post-routes");
const postApiRoutes = require("./routes/api-post-routes");
const contactRoutes = require("./routes/contact-routes");
const contactApiRoutes = require("./routes/api-contact-routes");
const createPath = require("./helpers/create-path");


const app = express();

app.set("view engine", "ejs");

mongoose
    .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to DB"))
    .catch((error) => console.log(error));


app.listen(process.env.PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${process.env.PORT}...`);
});

app.use(express.urlencoded({ extended: false }));

app.use(express.static('styles'));

app.use(methodOverride("_method"));


app.get("/", (req, res) => {
    const title = 'Home';
    res.render(createPath("index"), { title });
});


app.use(postRoutes);
app.use(contactRoutes);
app.use(postApiRoutes);
app.use(contactApiRoutes);

app.use((req, res) => {
    res
        .status(404)
        .render(createPath("error"));
});