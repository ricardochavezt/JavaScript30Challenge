// elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// functions
function togglePlay() {
    if (video.paused) {
        video.play();
    }
    else {
        video.pause();
    }
}
function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}
function skip() {
    const skipAmount = parseFloat(this.dataset['skip']);
    video.currentTime += skipAmount;
}
function handleRangeUpdate() {
    video[this.name] = this.value;
}
function handleProgress() {
    const percent = video.currentTime / video.duration * 100;
    progressBar.style.flexBasis = `${percent}%`;
}
function scrub(e) {
    const scrubPercent = (e.offsetX / progress.offsetWidth);
    video.currentTime = video.duration * scrubPercent;
}

let mouseDown = false;
// event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
// optional: listen to the mousemove event to update the value while dragging the slider
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e));
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);

// init
progressBar.style.flexBasis = '0%';
