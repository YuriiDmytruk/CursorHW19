import React, { Component } from "react";
import "../Styles/Timer.css";

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      time: this.props.time,
      startTime: this.props.time,
      timerId: null,
      step: this.props.step,
      isWorking: false,
      autoStart: this.props.autoStart,
      onTimeEnd: this.props.onTimeEnd,
      onTimeStart: this.props.onTimeStart,
      onTimePause: this.props.onTimePause,
      onTickF: this.props.onTick,
    };
  }

  componentDidMount() {
    if (this.state.autoStart) {
      this.startTimer();
    }
  }

  onTick = () => {
    if (this.state.time > 0) {
      if (this.state.isWorking) {
        this.state.onTickF(this.state.time);
        this.setState({ time: this.state.time - this.state.step });
      }
    } else {
      this.onTimeEnd();
    }
    this.changeProgresBar();
  };

  startTimer = () => {
    console.log(this.state.time);
    if (this.state.time > 0) {
      if (!this.state.isWorking) {
        this.state.onTimeStart();
        this.setState({
          timerId: setInterval(this.onTick, this.props.step),
          isWorking: true,
        });
      }
    } else {
      this.onTimeEnd();
    }
  };

  stopTimer = () => {
    if (this.state.isWorking) {
      this.state.onTimePause();
      this.setState({
        timerId: clearInterval(this.state.timerId),
        isWorking: false,
      });
    }
  };

  msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
      seconds = parseInt((duration / 1000) % 60),
      minutes = parseInt((duration / (1000 * 60)) % 60),
      hours = parseInt((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
  }

  changeProgresBar = () => {
    const progress = 100 - (this.state.time * 100) / this.state.startTime;
    const progressbar = document.querySelector(".progress");
    progressbar.style.width = `${progress}%`;
  };

  onTimeEnd = () => {
    this.state.onTimeEnd();
    this.setState({ time: this.props.time, startTime: this.props.time });
  };

  render() {
    return (
      <div>
        <h1>{this.msToTime(this.state.time)}</h1>
        <button onClick={this.startTimer}>Start</button>
        <button onClick={this.stopTimer}>Stop</button>
        <p></p>
        <div className="progress-container">
          <div className="progress"></div>
        </div>
      </div>
    );
  }
}

export default Timer;
