function addHighlighting() {
  let languages = Object.keys(codeHighlighting);
  let codeSnippets = document.getElementsByTagName('CODE');
  for (let i = 0; i < codeSnippets.length; i++) {
    let elementClass = codeSnippets[i].className;
    let language;
    for (programmingLanguage of languages) {
      if (elementClass.includes(programmingLanguage)) language = programmingLanguage;
    }
    let code = codeSnippets[i].textContent.split('\n');
    let tagIndex = true;
    for (let i = 0; i < code.length; i++) { // Check every line seperately, makes it easier for comments
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
    code = code.join('\n');
    codeSnippets[i].innerHTML = code;
  }
}
