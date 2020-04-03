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

var PieCharts =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(PieCharts, _PureComponent);

  function PieCharts() {
    var _this;

    _this = _PureComponent.call(this) || this;

    _this.customizedLabel = function (_ref, labelColor, fontSize) {
      var cx = _ref.cx,
          cy = _ref.cy,
          midAngle = _ref.midAngle,
          innerRadius = _ref.innerRadius,
          outerRadius = _ref.outerRadius,
          percent = _ref.percent;
      var radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      var x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
      var y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
      return _react["default"].createElement("text", {
        dominantBaseline: "central",
        fill: labelColor || "white",
        fontSize: fontSize || 14,
        textAnchor: x > cx ? "start" : "end",
        x: x,
        y: y
      }, (percent * 100).toFixed(0) + "%");
    };

    _this.pieLabel = function (label) {
      if (label) {
        if (label.position) {
          if (label.position === "out") {
            return true;
          }

          return function (e) {
            return _this.customizedLabel(e, label.color, label.fontSize);
          };
        }

        return label;
      }

      if (label === false) {
        return false;
      }

      return function (e) {
        return _this.customizedLabel(e);
      };
    };

    _this.state = {};
    return _this;
  }

  var _proto = PieCharts.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$props$option = this.props.option,
        data = _this$props$option.data,
        legend = _this$props$option.legend,
        pies = _this$props$option.pies,
        height = _this$props$option.height,
        margin = _this$props$option.margin,
        width = _this$props$option.width,
        toolTip = _this$props$option.toolTip,
        colors = _this$props$option.colors;
    return _react["default"].createElement(_recharts.PieChart, {
      height: height || 300,
      margin: margin || {
        top: 5,
        right: 5,
        bottom: 5,
        left: 5
      },
      width: width || 400
    }, legend ? _react["default"].createElement(_recharts.Legend, null) : "", toolTip === false ? "" : _react["default"].createElement(_recharts.Tooltip, null), pies && pies.length > 0 ? pies.map(function (item) {
      return _react["default"].createElement(_recharts.Pie, _extends({}, item, {
        key: item.value,
        animationDuration: item.animationDuration || 500,
        cx: item.cx || "50%",
        cy: item.cy || "50%",
        data: data,
        dataKey: item.value,
        innerRadius: item.innerRadius || 0,
        isAnimationActive: !item.closeAnimation,
        label: _this2.pieLabel(item.label),
        labelLine: item.labelLine || false,
        nameKey: item.name || "name",
        onClick: function onClick(e) {
          return item.onClick(e);
        },
        outerRadius: item.outerRadius || "80%"
      }), colors ? colors.map(function (cell) {
        return _react["default"].createElement(_recharts.Cell, {
          key: "cell-" + cell,
          fill: cell
        });
      }) : "");
    }) : "");
  };

  return PieCharts;
}(_react.PureComponent);

exports["default"] = PieCharts;
PieCharts.defaultProps = {
  option: {}
};
PieCharts.propTypes = process.env.NODE_ENV !== "production" ? {
  option: _propTypes["default"].object
} : {};