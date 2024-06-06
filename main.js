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
