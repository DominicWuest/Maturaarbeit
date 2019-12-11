const names = ['alice', 'public', 'bob'];
const interval = 2000;
let running = false;

function keyExchange() {
  if (running) return;
  running = true;
  let spans = document.querySelectorAll('#factions span');
  for (let i = 0; i < spans.length; i++) spans[i].style.color = 'rgba(0, 0, 0, 0)';
  let alice = document.getElementById('alice');
  let public = document.getElementById('public');
  let bob = document.getElementById('bob');
  let process = document.getElementById('factionsProcess');
  let g = 10;
  let p = 541;
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
  let ga = (g ** (a / 4) % p) ** 4 % p;
  let gb = (g ** (b / 4) % p) ** 4 % p;
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
  let gab = ((g ** (a / 5) % p) ** (b / 5) % p) ** 25 % p;
  setTimeout(function() {
    displayText('ga', ga, true, true, true);
    displayText('gb', gb, true, true, true);
    process.innerHTML = 'Berechnen von g<sup>ab</sup>...';
  }, 5 * interval);
  setTimeout(function() {
    displayText('gab', gab, true, false, true);
    process.innerHTML = 'Schlüsselübergabe erfolgreich beendet';
    running = false;
  }, 6 * interval);
}

function displayText(id, num, alice, public, bob) {
  let span = document.getElementById('alice' + id);
  span.innerHTML = alice ? num.toFixed() : '-';
  span.style.color = alice ? 'rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 0)';

  span = document.getElementById('public' + id);
  span.innerHTML = public ? num.toFixed() : '-';
  span.style.color = public ? 'rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 0)';

  span = document.getElementById('bob' + id);
  span.innerHTML = bob ? num.toFixed() : '-';
  span.style.color = bob ? 'rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 0)';
}
