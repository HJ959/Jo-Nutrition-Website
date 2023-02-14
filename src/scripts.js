const navbarItems = document.getElementsByClassName("collapsable")
export function navMenuMover() {
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
window.navMenuMover = navMenuMover
document.getElementById("burger").addEventListener("click", navMenuMover)

document.addEventListener("resize", bigWindowMenuShower)

export function bigWindowMenuShower(event) {
  if (window.innerWidth > 600) {
    for (var i = 0; i < navbarItems.length; i++) {
      navbarItems[i].style.display = "block"
    }
  }
}