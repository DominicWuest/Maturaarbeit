// ----- Start of Imports -----

let express = require('express');
let bodyParser = require('body-parser');
let fs = require('fs');
let path = require('path');
let csvParser = require('csv-parse/lib/sync');

// ----- End of Imports -----

// Declaration of the app
let app = express();

// Declare the urlbody parser
let urlencodedParser = bodyParser.urlencoded({extended : false});

// Parse mostPopular.csv, containing the current most popular courses
let mostPopular = csvParser(fs.readFileSync('data/mostPopular.csv'), {
  comment : '$'
});

// Parse courses.csv, containing all courses available
let courses = csvParser(fs.readFileSync('data/courses.csv'), {
  comment : '$'
});

// Parse newestCourses.csv, containing the newest courses
let newestCourses = csvParser(fs.readFileSync('data/newestCourses.csv'), {
  comment : '$'
});

// Create the paths to all the courses
let pathsToCourses = courses[1].map(function(path) {
  // File isn't the file which the folder is named after
  if (path.length - path.replace(/\//g, '').length != 1) return path.substring(1).replace(/\//g, '/');
  // File is the file which the folder is named after
  else return path.substring(1) + '/' + path.substring(1);
});

// Organize the keywords since it is easier to interpret them all when they're arrays
courses[2] = courses[2].map(function (element) {
  // Return the string splitted on spaces. Creates an array even if there is no space in the word
  return element.split(' ');
});

let pythonCourses = JSON.parse(fs.readFileSync('data/pythonCourses.json', 'utf-8'));
let codeHighlighting = JSON.parse(fs.readFileSync('data/codeHighlighting.json', 'utf-8'));

// Characters not allowed inside queries : What they should be replaced with
let illegalCharacters = {'"' : '\\"',
                         "'" : "\\'",
                         '>' : '&gt',
                         '<' : '&lt'};

// Directory for static files
app.use(express.static('public'));
// Static directory for ejs files
app.set('views', path.join(__dirname, 'public/views'));
// Set the view engine to ejs
app.set('view engine', 'ejs');

// Routing for Homepage
app.get('/', function(req, res) {
  res.render('index', {
    'courses' : courses,
    'mostPopular' : mostPopular,
    'newestCourses' : newestCourses
  });
});

// Routing for contactpage
app.get('/contact', function(req, res) {
  res.render('contact', {
    'courses' : courses
  });
});

// Save the message posted on the contactpage
app.post('/contact', urlencodedParser, function(req, res) {
  if (req.body !== {}) fs.appendFileSync('data/messages.txt', 'Name: ' + req.body.forename + ' ' + req.body.surname + '\nE-Mail: ' + req.body.email + '\nMessage: ' + req.body.message + '\n\n' + '-'.repeat(50) + '\n\n');
  res.redirect('/contact')
});

// Routing for courses page
app.get('/courses', urlencodedParser, function(req, res) {
  // If there is a query
  if (req.query.query) {
    // Escapes illegal characters inside the query
    for (illegalCharacter in illegalCharacters) req.query.query.replace(new RegExp(illegalCharacter, 'g'), illegalCharacters[illegalCharacter]);
  }
  console.log(req.query.query)
  res.render('courses', {
    'courses' : courses,
    'query' : req.query.query
  });
});

// Routing for the python programming page. Seperate, since it needs pythonCourses, while other courses don't
app.get('/languages/python', function(req, res) {
  res.render('languages/python', {
    'courses' : courses,
    'path' : '/languages/python',
    'pythonCourses' : pythonCourses,
    'codeHighlighting' : codeHighlighting
  });
});

// All the routing for the courses inside data/courses.csv
for (let i = 0; i < courses[0].length; i++) {
  app.get(courses[1][i], function(req, res) {
    // If the .ejs file for the site exists, render it
    if (fs.existsSync('public/views/' + pathsToCourses[i] + '.ejs')) res.render(pathsToCourses[i], {
      'path' : pathsToCourses[i],
      'courses' : courses,
      'codeHighlighting' : codeHighlighting
    });
    // If the .ejs file doesn't exist, render underconstruction.ejs
    else res.render('underconstruction', {
      'courses' : courses
    });
  });
}

// Render 404.ejs if the page doesn't exist
app.use(function(req, res, next) {
  res.status(404);
  res.render('404');
});

// Listen on port 3000
app.listen(3000);
