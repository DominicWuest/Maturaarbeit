function checkInput(event) {
	let inputStatus = true;
	if (document.contactform.forename.value == "") {
		document.getElementById("forename").placeholder = 'Bitte geben Sie Ihren Vornamen ein.';
		inputStatus = false;
	}

	if (document.contactform.surname.value == "") {
		document.getElementById("surname").placeholder = 'Bitte geben Sie Ihren Nachnamen ein.';
		inputStatus = false;
	}

	if (document.contactform.email.value == "") {
		document.getElementById("email").placeholder = 'Bitte geben Sie Ihre E-Mail-Adresse ein.';
		inputStatus = false;
	}

	if (document.contactform.message.value == "") {
		document.getElementById("message").placeholder = 'Bitte geben Sie Ihre Nachricht ein.';
		inputStatus = false;
	}

	if (!inputStatus) event.preventDefault();
}
var i=0;
var person = 1;
function correct1() {
	if (document.contactform.forename.value == "") {
		document.getElementById("forename").placeholder = 'Bitte Feld korrekt ausfüllen!';
		i+=1;
	}
}

function correct2() {
	if (document.contactform.surname.value == "") {
		document.getElementById("surname").placeholder = 'Bitte Feld korrekt ausfüllen!';
		i+=1;
	}
}

function correct3() {
	if (document.contactform.email.value == "") {
		document.getElementById("email").placeholder = 'Bitte Feld korrekt ausfüllen!';
		i+=1;
	}
}

function correct4() {
	if (document.contactform.message.value == "") {
		document.getElementById("message").placeholder = 'Bitte Feld korrekt ausfüllen!';
		i+=1;
	}
}

function stop() {
	if (i > 0) {
		return false;
	}
}

function checkwindow() {
	if (window.innerWidth <= 1350) {
		document.getElementById("person" + person).style.display = "grid";
		console.log("person" + person)
		person += 1;
		if (person == 4) {
			person = 1;
		}
		document.getElementById("person" + person).style.display = "none";
		person += 1;
		if (person == 4) {
			person = 1;
		}
		document.getElementById("person" + person).style.display = "none";
		}
		person += 1;
		if (person == 4) {
			person = 1;
		}
}

function imageswitch() {
	if (window.innerWidth <= 1350) {
		document.getElementById("person" + person).style.display = "none";
		person += 1;
		if (person == 4) {
			person = 1;
		}
		console.log("person" + person)
		document.getElementById("person" + person).style.display = "grid";
	}
}

function reset() {
	if (window.innerWidth > 1350) {
		document.getElementById("person1").style.display = "";
		document.getElementById("person2").style.display = "";
		document.getElementById("person3").style.display = "";
	}
}

window.addEventListener("resize", checkwindow);
window.addEventListener("load", checkwindow);
window.addEventListener("resize", reset);
