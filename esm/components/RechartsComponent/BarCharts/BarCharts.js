function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

var BarCharts =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(BarCharts, _PureComponent);

  function BarCharts() {
    var _this;

    _this = _PureComponent.call(this) || this;

    _this.customizedLabel = function (e, labelColor, fontSize, _onClick) {
      var x = e.x,
          y = e.y,
          value = e.value;
      return React.createElement("text", {
        dy: -8,
        fill: labelColor,
        fontSize: fontSize || 14,
        onClick: function onClick() {
          return _onClick();
        },
        style: _onClick ? {
          cursor: "pointer"
        } : {},
        textAnchor: "middle",
        x: x,
        y: y
      }, value);
    };

    _this.state = {};
    return _this;
  }

  var _proto = BarCharts.prototype;

  _proto.render = function render() {
    var _this$props$option = this.props.option,
        data = _this$props$option.data,
        x = _this$props$option.x,
        y = _this$props$option.y,
        legend = _this$props$option.legend,
        bars = _this$props$option.bars,
        height = _this$props$option.height,
        margin = _this$props$option.margin,
        width = _this$props$option.width,
        grid = _this$props$option.grid,
        toolTip = _this$props$option.toolTip,
        dataKey = _this$props$option.dataKey;
    return React.createElement(BarChart, _extends({}, this.props, {
      data: data,
      height: height || 400,
      margin: margin || {
        top: 5,
        right: 5,
        bottom: 5,
        left: 5
      },
      width: width || 600
    }), x === false ? "" : React.createElement(XAxis, _extends({}, x, {
      dataKey: dataKey || "name"
    })), legend ? React.createElement(Legend, legend) : "", y === false ? "" : React.createElement(YAxis, y), grid ? React.createElement(CartesianGrid, _extends({}, grid, {
      horizontal: grid.x,
      vertical: grid.y
    })) : "", toolTip === false ? "" : React.createElement(Tooltip, toolTip), bars && bars.length > 0 ? bars.map(function (item) {
      return React.createElement(Bar, _extends({
        key: item.value,
        animationDuration: item.animationDuration || 500,
        dataKey: item.value,
        fill: item.bar ? item.bar.barColor : "#465fdd",
        isAnimationActive: !item.closeAnimation,
        label: item.label ? _objectSpread({
          position: item.label.position || "top",
          fill: item.label.color || "#666"
        }, item.label) : false,
        name: item.name,
        onClick: function onClick(e) {
          return item.onClick ? item.onClick(e) : {};
        }
      }, item));
    }) : "");
  };

  return BarCharts;
}(PureComponent);

BarCharts.defaultProps = {
  option: {}
};
export { BarCharts as default };
BarCharts.propTypes = process.env.NODE_ENV !== "production" ? {
  option: PropTypes.object
} : {};