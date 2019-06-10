const names = ['alice', 'public', 'bob'];
const interval = 1000;

function keyExchange() {
  let alice = document.getElementById('alice');
  let public = document.getElementById('public');
  let bob = document.getElementById('bob');
  let p = Math.random() * 1e21;
  let g = 0;
  displayText('p', p, true, true, true);
  setTimeout(function() {
    displayText('g', g, true, true, true);
  }, interval);
  let a = Math.random() * (p - 1);
  let b = Math.random() * (p - 1);
  setTimeout(function() {
    displayText('a', a, true, false, false);
    displayText('b', b, false, false, true);
  }, 2 * interval);
  let ga = g ** a % p;
  let gb = g ** b % p;
  setTimeout(function() {
    displayText('ga', ga, true, false, false);
    displayText('gb', gb, false, false, true);
  }, 3 * interval);
  setTimeout(function() {
    displayText('ga', ga, false, true, true);
    displayText('gb', gb, true, true, false);
  }, 4 * interval);
  let gab = g ** (a * b) % p;
  setTimeout(function() {
    displayText('gab', gab, true, false, true);
  }, 5 * interval);
}

function displayText(id, num, alice, public, bob) {
  if (alice) {
    let span = document.getElementById('alice' + id);
    span.innerHTML = num.toFixed();
    span.style.color = 'rgba(0, 0, 0, 1)';
  }
  if (public) {
    let span = document.getElementById('public' + id);
    span.innerHTML = num.toFixed();
    span.style.color = 'rgba(0, 0, 0, 1)';
  }
  if (bob) {
    let span = document.getElementById('bob' + id);
    span.innerHTML = num.toFixed();
    span.style.color = 'rgba(0, 0, 0, 1)';
  }
}
