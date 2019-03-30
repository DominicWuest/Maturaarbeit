// Gets the query of /courses and appends search results to resultsDiv. The information of the courses comes from the suggestions array, declared in the header.ejs file. It receives the array from app.js.
function search() {
  // The div to which the results will be appended to
  let resultsDiv = document.getElementById('results');
  // The array containing all results
  let results = [];
  // If query is empty
  if (query[0] === '' && query.length <= 1) {
    // Append every course to results array and sort it alphabetically
    for (let i = 0; i < suggestions[0].length; i++) {
      results.push({
        'name' : suggestions[0][i],
        'href' : suggestions[1][i],
        'keywords' : suggestions[2][i].join(', ')
      });
    }
    results.sort((a, b) => a['name'] > b['name'] ? 1 : -1);
  }
  // The query is not empty
  else {
    // An array indicating whether a course is already in resultsDiv or not. Filled with false at the beginning
    let shown = Array(suggestions[0].length).fill(false);
    // Iterate over every word inside the query
    for (queryKeyword of query) {
      // If the keyword is empty, continue with next keyword
      if (queryKeyword === '') continue;
      // Iterate over every course
      for (let i = 0; i < suggestions[0].length; i++) {
        // If the title of the course starts with the query keyword
        if (suggestions[0][i].toLowerCase().startsWith(queryKeyword)) {
          // Append course to results array
          results.push({
            'name' : suggestions[0][i],
            'href' : suggestions[1][i],
            'keywords' : suggestions[2][i].join(', ')
          });
          shown[i] = true;
          continue;
        }
      }
      // Iterate over every course
      for (let i = 0; i < suggestions[0].length; i++) {
        // If the course is already in the results array, there's not need to check it again
        if (shown[i]) continue;
        // Iterate over every keyword of the course
        for (keyword of suggestions[2][i]) {
          // If the keyword of the course starts witch the query keyword
          if (keyword.startsWith(queryKeyword)) {
            // Append course to results array
            results.push({
              'name' : suggestions[0][i],
              'href' : suggestions[1][i],
              'keywords' : suggestions[2][i].join(', ')
            });
            shown[i] = true;
            // No need to check other keywords of the course => break loop
            break;
          }
        }
      }
    }
  }
  // If there are no courses which match the query, show error message
  if (results.length == 0) {
    let errorDiv = document.createElement('DIV');
    errorDiv.classList.add('error');
    let errorText = document.createElement('P');
    errorDiv.appendChild(errorText);
    errorText.innerHTML = 'Deine Suchanfrage: <span class="query">' + query.join(' ') + '</span> scheint keinen Kursen gleichzukommen.\nProbiere doch, den erwünschten Kurs in der <a href="/courses">Liste aller Kurse</a> zu suchen.'
    resultsDiv.appendChild(errorDiv);
    return;
  }
  // Append every result to the results div, creating a link to the course and displaying its name and keywords
  for (result of results) {
    let newDiv = document.createElement('DIV');
    let title = document.createElement('A');
    title.href = result['href'];
    let titleHeader = document.createElement('H2');
    titleHeader.textContent = result['name'];
    title.appendChild(titleHeader);
    newDiv.appendChild(title);
    let keywords = document.createElement('P');
    keywords.textContent = 'Schlagwörter: ' + result['keywords'];
    newDiv.appendChild(keywords);
    resultsDiv.appendChild(newDiv);
  }
}
