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

// Parse courses.csv, containing all courses available
let courses = csvParser(fs.readFileSync('data/courses.csv'), {
  comment : '$'
});

// Parse newestCourses.csv, containing the newest courses
let newestCourses = csvParser(fs.readFileSync('data/newestCourses.csv'), {
  comment : '$'
});

// Parse stats.json, containing the statistics for all courses, used to calculate mostPopular list
let stats = JSON.parse(fs.readFileSync('data/stats.json'));

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

// Necessary files for different usages throughout the site
// All information about the Python-Courses
let pythonCourses = JSON.parse(fs.readFileSync('data/pythonCourses.json', 'utf-8'));
// All information about the HTML-Courses
let htmlCourses = JSON.parse(fs.readFileSync('data/htmlCourses.json', 'utf-8'));
// All information about how to colour code
let codeHighlighting = JSON.parse(fs.readFileSync('data/codeHighlighting.json', 'utf-8'));

// Characters used for XSS : What they should be replaced with
let illegalCharacters = {'"' : '\\"',
                         "'" : "\\'",
                         '>' : '&gt',
                         '<' : '&lt'};

// The time to wait to write the stats for courses in ms
let mostPopularInterval = 1000 * 60 * 5;

// An array containing the names of the five most popular courses (Calculated by the amount of clicks)
let mostPopularCourses = [];

// Update the array containing the five most popular courses
updateMostPopular();

// Set Interval to write new stats for courses to file
setInterval(function() {
  // Update the array with containing the most popular courses
  updateMostPopular();
  // Write the new stats to the file stats.json
  fs.writeFileSync('data/stats.json', JSON.stringify(stats));
}, mostPopularInterval);

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
    'mostPopularCourses' : mostPopularCourses,
    'newestCourses' : newestCourses
  });
});

app.get('/journal', function(req, res) {
  res.sendFile('data/journal.html', {root: __dirname })
});

// Routing for contactpage
app.get('/2f8a6bf31f3bd67bd2d9720c58b19c9a', function(req, res) {
  res.render('contact', {
    'courses' : courses
  });
});

// Routing for about us page
app.get('/about', function(req, res) {
  res.render('about', {
    'courses' : courses
  });
});

// Save the message posted on the contactpage
app.post('/2f8a6bf31f3bd67bd2d9720c58b19c9a', urlencodedParser, function(req, res) {
  if (req.body !== {}) fs.appendFileSync('data/messages.txt', 'Name: ' + req.body.forename + ' ' + req.body.surname + '\nE-Mail: ' + req.body.email + '\nMessage: ' + req.body.message + '\n\n' + '-'.repeat(50) + '\n\n');
  res.redirect('/2f8a6bf31f3bd67bd2d9720c58b19c9a')
});

// Routing for courses page
app.get('/courses', urlencodedParser, function(req, res) {
  // If there is a query
  if (req.query.query) {
    // Escapes illegal characters inside the query
    for (illegalCharacter in illegalCharacters) req.query.query = req.query.query.replace(new RegExp(illegalCharacter, 'g'), illegalCharacters[illegalCharacter]);
  }
  res.render('courses', {
    'courses' : courses,
    'query' : req.query.query
  });
});

// Routing for the python programming page. Seperate, since it needs pythonCourses, while other courses don't
app.get('/languages/python', function(req, res) {
  res.render('languages/python', {
    'path' : '/languages/python',
    'partialsPath' : '../partials/',
    'courses' : courses,
    'pythonCourses' : pythonCourses,
    'codeHighlighting' : codeHighlighting
  });
});

// Routing for the HTML coding page. Serparate, since it needs htmlCourses, while other courses don't
app.get('/languages/html', function(req, res) {
  res.render('languages/html', {
    'path' : '/languages/html',
    'partialsPath' : '../partials/',
    'courses' : courses,
    'htmlCourses' : htmlCourses,
    'codeHighlighting' : codeHighlighting
  });
});

// All the routing for the courses inside data/courses.csv
for (let i = 0; i < courses[0].length; i++) {
  app.get(courses[1][i], function(req, res) {
    // If the .ejs file for the site exists, render it and update stats
    if (fs.existsSync('public/views/' + pathsToCourses[i] + '.ejs')) {
      // Increment stats for course or else create new entry
      stats[courses[0][i]] = stats[courses[0][i]] + 1 || 1;
      // Render the site
      res.render(pathsToCourses[i], {
        'path' : pathsToCourses[i],
        'partialsPath' : '../'.repeat(pathsToCourses[i].match(/\//g).length) + 'partials/',
        'courses' : courses,
        'codeHighlighting' : codeHighlighting
      });
    }
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

// Updates the array of most popular courses
function updateMostPopular() {
  let clicksArr = [];
  // Generate an array containing key - value pairs of array stats
  for (let key in stats) clicksArr.push([key, stats[key]]);
  // Sort clicksArr by amount of clicks
  clicksArr.sort((a, b) => a[1] < b[1]);
  // Set mostPopularCourses to be the names of the courses with the top five amounts of clicks
  mostPopularCourses = clicksArr.map((a) => a[0]).slice(0, 5);
}

// Listen on port 3000
app.listen(3000);
