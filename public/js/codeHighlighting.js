
/**
 * addHighlighting - adds code highlighting to code displayed on site. The highlighting is applied to every code element whose class contains a programming language, present inside codeHighlighting.json
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
      // If the programming language is inside the elements classes, declare the variable language to be that programming language
      if (elementClass.includes(programmingLanguage)) language = programmingLanguage;
    }
    let code = codeSnippets[i].textContent.split('\n');
    /**
     * If true -> start new span tag, if false -> close old span tag. Declared before iterating over the lines, so that mutliline strings get recognized correctly
     * @type {boolean}
     */
    let tagIndex = true;
    // Check every line seperately, simplifies the process of colouring comments
    for (let i = 0; i < code.length; i++) {
      let line = code[i];
      // Colour Strings, iterate over eery string notation of the programming language
      for (stringNotation of codeHighlighting[language]["strings"]["character"]) {
        // If the string notation is not inside the currently checked line, continue with next string notation
        if (!line.includes(stringNotation)) continue;
        // Split the line on  the string notation
        let splittedLine = line.split(stringNotation);
        // Iterate over every element in the line splitted on the string notation
        for (let j = 0; j < splittedLine.length - 1; j++) {
          // Start new span tag if tagIndex == true
          if (tagIndex) splittedLine[j] += '<span style="color: ' + codeHighlighting[language]["strings"]["color"] + ';">' + stringNotation;
          // Close span tag if tagIndex == false
          else splittedLine[j] += stringNotation + '</span>';
          // Flip the value of tagIndex
          tagIndex = !tagIndex;
        }
        line = splittedLine.join('');
      }
      // Colour all Syntax Elements
      // Iterate over every Syntax Element inside codeHighlighting.json
      for (syntaxElement in codeHighlighting[language]["syntax"]) {
        // Split the line on every word (seperated by space)
        words = line.split(' ');
        // Iterate over the words
        for (let j = 0; j < words.length; j++) {
          // String the word from tabs and check if it equals the syntax element, replace it with span with its corresponding colour
          if (words[j].replace(/\t/g, '') === syntaxElement) words[j] = '<span style="color: ' + codeHighlighting[language]["syntax"][syntaxElement] + '";>' + words[j] + '</span>';
        }
        // Join the words with spaces so the old line is now the new, coloured line
        line = words.join(' ');
      }
      // Colour Comments
      // Split the line where the character for comments is found
      line = line.split(codeHighlighting[language]["comments"]["character"]);
      // If the length of the splitted line is greater than one, there is a comment character included in the line
      if (line.length > 1) {
        // Iterate over every element inside the splitted line
        for (let j = 0; j < line.length; j++) {
          // If the comment doesn't come from a span-tag (colour declared with hex-value)
          if (line[j].substring(line[j].length - 14) !== "style=\"color: ") {
            // Create new span-tag and end it at the end of the line
            line[j] = line[j] += '<span style="color: ' + codeHighlighting[language]["comments"]["color"] + '";>';
            line[line.length - 1] += '</span>';
            // Break loop since comments span until the very end of the line
            break;
          }
        }
      }
      // Join the splitted line with the comment character
      line = line.join(codeHighlighting[language]["comments"]["character"]);
      
      code[i] = line;
    }
    // Join the code with newlines, making it a one-line string again
    code = code.join('\n');
    // Set the innerHTML of the code element to the newly generated, styled code
    codeSnippets[i].innerHTML = code;
  }
}
