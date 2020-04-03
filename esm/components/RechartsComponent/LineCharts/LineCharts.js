function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

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
      return React.createElement("text", {
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
    return React.createElement(LineChart, _extends({}, this.props, {
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
    })), legend ? React.createElement(Legend, null) : "", y === false ? "" : React.createElement(YAxis, y), grid ? React.createElement(CartesianGrid, _extends({}, grid, {
      horizontal: grid.x,
      vertical: grid.y
    })) : "", toolTip === false ? "" : React.createElement(Tooltip, toolTip), lines && lines.length > 0 ? lines.map(function (item) {
      return React.createElement(Line, _extends({}, item, {
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
}(PureComponent);

LineCharts.defaultProps = {
  option: {}
};
export { LineCharts as default };
LineCharts.propTypes = process.env.NODE_ENV !== "production" ? {
  option: PropTypes.object
} : {};