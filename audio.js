$('.sound').click(function() {
    $(this).toggleClass('sound-mute');

    var audio = document.getElementById('bgm');
    var speaker = document.getElementById('speaker');
    audio.volume = 0.03;

    if (audio.paused) {
            audio.play();
            // speaker.innerHTML = '🔊'; 
            $('.sound').html('🔊');

        } else {
            audio.pause();
            $('.sound').html('🔇');

        }

});