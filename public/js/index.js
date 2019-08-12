function checkDropdown() {
  let dropdownChildElements = document.querySelectorAll('.coursesList > li > ul li > ul');
  // Starting at last index as otherwise the reference to the nested elements would be lost
  for (let i = dropdownChildElements.length - 1; i >= 0; i--) {
    let innerHTML = dropdownChildElements[i].parentElement.innerHTML;
    dropdownChildElements[i].parentElement.innerHTML = innerHTML.slice(0, innerHTML.indexOf('<', innerHTML.match(/^\W*/g)[0].length + 1)) + '<span class="dropdown"></span>' + innerHTML.slice(innerHTML.indexOf('<', innerHTML.match(/^\W*/g)[0].length + 1));
  }
}
