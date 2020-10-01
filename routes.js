const express = require('express')
const router = express.Router()

// Importing mongoose model
const Blog = require('./Model/Model')

router.get('/', function (req, res) {
  res.redirect('/blogs')
})

//Index Route
router.get('/blogs', function (req, res) {
  Blog.find({}, function (err, blogs) {
    if (err) console.log(err)
    else res.render('index', { blogs: blogs })
  })
})

//New Route
router.get('/blogs/new', function (req, res) {
  res.render('new')
})

//Create Route
router.post('/blogs', function (req, res) {
  //Create blog
  req.body.blog.body = req.sanitize(req.body.blog.body)
  Blog.create(req.body.blog, function (err, newBlog) {
    if (err) res.render('new')
    //the, redirect to index
    else res.redirect('/blogs')
  })
})

//Show Route
router.get('/blogs/:id', function (req, res) {
  Blog.findById(req.params.id, function (err, foundBlog) {
    if (err) res.redirect('/blogs')
    else res.render('show', { blog: foundBlog })
  })
})

//Edit route
router.get('/blogs/:id/edit', function (req, res) {
  Blog.findById(req.params.id, function (err, foundBlog) {
    if (err) res.redirect('/blogs')
    else res.render('edit', { blog: foundBlog })
  })
})

//Update route
router.put('/blogs/:id', function (req, res) {
  let body = req.body
  Blog.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: body },
    { new: true, useFindAndModify: false },
    function (err, updatedBlog) {
      if (err) {
        res.redirect('/blogs')
      } else {
        updatedBlog.title = body.blog[0]
        updatedBlog.image = body.blog[1]
        updatedBlog.body = body.blog[2]
        updatedBlog.save()
        res.redirect('/blogs/' + req.params.id)
      }
    }
  )
})

//Delete route
router.delete('/blogs/:id', function (req, res) {
  //Destroy blog
  Blog.findByIdAndRemove(req.params.id, function (err) {
    if (err) res.redirect('/blogs')
    else res.redirect('/blogs')
  })
})

module.exports = router
