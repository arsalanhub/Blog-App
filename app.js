require('dotenv').config();
var express         = require("express"),
    app             = express(),
    methodOverride  = require("method-override"),
    bodyParser      = require("body-parser"),
    expressSantizer = require("express-sanitizer"),
    mongoose        = require("mongoose");


//APP CONFIG
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb+srv://mohdarsalan:1234@cluster0.bpk8vbq.mongodb.net/?retryWrites=true&w=majority");
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSantizer());
app.use(methodOverride("_method"));

//Importing blog schema 

var Blog = require("./models/Blog");

//RESTful Routes

app.get("/",function(req,res){
    res.redirect("/blogs");
});

//Index Route
app.get("/blogs",function(req,res){
	Blog.find({},function(err, blogs){
         if(err) console.log(err);
         else res.render("index",{blogs: blogs});
	});
});

//New Route
app.get("/blogs/new",function(req,res){
    res.render("new");
}); 

//Create Route
app.post("/blogs",function(req,res){
    //Create blog
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog,function(err, newBlog){
        if(err) res.render("new");
        else
            //the, redirect to index
            res.redirect("/blogs");
    });
});

//Show Route
app.get("/blogs/:id",function(req,res){
    Blog.findById(req.params.id,function(err, foundBlog){
        if(err) res.redirect("/blogs");
        else res.render("show", {blog: foundBlog});
    });
});

//Edit route
app.get("/blogs/:id/edit",function(req, res){
    Blog.findById(req.params.id,function(err, foundBlog){
        if(err) res.redirect("/blogs");
        else res.render("edit",{blog: foundBlog});
    });
});

//Update route
app.put("/blogs/:id",function(req,res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err) res.redirect("/blogs");
        else res.redirect("/blogs/" + req.params.id)
    });
});

//Delete route
app.delete("/blogs/:id",function(req,res){
    //Destroy blog
    Blog.findByIdAndRemove(req.params.id, function(err){
         if(err) res.redirect("/blogs");
         else res.redirect("/blogs");
    });
});

// module.exports = app;

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server Has Started on port 3000!!");
});
