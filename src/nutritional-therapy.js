// generic normalize styles
import './normalize.css'
// global site css 
import './main.css'
// specific css for home page
import './nutritional-therapy.css'
// import some useful UX scripts
import './scripts'

const arrows = document.getElementById("arrow")
function arrowHider(event) {
    arrows.style.display = "none"    
}
document.addEventListener("scroll", arrowHider)