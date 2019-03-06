function addHighlighting() {
  for (language in codeHighlighting) {
    let code = document.getElementById(language).innerHTML.split('\n');
    let text = document.getElementById(language).textContent.split('\n');
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
          tagIndex = !tagIndex
        }
        line = splittedLine.join('');
      }
      // Colour all Syntax Elements
      for (syntaxElement in codeHighlighting[language]["syntax"]) {
        line = line.replace(new RegExp(syntaxElement,'g'), '<span style="color: ' + codeHighlighting[language]["syntax"][syntaxElement] + '";>' + syntaxElement + '</span>');
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
    document.getElementById(language).innerHTML = code;
  }
}
