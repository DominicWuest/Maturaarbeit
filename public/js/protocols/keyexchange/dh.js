const names = ['alice', 'public', 'bob'];
const interval = 2000;
let running = false;

function keyExchange() {
  if (running) return;
  running = true;
  let spans = document.querySelectorAll('#factions span');
  for (let i = 0; i < spans.length; i++) spans[i].style.color = 'rgba(0, 0, 0, 0)';
  console.log(spans);
  let alice = document.getElementById('alice');
  let public = document.getElementById('public');
  let bob = document.getElementById('bob');
  let process = document.getElementById('factionsProcess');
  let p = Math.random() * 1e21;
  let g = 0;
  process.innerHTML = 'Generierung von p...';
  setTimeout(function() {
    displayText('p', p, true, true, true);
    process.innerHTML = 'Generierung von g...';
  }, interval);
  let a = Math.random() * (p - 1);
  let b = Math.random() * (p - 1);
  setTimeout(function() {
    displayText('g', g, true, true, true);
    process.innerHTML = 'Generierung von a und b...';
  }, 2 * interval);
  let ga = g ** a % p;
  let gb = g ** b % p;
  setTimeout(function() {
    displayText('a', a, true, false, false);
    displayText('b', b, false, false, true);
    process.innerHTML = 'Berechnen von g<sup>a</sup> und g<sup>b</sup>...';
  }, 3 * interval);
  setTimeout(function() {
    displayText('ga', ga, true, false, false);
    displayText('gb', gb, false, false, true);
    process.innerHTML = 'Senden von g<sup>a</sup> und g<sup>b</sup>...';
  }, 4 * interval);
  let gab = g ** (a * b) % p;
  setTimeout(function() {
    displayText('ga', ga, false, true, true);
    displayText('gb', gb, true, true, false);
    process.innerHTML = 'Berechnen von g<sup>ab</sup>...';
  }, 5 * interval);
  setTimeout(function() {
    displayText('gab', gab, true, false, true);
    process.innerHTML = 'Schlüsselübergabe beendet...';
    running = false;
  }, 6 * interval);
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
