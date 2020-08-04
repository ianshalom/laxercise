function toggleDropdown() {
  let navbarToggle = document.getElementById("navbar-toggle");
  if (navbarToggle.className === "Nav") {
    navbarToggle.className += " responsive";
  } else {
    navbarToggle.className = "Nav";
  }
}
