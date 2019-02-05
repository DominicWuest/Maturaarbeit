const maxSuggestions = 5;
const suggestions = getSuggestions();

function showSuggested() {
  var div = document.getElementById("suggestions"); // Remove every list element currently inside the div
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }
  var input = document.getElementById("searchBar").value.toLowerCase();
  if (input === '') return; // Don't show any recommendations if input is empty
  var i = 0; // Counter to see how many list element have been created
  for (suggestion of suggestions) {
    if (i === maxSuggestions) break;
    if (suggestion.toLowerCase().startsWith(input)) {
      var node = document.createElement("LI");
      var textNode = document.createTextNode(suggestion);
      node.appendChild(textNode);
      div.appendChild(node);
      i++;
    }
  }
}

function getSuggestions() {
  return ['A', 'Ab', 'Abc', 'abcd', 'abcde', 'abcdef'];
}
