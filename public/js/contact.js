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

	if (!document.getElementById('checkbox').checked) {
		document.getElementById('checkboxDiv').style.color = '#F00';
		inputStatus = false;
	}

	if (!inputStatus) event.preventDefault();
}
var person = 1;

function checkwindow() {
	if (window.innerWidth <= 1350) {
		document.getElementById("person" + person).style.display = "grid";
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
