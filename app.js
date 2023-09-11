require("dotenv").config();
var express = require("express"),
  app = express(),
  methodOverride = require("method-override"),
  bodyParser = require("body-parser"),
  expressSantizer = require("express-sanitizer"),
  mongoose = require("mongoose");

//APP CONFIG
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect(
  "mongodb+srv://mohdarsalan:1234@cluster0.bpk8vbq.mongodb.net/?retryWrites=true&w=majority"
);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSantizer());
app.use(methodOverride("_method"));

//Importing blog schema
var Blog = require("./models/Blog");

// importing Routes
const blogRoutes = require("./routes/blogRoutes");

app.use("/api", blogRoutes);

// module.exports = app;

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server Has Started on port 3000!!");
});
