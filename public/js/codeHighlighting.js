
/**
 * addHighlighting - adds code highlighting to code displayed on site
 */
function addHighlighting() {
  /**
   * All languages of codeHighlighting.json / its first keys
   * @type {String[]}
   */
  let languages = Object.keys(codeHighlighting);
  // Get every code element from the document
  let codeSnippets = document.getElementsByTagName('CODE');
  // Iterate over every code element in the document
  for (let i = 0; i < codeSnippets.length; i++) {
    /**
     * String of all classnames of the element
     * @type {String}
     */
    let elementClass = codeSnippets[i].className;
    /**
     * The language of the code, declared in the following for-loop
     * @type {String}
     */
    let language;
    // Iterate over every programming lanuage inside languages array
    for (programmingLanguage of languages) {
      // If the programming language is inside the elements classes, declare language to be that programming language
      if (elementClass.includes(programmingLanguage)) language = programmingLanguage;
    }
    let code = codeSnippets[i].textContent.split('\n');
    let tagIndex = true;
    // Check every line seperately, makes it easier to colour comments
    for (let i = 0; i < code.length; i++) {
      let line = code[i];
      // Colour Strings
      for (stringNotation of codeHighlighting[language]["strings"]["character"]) {
        if (!line.includes(stringNotation)) continue;
        let splittedLine = line.split(stringNotation);
        let tagIndex = true;
        for (let j = 0; j < splittedLine.length - 1; j++) {
          if (tagIndex) splittedLine[j] += '<span style="color: ' + codeHighlighting[language]["strings"]["color"] + ';">' + stringNotation;
          else splittedLine[j] += stringNotation + '</span>';
          tagIndex = !tagIndex;
        }
        line = splittedLine.join('');
      }
      // Colour all Syntax Elements
      for (syntaxElement in codeHighlighting[language]["syntax"]) {
        words = line.split(' ');
        for (let j = 0; j < words.length; j++) {
          if (words[j].replace(/\t/g, '') === syntaxElement) words[j] = '<span style="color: ' + codeHighlighting[language]["syntax"][syntaxElement] + '";>' + words[j] + '</span>';
        }
        line = words.join(' ');
      }
      // Colour Comments
      line = line.split(codeHighlighting[language]["comments"]["character"]);
      if (line.length > 1) {
        for (let j = 0; j < line.length; j++) {
          if (line[j].substring(line[j].length - 14) !== "style=\"color: ") {
            line[j] = line[j] += '<span style="color: ' + codeHighlighting[language]["comments"]["color"] + '";>';
            line[line.length - 1] += '</span>';
            break;
          }
        }
      }
      line = line.join(codeHighlighting[language]["comments"]["character"]);
      code[i] = line;
    }
    // Join the code with newlines, making it a one-line string again
    code = code.join('\n');
    // Set the innerHTML of the code element to the newly generated, styled code
    codeSnippets[i].innerHTML = code;
  }
}
