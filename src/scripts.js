const navbarItems = document.getElementsByClassName("collapsable")
const firstNavbarSpacer = document.getElementsByClassName("navSpacer")[0]

export function navMenuMover() {
  if (navbarItems[0].style.display === "block") {
    for (var i = 0; i < navbarItems.length; i++) {
      navbarItems[i].style.display = "none"
      firstNavbarSpacer.style.height = "12vh"
    }
  } else {
    for (var i = 0; i < navbarItems.length; i++) {
      navbarItems[i].style.display = "block"
      firstNavbarSpacer.style.height = "25vh"
    }
  }
}
window.navMenuMover = navMenuMover
document.getElementById("burger").addEventListener("click", navMenuMover)

window.addEventListener("resize", bigWindowMenuShower)

export function bigWindowMenuShower(event) {
  if (window.innerWidth > 600) {
    for (var i = 0; i < navbarItems.length; i++) {
      navbarItems[i].style.display = "block"
    }
  }
}

console.log("Welcome curious developer and web aficionado. This website was created by Henry James. https://henryjames.space")