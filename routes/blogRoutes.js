const express = require("express");
const {
  getBlogs,
  createBlogs,
  showBlogs,
  editBlogs,
  updateBlogs,
  deleteBlogs,
} = require("../controllers/blogsController");

const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/blogs");
});

router.get("/blogs/new", function (req, res) {
  res.render("new");
});

router.get("/blogs", getBlogs);

//Create Route
router.post("/blogs", createBlogs);

//Show Route
router.get("/blogs/:id", showBlogs);

//Edit route
router.get("/blogs/:id/edit", editBlogs);

//Update route
router.put("/blogs/:id", updateBlogs);

//Delete route
router.delete("/blogs/:id", deleteBlogs);

module.exports = router;
