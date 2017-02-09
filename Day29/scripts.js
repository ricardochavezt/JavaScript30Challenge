let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTimeDisplay = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer (seconds) {
    clearInterval(countdown);

    const now = Date.now();
    const then = now + (seconds*1000);

    displayTimeLeft(seconds);
    displayEndTime(then);
    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if (secondsLeft <= 0) {
            clearInterval(countdown);
            return;
        }
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const display = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    timerDisplay.textContent = display;
    document.title = display;
}

function displayEndTime(timestamp) {
    const endTime = new Date(timestamp);
    const adjustedHours = endTime.getHours() > 12 ? endTime.getHours() - 12 : endTime.getHours();
    const adjustedMinutes = (endTime.getMinutes() < 10 ? '0' : '') + endTime.getMinutes();
    endTimeDisplay.textContent = `Regresamos a las ${adjustedHours}:${adjustedMinutes}`;
}

buttons.forEach(button => {
    button.addEventListener('click', e => {
        const seconds = parseInt(e.target.dataset['time']);
        timer(seconds);
    });
});

document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const minutes = parseInt(this.minutes.value);
    timer(minutes*60);
});
