function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/**
 * Created with react_project.
 * User: 王洪瑞/3153981409@qq.com
 * Date: 2019/3/6
 * Time: 14:11
 *
 */
import React from "react";
import echarts from "echarts";
import PropTypes from "prop-types";

var MyEcharts =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(MyEcharts, _React$Component);

  function MyEcharts(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.resizeEvent = function () {
      if (_this.myChart) {
        _this.myChart.resize();
      }
    };

    _this.myEcharts = React.createRef();
    _this.myChart = null;
    return _this;
  }

  var _proto = MyEcharts.prototype;

  _proto.componentDidMount = function componentDidMount() {
    // 首次初始化
    var _this$props$option = this.props.option,
        option = _this$props$option === void 0 ? {} : _this$props$option;
    this.myChart = echarts.init(this.myEcharts.current);
    this.myChart.setOption(option);
    window.addEventListener("resize", this.resizeEvent);
  };

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    // 外部配置发生改变 重新初始化图表 
    if (this.props.option !== nextProps.option) {
      this.myChart = echarts.init(this.myEcharts.current);
      this.myChart.setOption(nextProps.option);
      window.addEventListener("resize", this.resizeEvent);
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    window.removeEventListener("resize", this.resizeEvent);
  };

  _proto.render = function render() {
    return React.createElement("div", {
      className: "echartsBox"
    }, React.createElement("div", {
      ref: this.myEcharts
    }));
  };

  return MyEcharts;
}(React.Component);

MyEcharts.defaultProps = {
  option: {} // 图表配置

};
MyEcharts.propTypes = process.env.NODE_ENV !== "production" ? {
  option: PropTypes.object
} : {};
export default MyEcharts;