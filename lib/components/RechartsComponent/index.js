"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _BarCharts = _interopRequireDefault(require("./BarCharts/BarCharts"));

var _LineCharts = _interopRequireDefault(require("./LineCharts/LineCharts"));

var _PieCharts = _interopRequireDefault(require("./PieCharts/PieCharts"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var MyRecharts =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(MyRecharts, _React$Component);

  function MyRecharts() {
    var _this;

    _this = _React$Component.call(this) || this;
    _this.state = {};
    return _this;
  }

  var _proto = MyRecharts.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        type = _this$props.type,
        option = _this$props.option;
    return _react["default"].createElement("div", null, type === "line" ? _react["default"].createElement(_LineCharts["default"], {
      option: option
    }) : "", type === "bar" ? _react["default"].createElement(_BarCharts["default"], {
      option: option
    }) : "", type === "pie" ? _react["default"].createElement(_PieCharts["default"], {
      option: option
    }) : "");
  };

  return MyRecharts;
}(_react["default"].Component);

MyRecharts.defaultProps = {
  type: "line",
  option: {}
};
MyRecharts.propTypes = process.env.NODE_ENV !== "production" ? {
  type: _propTypes["default"].string,
  option: _propTypes["default"].object
} : {};
var _default = MyRecharts;
exports["default"] = _default;