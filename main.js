import './SASS/main.scss'
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