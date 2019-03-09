let resultsDiv;

function search() {
  resultsDiv = document.getElementById('results');
  let shown = [];
  for (let i = 0; i < suggestions[0].length; i++) {
    shown.push(false);
  }
  let results = [];
  for (queryKeyword of query) {
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
