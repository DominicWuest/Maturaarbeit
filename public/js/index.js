function checkDeviceSize() { // Alert the user if they are using a smaller device
  if ((screen.width <= 768 && screen.height <= 1024) || (screen.width <= 1024 && screen.height <= 768)) {
    alert("Thank you for using our site! We noticed that you are accessing it with a smaller device. Please keep in mind that CSAcademy is best interacted with on a PC or Laptop.");
  }
}
