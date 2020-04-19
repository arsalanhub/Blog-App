var express     =require("express");
    app         =express(),
    bodyParser  =require("body-parser"),
    mongoose    =require("mongoose");

//APP CONFIG
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

//Mongoose/Model CONFIG
var blogSchema = new mongoose.Schema({
	title:   String,
	image:   String,
	body:    String,
	created: {type: Date, default: Date.now}
});

var Blog=mongoose.model("Blog", blogSchema);

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

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server Has Started!");
});
