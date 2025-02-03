// generic normalize styles
import './normalize.css'
// global site css 
import './main.css'
// specific css for home page
import './nutritional-therapy.css'
// import some useful UX scripts
import { navMenuMover, bigWindowMenuShower } from './scripts';

// Ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', function () {
    const burger = document.getElementById('burger');
    if (burger) {
        window.navMenuMover = navMenuMover
        burger.addEventListener('click', navMenuMover);
    }
    window.addEventListener('resize', bigWindowMenuShower);    
});

if (module.hot) {
    module.hot.accept();
}

const arrows = document.getElementById("arrow")
function arrowHider(event) {
    arrows.style.display = "none"    
}
document.addEventListener("scroll", arrowHider)