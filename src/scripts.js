window.addEventListener("load", () => {
  const overlay = document.getElementById("loadOverlay");
  if (overlay) overlay.classList.add("hidden");
});

const navbarItems = document.getElementsByClassName("collapsable");

export function navMenuMover() {
  if (!navbarItems.length) return;

  const isOpen = navbarItems[0].style.display === "block";
  for (const item of navbarItems) {
    item.style.display = isOpen ? "none" : "block";
  }
}

let _resizeTimer;
export function bigWindowMenuShower() {
  clearTimeout(_resizeTimer);
  _resizeTimer = setTimeout(() => {
    if (window.innerWidth > 900) {
      for (const item of navbarItems) {
        item.style.display = "block";
      }
    }
  }, 100);
}