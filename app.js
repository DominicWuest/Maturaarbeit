// ----- Start of Imports -----

var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var csvParser = require('csv-parse/lib/sync');

// ----- End of Imports -----

var app = express();
var urlencodedParser = bodyParser.urlencoded({extended : true});

var mostPopular = csvParser(fs.readFileSync('data/mostPopular.csv'), {
  comment : '$'
});

var courses = csvParser(fs.readFileSync('data/courses.csv'), {
  comment : '$'
});

var pathsToCourses = courses[1].map(function(path) {
  if (path.length - path.replace(/\//g, '').length != 1) return path.substring(1).replace(/\//g, '\\'); // File isn't the file which the folder is named after
  else return path.substring(1) + '\\' + path.substring(1); // File is the file which the folder is named after
});

courses[2] = courses[2].map(function (element) { // Organize the keywords
  if (element.includes(' ')) return element.split(' '); // Return either the splitted string or the string in an array
  else return [element];
});

app.use(express.static('public')); // Directory for static files like css
app.set('views', path.join(__dirname, 'public/views')); // Static directory for ejs files
app.set('view engine', 'ejs'); // Set the view engine to ejs (res.render)

app.get('/', function(req, res) { // Homepage
  res.render('index', {
    'courses' : courses,
    'mostPopular' : mostPopular
  });
});

for (let i = 0; i < courses[0].length; i++) { // All the routing for the courses inside data/courses.csv
  app.get(courses[1][i], function(req, res, next) {
    if (!fs.existsSync('public/views/' + pathsToCourses[i] + '.ejs')) res.render('underconstruction');
    else res.render(pathsToCourses[i]);
  });
}

app.use(function(req, res, next) {
  res.status(404);
  res.render('404');
});

app.listen(3000); // Listen on port 3000
