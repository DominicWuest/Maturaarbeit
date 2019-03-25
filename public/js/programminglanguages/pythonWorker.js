importScripts('./skulpt.min.js', './skulpt-stdlib.js');

let textContent = '';

onmessage = function(e) {
  if (e["data"] === '') return;
  Sk.pre = 'output';
  Sk.configure({output:outf, read:builtinRead});
  let myPromise = Sk.misceval.asyncToPromise(function() {
      return Sk.importMainWithBody('<stdin>', false, e["data"], true);
  });
  myPromise
  .then(function(suc) {
    postMessage(textContent);
  })
  .catch(function(err) { // Error in code
    postMessage('<span class="error">' + err.toString() + '</span>');
  });
}

function outf(text) {
    textContent += text;
}

function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles['files'][x] === undefined)
            throw "File not found: '" + x + "'";
    return Sk.builtinFiles['files'][x];
}
