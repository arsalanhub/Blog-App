  var express = require('express'),
  app = express(),
  methodOverride = require('method-override'),
  bodyParser = require('body-parser'),
  expressSantizer = require('express-sanitizer'),
  mongoose = require('mongoose')

//APP CONFIG
mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)
mongoose.connect('mongodb://localhost/restful_blog_app')

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressSantizer())
app.use(methodOverride('_method'))

//Mongoose/Model CONFIG
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: { type: Date, default: Date.now },
})

var Blog = mongoose.model('Blog', blogSchema)

//RESTful Routes

app.get('/', (req, res)=> {
  res.redirect('/blogs')
})

//Index Route
app.get('/blogs', (req, res)=> {
  Blog.find({}, (err, blogs)=> {
    if (err) console.log(err)
    else res.render('index', { blogs: blogs })
  })
})

//New Route
app.get('/blogs/new', (req, res)=> {
  res.render('new')
})

//Create Route
app.post('/blogs', (req, res)=> {
  //Create blog
  req.body.blog.body = req.sanitize(req.body.blog.body)
  Blog.create(req.body.blog, (err, newBlog)=> {
    if (err) res.render('new')
    //the, redirect to index
    else res.redirect('/blogs')
  })
})

//Show Route
app.get('/blogs/:id', (req, res)=> {
  Blog.findById(req.params.id,  (err, foundBlog)=> {
    if (err) res.redirect('/blogs')
    else res.render('show', { blog: foundBlog })
  })
})

//Edit route
app.get('/blogs/:id/edit',  (req, res)=> {
  Blog.findById(req.params.id,  (err, foundBlog)=> {
    if (err) res.redirect('/blogs')
    else res.render('edit', { blog: foundBlog })
  })
})

//Update route
app.put('/blogs/:id',  (req, res) =>{
  let body = req.body
  Blog.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: body },
    { new: true, useFindAndModify: false },
     (err, updatedBlog)=> {
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
app.delete('/blogs/:id',  (req, res)=> {
  //Destroy blog
  Blog.findByIdAndRemove(req.params.id,  (err) =>{
    if (err) res.redirect('/blogs')
    else res.redirect('/blogs')
  })
})

var port = process.env.PORT || 3000
app.listen(port,  ()=> {
  console.log('Server Has Started!')
})
