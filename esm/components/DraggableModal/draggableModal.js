function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

import React from "react";
import { Modal } from "antd";
import PropTypes from "prop-types"; // 获得随机数

var genNonDuplicateID = function genNonDuplicateID(length) {
  return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
};
/*
 * 可拖动的弹框 组件
 * author：徐静
 * date：2019.02.14
 * */


var DraggableModal =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(DraggableModal, _React$Component);

  function DraggableModal(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.getDragDom = function () {
      setTimeout(function () {
        // 获取唯一标示元素
        var dragDom = document.getElementsByClassName("d_" + _this.id)[0];

        if (dragDom) {
          dragDom.style.left = _this.initLeft + "px";
          dragDom.style.top = _this.initTop + "px";
          _this.dragDom = dragDom;
        }
      });
    };

    _this.onMouseDown = function (e) {
      e.preventDefault();
      _this.dragging = true; // 激活拖拽状态

      /*
       ** 实现点击后，当前浮层在最上面
       ** 将当前所有涉及可拖拽的浮层的 zindex = 1000
       ** 将当前拖拽目标的 zindex = 1001
       * */

      var nodeList = document.getElementsByClassName("drag_modal");

      if (nodeList.length > 0) {
        Array.from(nodeList).forEach(function (item) {
          return item.style.zIndex = 1000;
        });
        _this.dragDom.style.zIndex = 1001;
      }
      /*
       * getBoundingClientRect: 返回一个 DomRect 对象
       *   包含该元素的 top、right、bottom、left 值，对应的是到屏幕上方和左边的距离，单位 px
       * */


      var dragDomRect = _this.dragDom.getBoundingClientRect();
      /*
       * e.clientX、e.clientY
       *   获取鼠标的坐标位置
       * */


      _this.tLeft = e.clientX - dragDomRect.left; // 鼠标按下时和选中元素的坐标偏移:x坐标

      _this.tTop = e.clientY - dragDomRect.top; // 鼠标按下时和选中元素的坐标偏移:y坐标

      _this.onMouseMove(_this.dragDom);
    };

    _this.onMouseUp = function (e) {
      e.preventDefault();
      _this.dragging = false; // 停止移动状态

      document.onmousemove = null; // 停止鼠标移动事件
    };

    _this.onMouseMove = function (node) {
      document.onmousemove = function (e) {
        e.preventDefault();

        if (_this.dragging) {
          node.style.left = e.clientX - _this.tLeft + "px";
          node.style.top = e.clientY - _this.tTop + "px";
        }
      };

      document.onmouseup = function (e) {
        e.preventDefault();
        _this.dragging = false; // 停止移动状态

        document.onmousemove = null; // 停止鼠标移动事件
      };
    };

    _this.id = genNonDuplicateID(10); // 获得随机id

    _this.initLeft = (window.innerWidth - _this.props.width) / 2; // 初始化水平位置调整

    _this.initTop = _this.props.top; // 初始化垂直位置调整

    _this.dragDom = null; // 拖拽的目标元素

    _this.dragging = false; // 是否拖拽的开关

    _this.tLeft = 0; // ---| 坐标轴x

    _this.tTop = 0; //  ------> 坐标轴y

    return _this;
  }

  var _proto = DraggableModal.prototype;

  _proto.componentDidMount = function componentDidMount() {
    // 初始化dragDom初始位置
    this.getDragDom();
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    // 若dragDom不存在，初始化dragDom初始位置
    if (!this.dragDom) {
      this.getDragDom();
    }
  };

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (!nextProps.visible) {
      this.dragging = false; // 停止移动状态

      document.onmousemove = null; // 停止鼠标移动事件
    }
  }
  /*
   * 初始渲染时，直接获取 Modal 的 dom 会获取不到。
   * 设置 ref 使用 findDOMNode 也获取不到。
   * 只能在定时器中使用原生方式来获取。
   * */
  ;

  _proto.render = function render() {
    var _this2 = this;

    return React.createElement(Modal, _extends({}, this.props, {
      afterClose: function afterClose() {
        _this2.props.afterCloseToInitPosition && _this2.getDragDom();
      },
      keyboard: false,
      title: React.createElement("div", {
        className: "drag_title",
        onMouseDown: this.onMouseDown,
        onMouseUp: this.onMouseUp
      }, this.props.title),
      wrapClassName: "drag_modal_wrap d_" + this.id + " " + this.props.wrapClassName
    }), this.props.children);
  };

  return DraggableModal;
}(React.Component);

DraggableModal.defaultProps = {
  width: 520,
  top: 100,
  title: "Drag-Modal",
  visible: false,
  wrapClassName: "",
  children: React.createElement("div", null),
  afterCloseToInitPosition: true
};
export { DraggableModal as default };
DraggableModal.propTypes = process.env.NODE_ENV !== "production" ? {
  width: PropTypes.number,
  top: PropTypes.number,
  title: PropTypes.string,
  visible: PropTypes.bool,
  wrapClassName: PropTypes.string,
  children: PropTypes.node,
  afterCloseToInitPosition: PropTypes.bool // 拖动弹框关闭后是否回归初始位置

} : {};