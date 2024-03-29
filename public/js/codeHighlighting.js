// Adds code highlighting to code displayed on site. The highlighting is applied to every code element whose class contains a programming language present inside codeHighlighting.json
function addHighlighting() {
  // All languages of codeHighlighting.json / i.e. its keys
  let languages = Object.keys(codeHighlighting);
  let codeSnippets = document.getElementsByTagName('CODE');
  // Iterate over every code element in the document
  for (let i = 0; i < codeSnippets.length; i++) {
    // Continue with the next code snippet if the current one is empty
    if (codeSnippets[i].length === 0) continue;
    // String of all classnames of the element
    let elementClass = codeSnippets[i].className;
    // The language of the code, declared in the following for-loop
    let language = '';
    // Iterate over every programming lanuage inside the languages array
    for (programmingLanguage of languages) {
      // If the programming language is inside the elements classes, declare the variable language to be that programming language
      if (elementClass.includes(programmingLanguage)) language = programmingLanguage;
    }
    if (language === '') continue;
    // Add a rule for strings
    let style = document.createElement('style');
    style.appendChild(document.createTextNode(''));
    document.head.appendChild(style);
    let sheet = style.sheet;
    sheet.insertRule('code .string, code .string * { color: ' + codeHighlighting[language]["strings"]["color"] + ' !important; }');
    // Escape less than and greater than
    let code = codeSnippets[i].textContent.replace(/&/g, '&amp').replace(/</g, '&lt').replace(/>/g, '&gt').split('\n');
    // Check every line seperately, simplifies the process of colouring comments
    for (let i = 0; i < code.length; i++) {
      let line = code[i];
      // Colour Strings
      for (stringNotation of codeHighlighting[language]["strings"]["character"]) {
        // If true -> start new span tag, if false -> closes old span tag. Declared before iterating over the lines, so that mutliline strings get recognized correctly
        let tagIndex = true;
        // If the string notation is not inside the currently checked line, continue with next line or string notation
        if (!line.includes(stringNotation)) continue;
        let splittedLine = line.split(stringNotation);
        for (let j = 0; j < splittedLine.length - 1; j++) {
          // Add the alt string in order to identify them later and add a class to them (not now so as to not collide with syntax-element-highlighting)
          if (tagIndex) splittedLine[j] += '<span alt="stringElement">' + stringNotation;
          else splittedLine[j] += stringNotation + '</span>';
          // Flip the value of tagIndex
          tagIndex = !tagIndex;
        }
        line = splittedLine.join('');
        // Finish the open string span if it hasnt been closed yet
        if (!tagIndex) line += '</span>';
      }
      // Characters to be ignored when checking to highlight syntax elements, fields and functions
      let ignoredCharacters = codeHighlighting[language]["ignoredCharacters"];
      // Colour all Syntax Elements
      // Replaces a global search RegExp matching the syntax element with preceding and following characters to be ignored or line start/end with the syntax element encapsulated in a span element and the ignored characters
      for (syntaxElement in codeHighlighting[language]["syntax"]) {
        // Replace syntax element two times as otherwise every other occurence would be skipped due to a JS-quirk with the lastIndex variable
        line = line.replace(new RegExp('(' + ignoredCharacters + '|^)' + syntaxElement + '(' + ignoredCharacters + '|[&nbsp]?$)', 'g'), '$1<span style="color: ' + codeHighlighting[language]["syntax"][syntaxElement] + ';">' + syntaxElement + '</span>$2');
        line = line.replace(new RegExp('(' + ignoredCharacters + '|^)' + syntaxElement + '(' + ignoredCharacters + '|[&nbsp]?$)', 'g'), '$1<span style="color: ' + codeHighlighting[language]["syntax"][syntaxElement] + ';">' + syntaxElement + '</span>$2');
      }
      // Colour functions
      line = line.replace(new RegExp('([[ ()\\.\t;]{1}|^)([^\\W\\d]\\w*)(?=(\\(){1})', 'g'), '$1<span style="color: ' + codeHighlighting[language]["functions"] + ';">$2</span>');
      // Colour fields
      line = line.replace(new RegExp('\\.([^\\W\\d]\\w*)(?=(' + ignoredCharacters + '|\\.|[&nbsp]?$){1})', 'g'), '.<span style="color: ' + codeHighlighting[language]["fields"] + ';">$1</span>');
      // Colour Comments
      line = line.split(codeHighlighting[language]["comments"]["character"]);
      // If the length of the split line is greater than one, there is a comment character included in the line
      for (let j = 0; j < line.length - 1; j++) {
        // If the comment doesn't come from a span-tag (colour declared with hex-value) and if the comment isn't inside a string
        let wholeLine = line.slice(0, j + 1).reduce((acc, curr) => acc + curr);
        let stringOccurences = 0;
        for (stringNotation of codeHighlighting[language]["strings"]["character"]) {
          stringOccurences += wholeLine.split(new RegExp(stringNotation, 'g')).length - 1;
          if (stringOccurences % 2 === 1) break;
        }
        if (line[j].substring(line[j].length - 14) !== "style=\"color: " && stringOccurences % 2 !== 1) {
          // Create new span-tag and end it at the end of the line
          line[j] += '<span class="comment" style="color: ' + codeHighlighting[language]["comments"]["color"] + '";>';
          line[line.length - 1] += '</span>';
          // Break loop since comments span until the very end of the line
          break;
        }
      }
      // Join the splitt line with the comment character
      line = line.join(codeHighlighting[language]["comments"]["character"]);
      code[i] = line;
    }
    // Join the code with newlines, making it a one-line string again
    code = code.join('\n');
    // Set the innerHTML of the code element to the newly generated, styled code
    codeSnippets[i].innerHTML = code;
  }
  let comments = document.getElementsByClassName('comment')
  for (let j = 0; j < comments.length; j++) {
    comments[j].innerHTML = comments[j].textContent;
  }
  // Add the class string to all string elements and remove the now unnecessary alt attribute
  let strings = document.querySelectorAll('[alt="stringElement"]');
  for (let i = 0; i < strings.length; i++) {
    strings[i].classList.add('string');
    strings[i].removeAttribute('alt');
  }
}
