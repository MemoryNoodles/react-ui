"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _form = _interopRequireDefault(require("../PopForm/form"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

// eslint-disable-line
// 获得随机数
var genNonDuplicateID = function genNonDuplicateID(length) {
  return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
};
/*
 * 可拖动的弹框 组件
 * author：徐静
 * date：2019.02.14
 * */


var DraggableFormModal =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(DraggableFormModal, _React$Component);

  function DraggableFormModal(props) {
    var _this;

    _this = _React$Component.call(this, props) || this; // 表单

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

    _this.state = {
      // 弹出框显示/隐藏
      modalVisible: false
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

  var _proto = DraggableFormModal.prototype;

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
    if (!nextProps.modalVisible) {
      this.dragging = false; // 停止移动状态

      document.onmousemove = null; // 停止鼠标移动事件
    }

    if (this.props.modalVisible !== nextProps.modalVisible) {
      // 显示Modal
      this.setState({
        modalVisible: nextProps.modalVisible
      });
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

    //表单
    var _this$props$initData = this.props.initData,
        _this$props$initData$ = _this$props$initData.formItemLayout,
        formItemLayout = _this$props$initData$ === void 0 ? {
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 19
      }
    } : _this$props$initData$,
        _this$props$initData$2 = _this$props$initData.itemList,
        itemList = _this$props$initData$2 === void 0 ? [] : _this$props$initData$2,
        _this$props$initData$3 = _this$props$initData.closable,
        closable = _this$props$initData$3 === void 0 ? false : _this$props$initData$3,
        _this$props$initData$4 = _this$props$initData.maskClosable,
        maskClosable = _this$props$initData$4 === void 0 ? false : _this$props$initData$4,
        _this$props$initData$5 = _this$props$initData.canClose,
        canClose = _this$props$initData$5 === void 0 ? true : _this$props$initData$5,
        _this$props$initData$6 = _this$props$initData.destroyOnClose,
        destroyOnClose = _this$props$initData$6 === void 0 ? true : _this$props$initData$6,
        _this$props$initData$7 = _this$props$initData.customButton,
        customButton = _this$props$initData$7 === void 0 ? null : _this$props$initData$7,
        _this$props$initData$8 = _this$props$initData.customFun,
        customFun = _this$props$initData$8 === void 0 ? function () {} : _this$props$initData$8,
        _this$props$initData$9 = _this$props$initData.onOk,
        onOk = _this$props$initData$9 === void 0 ? function () {} : _this$props$initData$9,
        _this$props$initData$10 = _this$props$initData.onCancel,
        _onCancel = _this$props$initData$10 === void 0 ? function () {} : _this$props$initData$10;

    var _this$props = this.props,
        drag = _this$props.drag,
        title = _this$props.title;
    return _react["default"].createElement(_antd.Modal, _extends({}, this.props, {
      afterClose: function afterClose() {
        _this2.props.afterCloseToInitPosition && _this2.getDragDom();
      },
      keyboard: false,
      title: drag ? _react["default"].createElement("div", {
        className: "drag_title",
        onMouseDown: this.onMouseDown,
        onMouseUp: this.onMouseUp
      }, title) : title,
      closable: canClose === false ? false : closable,
      destroyOnClose: destroyOnClose,
      footer: null,
      getContainer: this.props.getContainer,
      maskClosable: canClose === false ? false : maskClosable,
      onCancel: function onCancel() {
        _onCancel();
      },
      visible: this.state.modalVisible // 关闭时销毁 Modal 里的子元素
      ,
      width: this.props.width,
      wrapClassName: "drag_modal_wrap d_" + this.id + " " + this.props.wrapClassName
    }), _react["default"].createElement("div", {
      className: "pop-form-custom-text"
    }, this.props.children), _react["default"].createElement(_form["default"], {
      customButton: customButton,
      customFun: customFun,
      formItemLayout: formItemLayout,
      itemList: itemList,
      okText: this.props.okText,
      onCancel: _onCancel,
      onOk: onOk,
      wrappedComponentRef: function wrappedComponentRef(form) {
        _this2.form = form;
      }
    }, canClose && _react["default"].createElement(_antd.Button, {
      onClick: _onCancel,
      style: {
        marginRight: 6
      }
    }, "\u53D6\u6D88")));
  };

  return DraggableFormModal;
}(_react["default"].Component);

exports["default"] = DraggableFormModal;
DraggableFormModal.defaultProps = {
  width: 560,
  top: 100,
  title: "Drag-Modal",
  modalVisible: false,
  wrapClassName: "",
  children: _react["default"].createElement("div", null),
  afterCloseToInitPosition: true,
  drag: true,
  // 表单的配置
  initData: {
    title: '',
    formItemLayout: {
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 19
      }
    },
    itemList: [],
    closable: false,
    maskClosable: false,
    canClose: true,
    destroyOnClose: true,
    customButton: null,
    customFun: function customFun() {},
    onOk: function onOk() {},
    onCancel: function onCancel() {}
  },
  okText: '确定',
  getContainer: function getContainer() {
    return document.body;
  }
};
DraggableFormModal.propTypes = process.env.NODE_ENV !== "production" ? {
  drag: _propTypes["default"].bool,
  width: _propTypes["default"].number,
  top: _propTypes["default"].number,
  title: _propTypes["default"].string,
  modalVisible: _propTypes["default"].bool,
  wrapClassName: _propTypes["default"].string,
  children: _propTypes["default"].node,
  afterCloseToInitPosition: _propTypes["default"].bool,
  // 拖动弹框关闭后是否回归初始位置
  // 表单的配置
  initData: _propTypes["default"].shape({
    formItemLayout: _propTypes["default"].object,
    itemList: _propTypes["default"].array,
    closable: _propTypes["default"].bool,
    maskClosable: _propTypes["default"].bool,
    canClose: _propTypes["default"].bool,
    destroyOnClose: _propTypes["default"].bool,
    customButton: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].bool]),
    customFun: _propTypes["default"].func,
    onOk: _propTypes["default"].func,
    onCancel: _propTypes["default"].func
  }),
  okText: _propTypes["default"].string,
  getContainer: _propTypes["default"].func
} : {};