import * as fs from 'fs';
let fs = require('fs');

// Check availablity of linked site
function checkAvailability(id) {
  let coursePath = document.getElementById(id + 'link').getAttribute("href");
  console.log('public/views' + coursePath + '.ejs');
  if (fs.existsSync('public/views' + coursePath + '.ejs')) document.getElementById(id + 'link').style.textDecoration = "line-through";
}
