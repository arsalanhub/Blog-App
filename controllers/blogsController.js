const mongoose = require("mongoose");
const Blog = require("../models/Blog");

const getBlogs = (req, res) => {
  // Get Blogs
  Blog.find({}, function (err, blogs) {
    if (err) console.log(err);
    else res.render("index", { blogs: blogs });
  });
};

const createBlogs = (req, res) => {
  //Create blog
  req.body.blog.body = req.sanitize(req.body.blog.body);
  Blog.create(req.body.blog, function (err, newBlog) {
    if (err) res.render("new");
    //then, redirect to index
    else res.redirect("/blogs");
  });
};

const showBlogs = (req, res) => {
  Blog.findById(req.params.id, function (err, foundBlog) {
    if (err) res.redirect("/blogs");
    else res.render("show", { blog: foundBlog });
  });
};

const editBlogs = (req, res) => {
  Blog.findById(req.params.id, function (err, foundBlog) {
    if (err) res.redirect("/blogs");
    else res.render("edit", { blog: foundBlog });
  });
};

const updateBlogs = (req, res) => {
  req.body.blog.body = req.sanitize(req.body.blog.body);
  Blog.findByIdAndUpdate(
    req.params.id,
    req.body.blog,
    function (err, updatedBlog) {
      if (err) res.redirect("/blogs");
      else res.redirect("/blogs/" + req.params.id);
    }
  );
};

const deleteBlogs = (req, res) => {
  //Destroy blog
  Blog.findByIdAndRemove(req.params.id, function (err) {
    if (err) res.redirect("/blogs");
    else res.redirect("/blogs");
  });
};

module.exports = {
  getBlogs,
  createBlogs,
  showBlogs,
  editBlogs,
  updateBlogs,
  deleteBlogs,
};
