import Handlebars from 'handlebars';
import './SASS/main.scss'
const url = 'http://localhost:7777/productos/'
const start = async ()=>{
    try {
        const respuesta = await fetch('/img/templates/card.hbs')
        if (!respuesta) {
            throw new Error('Error al enviar la card', respuesta.status)
        }
        const plantilla = await respuesta.text()
        console.log(plantilla)
        const template = Handlebars.compile(plantilla)
        console.log(template)
        const respuestaBack = await fetch(url)
        console.log(respuestaBack)
        if (!respuestaBack.ok) {
            throw new Error('Error al enviar la respuesta al back', respuestaBack.status)
        }
        const dataProductos = await respuestaBack.json()
        const data = {productos : dataProductos}
        const html = template(data)
        const contenedorCards = document.querySelector('#contenedor-cards')
        contenedorCards.innerHTML = html 
    } catch (error) {
        console.log('start', error)
    }
}
window.addEventListener('DOMContentLoaded', start)

// USER CONFIGURATION

// AUDIO CARDS
// const AudioCards = () => {
//     document.querySelectorAll('.card__image').forEach(function(image) {
//         const audioId = image.getAttribute('data-audio');
//         debugger
//         const audioElement = document.getElementById(audioId);
    
//         image.addEventListener('mouseover', function() {
//             audioElement.play();
//             debugger
//         });
    
//         image.addEventListener('mouseout', function() {
//             audioElement.pause();
//             audioElement.currentTime = 0;
//         });
//     });
// }
// window.addEventListener('DOMContentLoaded', AudioCards)

// BACKGROUND COLOR DEL INDEX CAMBIA DEPENDIENDO DE LA HORA EN LA QUE EL USUARIO INGRESE

// Configuración el dots de editar y eliminar a solo productos creados por el usuario


function ColorHora() {
    let hora = new Date().getHours()
    const elemento = document.querySelector('.body-index');
    let gradiante;
    if (hora >= 9 && hora <= 12){
        gradiante = 'linear-gradient(0deg,#200000 0%, #c38327 99%)'
    }else if(hora >= 12 && hora <= 18){
        gradiante = 'linear-gradient(0deg,#200000 0%, #4b7b9f 99%)'
    }else{
        gradiante = 'linear-gradient(0deg,#000000 0%, #1B2838 99%)'
    }
    elemento.style.backgroundImage = gradiante;
    console.log(elemento)
}
window.onload = ColorHora;

// // CARROUSEL
// const track = document.querySelector('.cards-carrousel__boton');
// const slides = Array.from(track.children);
// const nextButton = document.querySelector('.anterior');
// const prevButton = document.querySelector('.siguiente');

// const moveToSlide = (currentSlide, targetSlide) => {
//     currentSlide.classList.remove('carousel__actual');
//     targetSlide.classList.add('carousel__actual');
// };

// prevButton.addEventListener('click', () => {
//     const currentSlide = track.querySelector('.carousel__actual');
//     const prevSlide = currentSlide.previousElementSibling || slides[slides.length - 1];

//     moveToSlide(currentSlide, prevSlide);
// });

// nextButton.addEventListener('click', () => {
//     const currentSlide = track.querySelector('.carousel__actual');
//     const nextSlide = currentSlide.nextElementSibling || slides[0];

//     moveToSlide(currentSlide, nextSlide);
// });

// Hacer un alta funcional
