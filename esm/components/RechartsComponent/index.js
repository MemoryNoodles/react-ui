function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

import React from "react";
import PropTypes from "prop-types";
import BarCharts from "./BarCharts/BarCharts";
import LineCharts from "./LineCharts/LineCharts";
import PieCharts from "./PieCharts/PieCharts";

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
    return React.createElement("div", null, type === "line" ? React.createElement(LineCharts, {
      option: option
    }) : "", type === "bar" ? React.createElement(BarCharts, {
      option: option
    }) : "", type === "pie" ? React.createElement(PieCharts, {
      option: option
    }) : "");
  };

  return MyRecharts;
}(React.Component);

MyRecharts.defaultProps = {
  type: "line",
  option: {}
};
MyRecharts.propTypes = process.env.NODE_ENV !== "production" ? {
  type: PropTypes.string,
  option: PropTypes.object
} : {};
export default MyRecharts;