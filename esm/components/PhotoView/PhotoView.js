function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

import React, { Component } from "react";
import PropTypes from "prop-types";
import Viewer from "./viewerjs/viewer.min";

var PhotoView =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(PhotoView, _Component);

  function PhotoView() {
    var _this;

    _this = _Component.call(this) || this;
    _this.state = {
      detailText: ""
    };
    _this.detailBox = React.createRef();
    return _this;
  }

  var _proto = PhotoView.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;

    var detailText = this.props.detailText ? this.props.detailText.replace(/<img([\s\S]*?)src\s*=/g, '<img data-original="" src=') : "";
    this.setState({
      detailText: detailText
    }, function () {
      _this2.gallery = new Viewer(_this2.detailBox.current);
    });
  };

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _this3 = this;

    var detailText = nextProps.detailText ? nextProps.detailText.replace(/<img([\s\S]*?)src\s*=/g, '<img data-original="" src=') : "";
    this.setState({
      detailText: detailText
    }, function () {
      _this3.gallery = new Viewer(_this3.detailBox.current);
    });
  };

  _proto.render = function render() {
    var _this$props = this.props,
        _this$props$className = _this$props.className,
        className = _this$props$className === void 0 ? "" : _this$props$className,
        _this$props$style = _this$props.style,
        style = _this$props$style === void 0 ? {} : _this$props$style;
    return React.createElement("div", {
      key: Math.random(),
      className: className,
      style: _objectSpread({}, style),
      ref: this.detailBox,
      id: "detail-box"
    }, React.createElement("div", {
      className: "message-detail-text",
      dangerouslySetInnerHTML: {
        __html: this.state.detailText
      }
    }));
  };

  return PhotoView;
}(Component);

PhotoView.defaultProps = {
  detailText: "",
  className: "",
  style: {}
};
PhotoView.propTypes = process.env.NODE_ENV !== "production" ? {
  detailText: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object
} : {};
export default PhotoView;