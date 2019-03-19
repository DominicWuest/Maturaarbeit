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
