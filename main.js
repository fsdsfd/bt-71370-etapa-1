import './SASS/main.scss'
// AUDIO CARDS
document.querySelectorAll('.card__image').forEach(function(image) {
    const audioId = image.getAttribute('data-audio');
    const audioElement = document.getElementById(audioId);

    image.addEventListener('mouseover', function() {
        audioElement.play();
    });

    image.addEventListener('mouseout', function() {
        audioElement.pause();
        audioElement.currentTime = 0;
    });
});
// BACKGROUND COLOR DEL INDEX CAMBIA DEPENDIENDO DE LA HORA EN LA QUE EL USUARIO INGRESE
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

}
window.onload = ColorHora;

// CARROUSEL DE IMAGENES

const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel-button-right');
const prevButton = document.querySelector('.carousel-button-left');

const slideWidth = slides[0].getBoundingClientRect().width;

let currentIndex = 0;

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
};

slides.forEach((slide, index) => {
  slide.style.left = slideWidth * index + 'px';
});

nextButton.addEventListener('click', e => {
  const currentSlide = track.querySelector('.current-slide');
  let nextSlide = currentSlide.nextElementSibling;
  const nextIndex = (currentIndex + 1) % slides.length;

  if (!nextSlide) {
    nextSlide = slides[0]; // Vuelve a la primera diapositiva
  }

  moveToSlide(track, currentSlide, nextSlide);
  currentIndex = nextIndex;
});

prevButton.addEventListener('click', e => {
  const currentSlide = track.querySelector('.current-slide');
  let prevSlide = currentSlide.previousElementSibling;
  const prevIndex = (currentIndex - 1 + slides.length) % slides.length;

  if (!prevSlide) {
    prevSlide = slides[slides.length - 1]; // Vuelve a la última diapositiva
  }

  moveToSlide(track, currentSlide, prevSlide);
  currentIndex = prevIndex;
});

slides[0].classList.add('current-slide');