const maxSuggestions = 5;
let suggestions;

function start(sug) {
  suggestions = sug;
}

function showSuggested() {
  let div = document.getElementById("suggestions"); // Remove every list element currently inside the div
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }
  let input = document.getElementById("searchBar").value.toLowerCase();
  if (input === '') return; // Don't show any recommendations if input is empty
  let suggestionsAmount = 0; // Counter to see how many list element have been created
  for (let i = 0; i < suggestions[0].length; i++) {
    for (keyword of suggestions[2][i]) {
      if (keyword.startsWith(input)) {
        console.log(suggestions[0][i]);
      }
    }
  }
}
