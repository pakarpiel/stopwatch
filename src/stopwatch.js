class Stopwatch {
    constructor(){
        this.display = $("#display");
        this.buttonsContainer = $("#buttons");
        this.totalLaps = $("#totalLaps");
        this.laps = $("#laps");
        this.interval;
        this.savedTime = 0;
        this.lapTime = 0;
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
            // this.showTime(this.totalTime);
        }, 10);
    }

    stop(){
        clearInterval(this.interval);
        this.savedTime = this.totalTime;
    }

    lap(){
        
        let startingTime = this.totalTime - this.lapTime;
        this.lapTime = this.totalTime;
        let lap = $("<p></p>");
        lap.text(this.showTime(startingTime));

        let totalLap = $("<p></p>");
        totalLap.text(this.showTime(this.totalTime));

        this.laps.prepend(lap);
        this.totalLaps.prepend(totalLap);
       
    }

    reset(){
        this.display.text("00:00:00");
        this.savedTime = 0;

        this.laps.html("");
        this.totalLaps.html("");
    }

    showTime(miliseconds){
        let timeToConvert = new Date(miliseconds);

        let min = timeToConvert.getMinutes();
        let sec = timeToConvert.getSeconds();
        let ms = Math.floor(timeToConvert.getMilliseconds()/10);

        let minutes = min < 10 ? `0${min}` : `${min}`;
        let seconds = sec < 10 ? `0${sec}` : `${sec}`;
        let milliseconds = ms < 10 ? `0${ms}` : `${ms}`;

        // this.display.text(`${minutes}:${seconds}:${milliseconds}`);
        return `${minutes}:${seconds}:${milliseconds}`;

    }  

}

let stopwatch1 = new Stopwatch();