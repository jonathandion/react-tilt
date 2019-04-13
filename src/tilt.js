import React, { Component, createRef } from "react";

class Tilt extends Component {
  constructor(props) {
    super(props);

    this.state = {
      style: {}
    };

    const defaultSettings = {
      reverse: false,
      max: 35,
      perspective: 1000,
      easing: "cubic-bezier(.03,.98,.52,.99)",
      scale: "1.1",
      speed: "1000",
      transition: true,
      axis: null,
      reset: true
    };

    const { options, onMouseEnter, onMouseMove, onMouseLeave } = this.props;

    this.width = null;
    this.height = null;
    this.left = null;
    this.top = null;
    this.transitionTimeout = null;
    this.updateCall = null;
    this.element = createRef();
    this.settings = { ...defaultSettings, ...options };
    this.reverse = this.settings.reverse ? -1 : 1;

    // Events
    this.onMouseEnter = this.onMouseEnter.bind(this, onMouseEnter);
    this.onMouseMove = this.onMouseMove.bind(this, onMouseMove);
    this.onMouseLeave = this.onMouseLeave.bind(this, onMouseLeave);
  }

  componentWillUnmount() {
    clearTimeout(this.transitionTimeout);
    cancelAnimationFrame(this.updateCall);
  }

  onMouseEnter(callback = () => {}, event) {
    this.updateElementPosition();

    const { style } = this.state;
    style.willChange = "transform";

    this.setState({
      style
    });

    this.setTransition();

    return callback(event);
  }

  reset() {
    window.requestAnimationFrame(() => {
      const { style } = this.state;
      style.transform =
        `perspective(${this.settings.perspective}px) ` +
        "rotateX(0deg) " +
        "rotateY(0deg) " +
        "scale3d(1, 1, 1)";

      this.setState({
        style
      });
    });
  }

  onMouseMove(callback = () => {}, event) {
    event.persist();

    if (this.updateCall !== null) {
      window.cancelAnimationFrame(this.updateCall);
    }

    this.event = event;
    this.updateCall = requestAnimationFrame(this.update.bind(this, event));

    return callback(event);
  }

  setTransition() {
    clearTimeout(this.transitionTimeout);

    const { speed, easing } = this.settings;
    const { style } = this.state;
    style.transition = `${speed}ms ${easing}`;
    this.setState({
      style
    });

    this.transitionTimeout = setTimeout(() => {
      style.transition = "";
      this.setState({
        style
      });
    }, speed);
  }

  onMouseLeave(callback = () => {}, event) {
    this.setTransition();

    if (this.settings.reset) this.reset();

    return callback(event);
  }

  getValues({ nativeEvent }) {
    const x = (nativeEvent.clientX - this.left) / this.width;
    const y = (nativeEvent.clientY - this.top) / this.height;
    const _x = Math.min(Math.max(x, 0), 1);
    const _y = Math.min(Math.max(y, 0), 1);

    const { max } = this.settings;

    const tiltX = (this.reverse * (max / 2 - _x * max)).toFixed(2);
    const tiltY = (this.reverse * (_y * max - max / 2)).toFixed(2);

    const percentageX = _x * 100;
    const percentageY = _y * 100;

    return {
      tiltX,
      tiltY,
      percentageX,
      percentageY
    };
  }

  updateElementPosition() {
    const rect = this.element.current.getBoundingClientRect();
    ({
      offsetWidth: this.width,
      offsetHeight: this.height
    } = this.element.current);

    this.left = rect.left;
    this.top = rect.top;
  }

  update(event) {
    let values = this.getValues(event);

    const { perspective, axis, scale } = this.settings;
    const { style } = this.state;

    const rotateXdeg = axis === "x" ? 0 : values.tiltY;
    const rotateYdeg = axis === "y" ? 0 : values.tiltX;

    style.transform =
      `perspective(${perspective}px) ` +
      `rotateX(${rotateXdeg}deg) ` +
      `rotateY(${rotateYdeg}deg) ` +
      `scale3d(${scale}, ${scale}, ${scale})`;

    this.setState({
      style
    });

    this.updateCall = null;
  }

  render() {
    const style = {
      ...this.props.style,
      ...this.state.style
    };

    return (
      <div
        ref={this.element}
        style={style}
        className={this.props.className}
        onMouseEnter={this.onMouseEnter}
        onMouseMove={this.onMouseMove}
        onMouseLeave={this.onMouseLeave}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Tilt;
