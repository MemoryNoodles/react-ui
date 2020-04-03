"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _recharts = require("recharts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var LineCharts =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(LineCharts, _PureComponent);

  function LineCharts() {
    var _this;

    _this = _PureComponent.call(this) || this;

    _this.customizedLabel = function (e, label) {
      var x = e.x,
          y = e.y,
          value = e.value;
      return _react["default"].createElement("text", {
        dy: -8,
        fill: label.color,
        fontSize: label.fontSize || 14,
        textAnchor: "middle",
        x: x,
        y: y
      }, value);
    };

    _this.onClick = function () {};

    _this.state = {};
    return _this;
  }

  var _proto = LineCharts.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$props$option = this.props.option,
        data = _this$props$option.data,
        x = _this$props$option.x,
        y = _this$props$option.y,
        legend = _this$props$option.legend,
        lines = _this$props$option.lines,
        height = _this$props$option.height,
        margin = _this$props$option.margin,
        width = _this$props$option.width,
        grid = _this$props$option.grid,
        toolTip = _this$props$option.toolTip,
        dataKey = _this$props$option.dataKey;
    return _react["default"].createElement(_recharts.LineChart, _extends({}, this.props, {
      data: data,
      height: height || 400,
      margin: margin || {
        top: 5,
        right: 5,
        bottom: 5,
        left: 5
      },
      width: width || 600
    }), x === false ? "" : _react["default"].createElement(_recharts.XAxis, _extends({}, x, {
      dataKey: dataKey || "name"
    })), legend ? _react["default"].createElement(_recharts.Legend, null) : "", y === false ? "" : _react["default"].createElement(_recharts.YAxis, y), grid ? _react["default"].createElement(_recharts.CartesianGrid, _extends({}, grid, {
      horizontal: grid.x,
      vertical: grid.y
    })) : "", toolTip === false ? "" : _react["default"].createElement(_recharts.Tooltip, toolTip), lines && lines.length > 0 ? lines.map(function (item) {
      return _react["default"].createElement(_recharts.Line, _extends({}, item, {
        key: item.value,
        activeDot: item.activeDot || {
          r: item.r || 3,
          onClick: function onClick(e) {
            return item.onClick ? item.onClick(e) : {};
          }
        },
        animationDuration: item.animationDuration || 500,
        dataKey: item.value,
        dot: item.dot === false ? false : item.dot || {
          r: item.r || 3,
          onClick: function onClick(e) {
            return item.onClick ? item.onClick(e) : {};
          }
        },
        label: item.label ? function (e) {
          return _this2.customizedLabel(e, item.label);
        } : "",
        name: item.name,
        stroke: item.lineColor || "#465fdd",
        type: "monotone"
      }));
    }) : "");
  };

  return LineCharts;
}(_react.PureComponent);

exports["default"] = LineCharts;
LineCharts.defaultProps = {
  option: {}
};
LineCharts.propTypes = process.env.NODE_ENV !== "production" ? {
  option: _propTypes["default"].object
} : {};