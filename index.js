const durationInput = document.querySelector('#duration')
const startButton = document.querySelector('#start')
const pauseButton = document.querySelector('#pause')
const circle = document.querySelector('circle')

const perimeter = circle.getAttribute('r') * 2 * Math.PI;
circle.setAttribute('stroke-dasharray', perimeter);
let currentOffset = 0;
let duration; // just declaring a variable
let opacity;
const timer = new Timer(durationInput, startButton, pauseButton, {
    onStart(totalDuration) { //receives this.timeRemaining and converts to totalDuration
    duration = totalDuration;
    },
    onTick(timeRemaining) { //added timeRemaining so this can be received from timer.js
        circle.setAttribute('stroke-dashoffset', perimeter * timeRemaining / duration - perimeter);
        circle.setAttribute('opacity', (1-timeRemaining / duration));
    },
    onComplete() {
        console.log('timer complete')
        circle.setAttribute('stroke-dashoffset', 0);
    }
}); 
// adding in callback functions, then need to update the constructor function
