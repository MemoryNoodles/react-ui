"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _echarts = _interopRequireDefault(require("echarts"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

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

    _this.myEcharts = _react["default"].createRef();
    _this.myChart = null;
    return _this;
  }

  var _proto = MyEcharts.prototype;

  _proto.componentDidMount = function componentDidMount() {
    // 首次初始化
    var _this$props$option = this.props.option,
        option = _this$props$option === void 0 ? {} : _this$props$option;
    this.myChart = _echarts["default"].init(this.myEcharts.current);
    this.myChart.setOption(option);
    window.addEventListener("resize", this.resizeEvent);
  };

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    // 外部配置发生改变 重新初始化图表 
    if (this.props.option !== nextProps.option) {
      this.myChart = _echarts["default"].init(this.myEcharts.current);
      this.myChart.setOption(nextProps.option);
      window.addEventListener("resize", this.resizeEvent);
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    window.removeEventListener("resize", this.resizeEvent);
  };

  _proto.render = function render() {
    return _react["default"].createElement("div", {
      className: "echartsBox"
    }, _react["default"].createElement("div", {
      ref: this.myEcharts
    }));
  };

  return MyEcharts;
}(_react["default"].Component);

MyEcharts.defaultProps = {
  option: {} // 图表配置

};
MyEcharts.propTypes = process.env.NODE_ENV !== "production" ? {
  option: _propTypes["default"].object
} : {};
var _default = MyEcharts;
exports["default"] = _default;