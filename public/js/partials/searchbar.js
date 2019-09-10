// Max amount of suggestions shown
const maxSuggestions = 5;
// Boolean indicating whether the searchbar is focused or not
let focused = false;

// Gets called when the input of the searchbar gets changed
function showSuggested() {
  // Declaration of the div where the suggestions should be displayed
  let suggestionsDiv = document.getElementById("suggestions");
  // Remove every list element currently inside the suggestions div
  while (suggestionsDiv.firstChild) {
    suggestionsDiv.removeChild(suggestionsDiv.firstChild);
  }
  // A boolean indicating whether there are suggestions matching the input
  let suggested = false;
  // Declaration of the search bar inside the document
  let searchBar = document.getElementById("searchBar");
  // The current content from the searchbar
  let input = searchBar.value.split(' ');
  // Don't show any recommendations if input is empty
  if (input[0] === '' && input.length === 1) {
    searchBar.style.borderRadius = "1vh";
    return;
  }
  // Get the first five suggestions from the search function
  let suggestions = search(input).splice(0, 5);
  // Add all suggestions to the suggestions div
  for (suggestion of suggestions) {
    // Create new anchor which contains the title of the suggestion whose keyword starts with the input
    let a = document.createElement('a');
    let linkText = document.createTextNode(suggestion["name"]);
    a.appendChild(linkText);
    a.href = suggestion["href"];
    suggestionsDiv.appendChild(a);
  }
  if (suggestions.length > 0) {
    searchBar.style.borderBottomLeftRadius = "0";
    searchBar.style.borderBottomRightRadius = "0";
  } else searchBar.style.borderRadius = "1vh";
}

// Gets called when the searchbar loses focus
function hideSuggested() {
  if (!focused) {
    // Remove every list element currently inside the div
    let suggestionsDiv = document.getElementById("suggestions");
    while (suggestionsDiv.firstChild) suggestionsDiv.removeChild(suggestionsDiv.firstChild);
    // Reset border of searchbar to 10px
    let searchBar = document.getElementById("searchBar");
    searchBar.style.borderRadius = "1vh";
  }
  focused = false;
}

// Gets called on every keyinput event
function sendQuery(event) {
  // If the Enter key was pressed
  if (event.keyCode == 13) {
    // Redirect to /courses with the query
    window.location.href='/courses?query=' + document.getElementById('searchBar').value;
  }
}
