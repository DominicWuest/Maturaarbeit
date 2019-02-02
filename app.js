// ----- Start of Imports -----

var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// ----- End of Imports -----

var app = express();
var urlencodedParser = bodyParser.urlencoded({extended : true});

app.use(express.static("public")); // Directory for static files like css
app.set('views', path.join(__dirname, 'public/views')); // Static directory for ejs files
app.set("view engine", "ejs"); // Set the view engine to ejs (res.render)

app.get('/', function(req, res) { // Homepage
  res.render("index");
});

app.listen(3000); // Listen on port 3000
