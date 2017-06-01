'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

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

    _this.width = null;
    _this.height = null;
    _this.left = null;
    _this.top = null;
    _this.transitionTimeout = null;
    _this.updateCall = null;
    _this.element = null;
    _this.settings = Object.assign({}, defaultSettings, _this.props.options);
    _this.reverse = _this.settings.reverse ? -1 : 1;

    // Events
    _this.onMouseEnter = _this.onMouseEnter.bind(_this, _this.props.onMouseEnter);
    _this.onMouseMove = _this.onMouseMove.bind(_this, _this.props.onMouseMove);
    _this.onMouseLeave = _this.onMouseLeave.bind(_this, _this.props.onMouseLeave);
    return _this;
  }

  _createClass(Tilt, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.element = (0, _reactDom.findDOMNode)(this);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.transitionTimeout);
      cancelAnimationFrame(this.updateCall);
    }
  }, {
    key: 'onMouseEnter',
    value: function onMouseEnter() {
      var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      var e = arguments[1];

      this.updateElementPosition();

      this.setState(Object.assign({}, this.state, {
        style: _extends({}, this.state.style, {
          willChange: "transform"
        })
      }));

      this.setTransition();

      return cb(e);
    }
  }, {
    key: 'reset',
    value: function reset() {
      var _this2 = this;

      window.requestAnimationFrame(function () {
        _this2.setState(Object.assign({}, _this2.state, {
          style: _extends({}, _this2.state.style, {
            transform: "perspective(" + _this2.settings.perspective + "px) " + "rotateX(0deg) " + "rotateY(0deg) " + "scale3d(1, 1, 1)" })
        }));
      });
    }
  }, {
    key: 'onMouseMove',
    value: function onMouseMove() {
      var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      var e = arguments[1];

      e.persist();

      if (this.updateCall !== null) {
        window.cancelAnimationFrame(this.updateCall);
      }

      this.event = e;
      this.updateCall = requestAnimationFrame(this.update.bind(this, e));

      return cb(e);
    }
  }, {
    key: 'setTransition',
    value: function setTransition() {
      var _this3 = this;

      clearTimeout(this.transitionTimeout);

      this.setState(Object.assign({}, this.state, {
        style: _extends({}, this.state.style, {
          transition: this.settings.speed + "ms " + this.settings.easing
        })
      }));

      this.transitionTimeout = setTimeout(function () {
        _this3.setState(Object.assign({}, _this3.state, {
          style: _extends({}, _this3.state.style, {
            transition: ''
          })
        }));
      }, this.settings.speed);
    }
  }, {
    key: 'onMouseLeave',
    value: function onMouseLeave() {
      var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      var e = arguments[1];

      this.setTransition();

      if (this.settings.reset) {
        this.reset();
      }
      return cb(e);
    }
  }, {
    key: 'getValues',
    value: function getValues(e) {
      var x = (e.nativeEvent.clientX - this.left) / this.width;
      var y = (e.nativeEvent.clientY - this.top) / this.height;
      var _x = Math.min(Math.max(x, 0), 1);
      var _y = Math.min(Math.max(y, 0), 1);

      var tiltX = (this.reverse * (this.settings.max / 2 - _x * this.settings.max)).toFixed(2);
      var tiltY = (this.reverse * (_y * this.settings.max - this.settings.max / 2)).toFixed(2);

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
    key: 'updateElementPosition',
    value: function updateElementPosition() {
      var rect = this.element.getBoundingClientRect();
      this.width = this.element.offsetWidth;
      this.height = this.element.offsetHeight;
      this.left = rect.left;
      this.top = rect.top;
    }
  }, {
    key: 'update',
    value: function update(e) {
      var values = this.getValues(e);

      this.setState(Object.assign({}, this.state, {
        style: _extends({}, this.state.style, {
          transform: "perspective(" + this.settings.perspective + "px) " + "rotateX(" + (this.settings.axis === "x" ? 0 : values.tiltY) + "deg) " + "rotateY(" + (this.settings.axis === "y" ? 0 : values.tiltX) + "deg) " + "scale3d(" + this.settings.scale + ", " + this.settings.scale + ", " + this.settings.scale + ")"
        })
      }));

      this.updateCall = null;
    }
  }, {
    key: 'render',
    value: function render() {
      var style = Object.assign({}, this.props.style, this.state.style);
      return _react2.default.createElement(
        'div',
        { style: style,
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