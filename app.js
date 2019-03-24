// ----- Start of Imports -----

var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var csvParser = require('csv-parse/lib/sync');

// ----- End of Imports -----

var app = express();
var urlencodedParser = bodyParser.urlencoded({extended : false});

var mostPopular = csvParser(fs.readFileSync('data/mostPopular.csv'), {
  comment : '$'
});

var courses = csvParser(fs.readFileSync('data/courses.csv'), {
  comment : '$'
});

var newestCourses = csvParser(fs.readFileSync('data/newestCourses.csv'), {
  comment : '$'
});

var pathsToCourses = courses[1].map(function(path) {
  if (path.length - path.replace(/\//g, '').length != 1) return path.substring(1).replace(/\//g, '/'); // File isn't the file which the folder is named after
  else return path.substring(1) + '/' + path.substring(1); // File is the file which the folder is named after
});

courses[2] = courses[2].map(function (element) { // Organize the keywords
  if (element.includes(' ')) return element.split(' '); // Return either the splitted string or the string in an array
  else return [element];
});

var pythonCourses = JSON.parse(fs.readFileSync('data/pythonCourses.json', 'utf-8'));
var codeHighlighting = JSON.parse(fs.readFileSync('data/codeHighlighting.json', 'utf-8'));

var illegalCharacters = ['"', "'", '>', '<'];

app.use(express.static('public')); // Directory for static files like css
app.set('views', path.join(__dirname, 'public/views')); // Static directory for ejs files
app.set('view engine', 'ejs'); // Set the view engine to ejs (res.render)

app.get('/', function(req, res) { // Homepage
  res.render('index', {
    'courses' : courses,
    'mostPopular' : mostPopular,
    'newestCourses' : newestCourses
  });
});

app.get('/contact', function(req, res) {
  res.render('contact', {
    'courses' : courses
  });
});

app.post('/contact', urlencodedParser, function(req, res) {
  if (req.body !== {}) fs.appendFileSync('data/messages.txt', 'Name: ' + req.body.forename + ' ' + req.body.surname + '\nE-Mail: ' + req.body.email + '\nMessage: ' + req.body.message + '\n\n' + '-'.repeat(50) + '\n\n');
  res.redirect('/contact')
});

app.get('/courses', urlencodedParser, function(req, res) {
  if (req.query.query) {
    for (illegalCharacter of illegalCharacters) {
      if (req.query.query.includes(illegalCharacter)) {
        res.writeHead(400, {'Content-Type' : 'text/plain'});
        res.end("Pls No XSS");
        return;
      }
    }
  }
  res.render('courses', {
    'courses' : courses,
    'query' : req.query.query
  });
});

app.get('/programminglanguages/python', function(req, res) {
  res.render('programminglanguages/python', {
    'courses' : courses,
    'path' : '/programminglanguages/python',
    'pythonCourses' : pythonCourses,
    'codeHighlighting' : codeHighlighting
  });
});

for (let i = 0; i < courses[0].length; i++) { // All the routing for the courses inside data/courses.csv
  app.get(courses[1][i], function(req, res) {
    if (fs.existsSync('public/views/' + pathsToCourses[i] + '.ejs')) res.render(pathsToCourses[i], {
      'path' : pathsToCourses[i],
      'courses' : courses,
      'codeHighlighting' : codeHighlighting
    });
    else res.render('underconstruction', {
      'courses' : courses
    });
  });
}

app.use(function(req, res, next) { // Render 404.ejs if the page doesn't exist
  res.status(404);
  res.render('404');
});

app.listen(3000); // Listen on port 3000
