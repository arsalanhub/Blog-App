var express = require('express'),
  app = express(),
  methodOverride = require('method-override'),
  bodyParser = require('body-parser'),
  expressSantizer = require('express-sanitizer'),
  mongoose = require('mongoose')

// Importing Routes
const routes = require('./routes')

//Mongoose Config
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

app.use('/', routes)

var port = process.env.PORT || 3000

app.listen(port, () => {
  console.log('Server Has Started!')
})
