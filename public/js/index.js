const maxSuggestions = 5; // Max amount of suggestions shown
let suggestions;
let focused = false;

function start(courses) { // Gets called when accessing the page
  suggestions = courses; // All available courses from data/courses.csv
}

function showSuggested() { // Gets called when the input of the searchbar gets changed
  let div = document.getElementById("suggestions"); // Remove every list element currently inside the div
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }
  let suggested = false; // False -> There are no suggestions available
  let searchBar = document.getElementById("searchBar");
  let input = searchBar.value.toLowerCase(); // The current content from the searchbar
  if (input === '') { // Don't show any recommendations if input is empty
    searchBar.style.borderRadius = "1vh";
    return;
  }
  let suggestionsAmount = 0; // Counter to see how many list element have been created
  for (let i = 0; i < suggestions[0].length; i++) { // Iterate over every course
    if (suggestions[2][i].some((element) => element.startsWith(input))) { // If any of the keywords start with the input
      var a = document.createElement('a'); // Create new anchor
      var linkText = document.createTextNode(suggestions[0][i]); // Anchor has the text of the suggestion whose keyword starts with the input
      a.appendChild(linkText);
      a.href = suggestions[1][i];
      div.appendChild(a);
      suggested = true; // There is at least one suggestion available
      suggestionsAmount++;
    }
    if (suggestionsAmount == maxSuggestions) break;
  }
  if (suggested) {
    searchBar.style.borderBottomLeftRadius = "0";
    searchBar.style.borderBottomRightRadius = "0";
  } else searchBar.style.borderRadius = "1vh";
}

function hideSuggested() { // Gets called when the searchbar loses focus
  if (!focused) {
    let div = document.getElementById("suggestions"); // Remove every list element currently inside the div
    while (div.firstChild) {
      div.removeChild(div.firstChild);
    }
    let searchBar = document.getElementById("searchBar"); // Reset border of searchbar to 10px
    searchBar.style.borderRadius = "1vh";
  }
  focused = false;
}
