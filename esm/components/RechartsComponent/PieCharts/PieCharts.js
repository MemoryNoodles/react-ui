function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";

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
      return React.createElement("text", {
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
    return React.createElement(PieChart, {
      height: height || 300,
      margin: margin || {
        top: 5,
        right: 5,
        bottom: 5,
        left: 5
      },
      width: width || 400
    }, legend ? React.createElement(Legend, null) : "", toolTip === false ? "" : React.createElement(Tooltip, null), pies && pies.length > 0 ? pies.map(function (item) {
      return React.createElement(Pie, _extends({}, item, {
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
        return React.createElement(Cell, {
          key: "cell-" + cell,
          fill: cell
        });
      }) : "");
    }) : "");
  };

  return PieCharts;
}(PureComponent);

PieCharts.defaultProps = {
  option: {}
};
export { PieCharts as default };
PieCharts.propTypes = process.env.NODE_ENV !== "production" ? {
  option: PropTypes.object
} : {};