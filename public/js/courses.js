function processQuery() {
  // Declare the div where the results should be displayed
  let resultsDiv = document.getElementById('results');
  // Get all results of the query
  results = search(query);
  // If there are no courses which match the query, show error message
  if (results.length === 0) {
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
