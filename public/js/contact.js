var i=0;
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