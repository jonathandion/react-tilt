"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tilt = function (_Component) {
  _inherits(Tilt, _Component);

  function Tilt(props) {
    _classCallCheck(this, Tilt);

    var _this = _possibleConstructorReturn(this, (Tilt.__proto__ || Object.getPrototypeOf(Tilt)).call(this, props));

    _this.state = {
      style: {}
    };

    var defaultSettings = {
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

    var _this$props = _this.props,
        options = _this$props.options,
        onMouseEnter = _this$props.onMouseEnter,
        onMouseMove = _this$props.onMouseMove,
        onMouseLeave = _this$props.onMouseLeave;


    _this.width = null;
    _this.height = null;
    _this.left = null;
    _this.top = null;
    _this.transitionTimeout = null;
    _this.updateCall = null;
    _this.element = (0, _react.createRef)();
    _this.settings = _extends({}, defaultSettings, options);
    _this.reverse = _this.settings.reverse ? -1 : 1;

    // Events
    _this.onMouseEnter = _this.onMouseEnter.bind(_this, onMouseEnter);
    _this.onMouseMove = _this.onMouseMove.bind(_this, onMouseMove);
    _this.onMouseLeave = _this.onMouseLeave.bind(_this, onMouseLeave);
    return _this;
  }

  _createClass(Tilt, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearTimeout(this.transitionTimeout);
      cancelAnimationFrame(this.updateCall);
    }
  }, {
    key: "onMouseEnter",
    value: function onMouseEnter() {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      var event = arguments[1];

      this.updateElementPosition();

      var style = this.state.style;

      style.willChange = "transform";

      this.setState({
        style: style
      });

      this.setTransition();

      return callback(event);
    }
  }, {
    key: "reset",
    value: function reset() {
      var _this2 = this;

      window.requestAnimationFrame(function () {
        var style = _this2.state.style;

        style.transform = "perspective(" + _this2.settings.perspective + "px) " + "rotateX(0deg) " + "rotateY(0deg) " + "scale3d(1, 1, 1)";

        _this2.setState({
          style: style
        });
      });
    }
  }, {
    key: "onMouseMove",
    value: function onMouseMove() {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      var event = arguments[1];

      event.persist();

      if (this.updateCall !== null) {
        window.cancelAnimationFrame(this.updateCall);
      }

      this.event = event;
      this.updateCall = requestAnimationFrame(this.update.bind(this, event));

      return callback(event);
    }
  }, {
    key: "setTransition",
    value: function setTransition() {
      var _this3 = this;

      clearTimeout(this.transitionTimeout);

      var _settings = this.settings,
          speed = _settings.speed,
          easing = _settings.easing;
      var style = this.state.style;

      style.transition = speed + "ms " + easing;
      this.setState({
        style: style
      });

      this.transitionTimeout = setTimeout(function () {
        style.transition = "";
        _this3.setState({
          style: style
        });
      }, speed);
    }
  }, {
    key: "onMouseLeave",
    value: function onMouseLeave() {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      var event = arguments[1];

      this.setTransition();

      if (this.settings.reset) this.reset();

      return callback(event);
    }
  }, {
    key: "getValues",
    value: function getValues(_ref) {
      var nativeEvent = _ref.nativeEvent;

      var x = (nativeEvent.clientX - this.left) / this.width;
      var y = (nativeEvent.clientY - this.top) / this.height;
      var _x = Math.min(Math.max(x, 0), 1);
      var _y = Math.min(Math.max(y, 0), 1);

      var max = this.settings.max;


      var tiltX = (this.reverse * (max / 2 - _x * max)).toFixed(2);
      var tiltY = (this.reverse * (_y * max - max / 2)).toFixed(2);

      var percentageX = _x * 100;
      var percentageY = _y * 100;

      return {
        tiltX: tiltX,
        tiltY: tiltY,
        percentageX: percentageX,
        percentageY: percentageY
      };
    }
  }, {
    key: "updateElementPosition",
    value: function updateElementPosition() {
      var rect = this.element.current.getBoundingClientRect();
      var _element$current = this.element.current;
      this.width = _element$current.offsetWidth;
      this.height = _element$current.offsetHeight;


      this.left = rect.left;
      this.top = rect.top;
    }
  }, {
    key: "update",
    value: function update(event) {
      var values = this.getValues(event);

      var _settings2 = this.settings,
          perspective = _settings2.perspective,
          axis = _settings2.axis,
          scale = _settings2.scale;
      var style = this.state.style;


      var rotateXdeg = axis === "x" ? 0 : values.tiltY;
      var rotateYdeg = axis === "y" ? 0 : values.tiltX;

      style.transform = "perspective(" + perspective + "px) " + ("rotateX(" + rotateXdeg + "deg) ") + ("rotateY(" + rotateYdeg + "deg) ") + ("scale3d(" + scale + ", " + scale + ", " + scale + ")");

      this.setState({
        style: style
      });

      this.updateCall = null;
    }
  }, {
    key: "render",
    value: function render() {
      var style = _extends({}, this.props.style, this.state.style);

      return _react2.default.createElement(
        "div",
        {
          ref: this.element,
          style: style,
          className: this.props.className,
          onMouseEnter: this.onMouseEnter,
          onMouseMove: this.onMouseMove,
          onMouseLeave: this.onMouseLeave
        },
        this.props.children
      );
    }
  }]);

  return Tilt;
}(_react.Component);

exports.default = Tilt;