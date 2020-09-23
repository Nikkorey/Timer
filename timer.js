class Timer {
  constructor(durationInput, running, startButton, pauseButton, callBacks) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;
    this.running = running;

    if (callBacks) {
      this.onStart = callBacks.onStart;
      this.onTick = callBacks.onTick;
      this.onComplete = callBacks.onComplete;
    }

    // SetUp EventHandler
    this.startButton.addEventListener("click", this.start);
    this.pauseButton.addEventListener("click", this.reset);
    this.durationInput.addEventListener("click", this.inputChanged);
  }

  playIcon = () => {
    play.classList.replace("fa-pause", "fa-play");
    play.setAttribute("title", "Play");
  };

  start = () => {
    if (play.classList.contains("fa-pause")) {
      this.pause();
      this.playIcon();
      this.running = false;
    } else if (!this.running) {
      play.classList.replace("fa-play", "fa-pause");
      play.setAttribute("title", "Pause");
      if (this.onStart) {
        this.onStart(this.timeRemaining);
      }
      this.tick();
      this.interval = setInterval(this.tick, 20);
      this.running = true;
    }
  };

  reset = () => {
    clearInterval(this.interval);
    this.durationInput.value = "30:00";
    this.playIcon();
    if (this.running || !this.running) {
      circle.setAttribute("stroke-dashoffset", 0);
      this.running = false;
    }
  };

  pause = () => {
    clearInterval(this.interval);
  };

  inputChanged = () => {
    this.pause();
    this.playIcon();
    this.running = false;
  };

  tick = () => {
    //   sample 1
    // const timeRemaining = parseFloat(this.durationInput.value);
    // this.durationInput.value = timeRemaining - 1;
    // Setup Condition
    if (this.timeRemaining <= 0) {
      this.pause();
      if (this.onComplete) {
        this.onComplete();
      }
    } else {
      this.timeRemaining = this.timeRemaining - 0.02;
      if (this.onTick) {
        this.onTick(this.timeRemaining);
      }
    }
  };

  get timeRemaining() {
    return parseFloat(this.durationInput.value);
  }

  set timeRemaining(time) {
    this.durationInput.value = time.toFixed(2);
  }
}
