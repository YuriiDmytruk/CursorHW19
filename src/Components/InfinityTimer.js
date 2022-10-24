import React, { Component } from "react";
import Timer from "./Timer.js";

class InfiniteTimer extends Component {
  state = {
    startTime: this.props.time,
    time: this.props.time,
  };

  onTimeEnd = () => this.setState({ time: this.state.startTime });

  onTimeChange = (_time) => this.setState({ time: _time });

  render() {
    return (
      <Timer
        time={this.state.time}
        step={1000}
        autoStart={false}
        onTimeChange={this.onTimeChange}
        onTimeEnd={this.onTimeEnd}
        onTimeStart={() => console.log("Таймер запущено!")}
        onTimePause={() => console.log("Таймер на паузі!")}
        onTick={(time) => console.log("Залишилось часу: " + time)}
      />
    );
  }
}

export default InfiniteTimer;
