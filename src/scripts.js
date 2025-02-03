const navbarItems = document.getElementsByClassName("collapsable")

export function navMenuMover() {
  if (!navbarItems.length) {
    console.error("Navbar items or first nav spacer not found");
    return;
  }

  if (navbarItems[0].style.display === "block") {
    for (var i = 0; i < navbarItems.length; i++) {
      navbarItems[i].style.display = "none"
    }
  } else {
    for (var i = 0; i < navbarItems.length; i++) {
      navbarItems[i].style.display = "block"
    }
  }
}

export function bigWindowMenuShower(event) {
  if (!navbarItems.length) {
    console.error("Navbar items not found");
    return;
  }
  if (window.innerWidth > 900) {
    for (var i = 0; i < navbarItems.length; i++) {
      navbarItems[i].style.display = "block"
    }
  }
}

console.log("Welcome curious developer and web aficionado. This website was created by Henry James. https://henryjames.space")