function showContent(section) {
    const sections = ['home', 'about', 'contact'];
    sections.forEach((s) => {
        const element = document.getElementById(s);
        if (s === section) {
            element.style.opacity = 1;
        } else {
            element.style.opacity = 0;
        }
    });
}

function toggleMute() {
    const audioElement = document.getElementById('backgroundMusic');

    audioElement.muted = !audioElement.muted;
    const muteButton = document.getElementById('muteButton');
    muteButton.textContent = audioElement.muted ? 'Unmute' : 'Mute';
}