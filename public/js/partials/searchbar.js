// Max amount of suggestions shown
const maxSuggestions = 5;
// Boolean indicating whether the searchbar is focused or not
let focused = false;

// Gets called when the input of the searchbar gets changed
function showSuggested() {
  // Remove every list element currently inside the div
  let div = document.getElementById("suggestions");
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }
  // A boolean indicating whether there are suggestions matching the input
  let suggested = false;
  let searchBar = document.getElementById("searchBar");
  // The current content from the searchbar
  let input = searchBar.value.toLowerCase();
  // Don't show any recommendations if input is empty
  if (input === '') {
    searchBar.style.borderRadius = "1vh";
    return;
  }
  // Counter indicating how many list element have been created
  let suggestionsAmount = 0;
  // Iterate over every course
  for (let i = 0; i < suggestions[0].length; i++) {
    // If any of the keywords start with the input
    if (suggestions[2][i].some((element) => element.startsWith(input))) {
      // Create new anchor which contains the title of the suggestion whose keyword starts with the input
      var a = document.createElement('a');
      var linkText = document.createTextNode(suggestions[0][i]);
      a.appendChild(linkText);
      a.href = suggestions[1][i];
      div.appendChild(a);
      // There is at least one suggestion matching the input
      suggested = true;
      suggestionsAmount++;
    }
    // Stop adding more suggestions
    if (suggestionsAmount == maxSuggestions) break;
  }
  if (suggested) {
    searchBar.style.borderBottomLeftRadius = "0";
    searchBar.style.borderBottomRightRadius = "0";
  } else searchBar.style.borderRadius = "1vh";
}

// Gets called when the searchbar loses focus
function hideSuggested() {
  if (!focused) {
    // Remove every list element currently inside the div
    let div = document.getElementById("suggestions");
    while (div.firstChild) div.removeChild(div.firstChild);
    // Reset border of searchbar to 10px
    let searchBar = document.getElementById("searchBar");
    searchBar.style.borderRadius = "1vh";
  }
  focused = false;
}

// Gets called on every keyinput event
function sendQuery(event) {
  // If the key pressed is enter
  if (event.keyCode == 13) {
    // Redirect to /courses with the query
    let query = document.getElementById('searchBar').value;
    window.location.href='/courses?query=' + query;
  }
}
