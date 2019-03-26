
/**
 * search - Gets the query of /courses and appends search results to resultsDiv
 */
function search() {
  /**
   * The div to which the results will be appended to
   * @type {object}
  */
  let resultsDiv = document.getElementById('results');
  /**
   * The array containing all results
   * @type {object[]}
   */
  let results = [];
  // If query is empty
  if (query[0] === '' && query.length <= 1) {
    // Append every course to results and sort them alphabetically
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
    /**
     * An array indicating whether a course is already in resultsDiv or not. Filled with false
     * @type {boolean[]}
     */
    let shown = Array(suggestions[0].length).fill(false);
    for (queryKeyword of query) {
      if (queryKeyword === '') continue;
      for (let i = 0; i < suggestions[0].length; i++) {
        if (suggestions[0][i].toLowerCase().startsWith(queryKeyword)) {
          results.push({
            'name' : suggestions[0][i],
            'href' : suggestions[1][i],
            'keywords' : suggestions[2][i].join(', ')
          });
          shown[i] = true;
          continue;
        }
      }
      for (let i = 0; i < suggestions[0].length; i++) {
        if (shown[i]) continue;
        for (keyword of suggestions[2][i]) {
          if (keyword.startsWith(queryKeyword)) {
            results.push({
              'name' : suggestions[0][i],
              'href' : suggestions[1][i],
              'keywords' : suggestions[2][i].join(', ')
            });
            shown[i] = true;
            break;
          }
        }
      }
    }
  }
  if (results.length == 0) {
    let errorDiv = document.createElement('DIV');
    errorDiv.classList.add('error');
    let errorText = document.createElement('P');
    errorDiv.appendChild(errorText);
    errorText.innerHTML = 'Deine Suchanfrage: <span class="query">' + query.join(' ') + '</span> scheint keinen Kursen gleichzukommen.\nProbiere doch, den erwünschten Kurs in der <a href="/courses">Liste aller Kurse</a> zu suchen.'
    resultsDiv.appendChild(errorDiv);
    return;
  }
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
