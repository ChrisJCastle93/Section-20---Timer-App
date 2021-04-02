class Timer {
    constructor(durationInput, startButton, pauseButton, callbacks) {
        //adding in *optional*callbacks as 4th argument)// 
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;
        if (callbacks) {
            this.onStart = callbacks.onStart
            this.onTick = callbacks.onTick
            this.onComplete = callbacks.onComplete
        }
        this.startButton.addEventListener('click', this.start) //ADDS LISTENER TO START BUTTON FOR CLICK, CAN BE PLACED INSIDE CONSTRUCTOR
        this.pauseButton.addEventListener('click', this.pause) //ADDS LISTENER TO START BUTTON FOR CLICK, CAN BE PLACED INSIDE CONSTRUCTOR
    }

    start = () => { //USE AN ARROW FUNCTION HERE SO THAT 'this' is equal to the Timer class, rather than the start button.
        // console.log(this)
        if (this.onStart) {
            this.onStart(this.timeRemaining); // add this.timeRemaining so that it notes the time when the clock starts, and passes it into index.js callback
        }
        this.tick();
        this.interval = setInterval(this.tick, 20); // const timer will return an integer. We changed this.timer because const couldn't be used outside the local scope to clearInterval. This.timer can be used for that. Changed timer name to interval to avoid confusion.
        // clearInterval(timer); // stops the timer. Removed and placed in pause method.
    }

    tick = () => {
        if (this.timeRemaining <= 0) {
            this.pause();
            if (this.onComplete) {
                this.onComplete();
            }
        } else {
            // console.log('tick')
            // const timeRemaining = parseFloat(this.durationInput.value) // taking the value that it's in the HTML timer and parsing it to turn string into number
            // const timeRemaining = this.timeRemaining // we can refactor the above using the GETTER below
            // this.durationInput.value = timeRemaining - 1 // defining the value in the HTML, basically reducing by one second
            // this.timeRemaining = timeRemaining - 1 // same here, we can use the SETTER function below
            /// the getter and setter functions can be refactored further too:
            this.timeRemaining = this.timeRemaining - 0.02;
            if (this.onTick) {
                this.onTick(this.timeRemaining); // added this.timeRemaining so it can be passed into index.js
            }
        }
    }

    get timeRemaining() {
        return parseFloat(this.durationInput.value);
    }

    set timeRemaining(time) {
        // this.durationInput.value = time.toFixed(2)
        this.durationInput.value = parseFloat(time).toFixed(2)
    }

    pause = () => {
        clearInterval(this.interval); // stops the timer
        console.log('pause');
    }
}