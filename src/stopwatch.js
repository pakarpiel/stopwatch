class Stopwatch {
    constructor(){
        this.display = $("#display");
        this.buttonsContainer = $("#buttons");
        this.startButton = $("button[data-action = 'start']");
        this.stopButton = $("button[data-action = 'stop']");
        this.lapButton = $("button[data-action = 'lap']");
        this.resumeButton = $("button[data-action = 'resume']");
        this.resetButton = $("button[data-action = 'reset']");
        this.counter = 0;
        this.lapsCounter = $("#lapsCounter")
        this.totalLaps = $("#totalLaps");
        this.laps = $("#laps");
        this.interval;
        this.savedTime = 0;
        this.lastLapTime = 0;
        this.runningTime;
        this.totalTime;
        
        this.buttonsContainer.on("click", "button", (e) =>{
            let option = e.currentTarget.dataset.action;
            this.action = this.options[option];
            this.action();
        } ); 

        this.options ={
            start: this.run,
            stop: this.stop,
            lap: this.lap,
            resume: this.run,
            reset: this.reset
        }
    };

    run(){
        let startingTime = new Date();

        this.interval = setInterval(() => {
            this.runningTime = new Date() - startingTime;
            this.totalTime = this.savedTime + this.runningTime;
            this.display.text(this.showTime(this.totalTime));
        }, 10);


        if(this.startButton.hasClass("active")){
            this.changeButtonsDisplay(this.startButton, this.stopButton, this.lapButton);
        };
        if(this.resumeButton.hasClass("active")){
            this.changeButtonsDisplay(this.resumeButton, this.resetButton, this.stopButton, this.lapButton);
        };
    }

    stop(){
        clearInterval(this.interval);
        this.savedTime = this.totalTime;

        this.changeButtonsDisplay(this.stopButton, this.lapButton, this.resumeButton, this.resetButton);
    }

    lap(){
        this.counter++;   
        let lapTime = this.totalTime - this.lastLapTime;
        this.lastLapTime = this.totalTime;

        this.lapsCounter.prepend($("<p></p>").text(this.counter));
        this.totalLaps.prepend($("<p></p>").text(this.showTime(this.totalTime))); 
        this.laps.prepend($("<p></p>").text(this.showTime(lapTime)));
          
    }

    reset(){
        this.display.text("00:00:00");
        this.savedTime = 0;
        this.counter = 0;
        this.lapsCounter.html("");
        this.laps.html("");
        this.totalLaps.html("");

        this.changeButtonsDisplay(this.resumeButton, this.resetButton, this.startButton);
    }

    showTime(miliseconds){
        let timeToConvert = new Date(miliseconds);

        let min = timeToConvert.getMinutes();
        let sec = timeToConvert.getSeconds();
        let ms = Math.floor(timeToConvert.getMilliseconds()/10);

        let minutes = min < 10 ? `0${min}` : `${min}`;
        let seconds = sec < 10 ? `0${sec}` : `${sec}`;
        let milliseconds = ms < 10 ? `0${ms}` : `${ms}`;

        return `${minutes}:${seconds}:${milliseconds}`;
    } 
    
    changeButtonsDisplay(...buttons){
        for(let i=0; i<buttons.length; i++){
            buttons[i].toggleClass("active")
        }
    }

}

let stopwatch1 = new Stopwatch();