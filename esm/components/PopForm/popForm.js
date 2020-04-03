function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

import React from "react";
import { Modal, Button } from "antd";
import PropTypes from "prop-types"; // eslint-disable-line

import MyForm from "./form"; // eslint-disable-line

/**
 * 弹出框表单组件.
 * User: 王洪瑞/3153981409@qq.com
 * Date: 2019/2/18
 * Time: 16:12
 *
 */

var PopForm =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(PopForm, _React$Component);

  function PopForm(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.state = {
      // 弹出框显示/隐藏
      modalVisible: false
    };
    return _this;
  }

  var _proto = PopForm.prototype;

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (this.props.modalVisible !== nextProps.modalVisible) {
      // 显示Modal
      this.setState({
        modalVisible: nextProps.modalVisible
      });
    }
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props$initData = this.props.initData,
        _this$props$initData$ = _this$props$initData.title,
        title = _this$props$initData$ === void 0 ? '' : _this$props$initData$,
        _this$props$initData$2 = _this$props$initData.modalWidth,
        modalWidth = _this$props$initData$2 === void 0 ? 560 : _this$props$initData$2,
        _this$props$initData$3 = _this$props$initData.formItemLayout,
        formItemLayout = _this$props$initData$3 === void 0 ? {
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 19
      }
    } : _this$props$initData$3,
        _this$props$initData$4 = _this$props$initData.itemList,
        itemList = _this$props$initData$4 === void 0 ? [] : _this$props$initData$4,
        _this$props$initData$5 = _this$props$initData.closable,
        closable = _this$props$initData$5 === void 0 ? false : _this$props$initData$5,
        _this$props$initData$6 = _this$props$initData.maskClosable,
        maskClosable = _this$props$initData$6 === void 0 ? false : _this$props$initData$6,
        _this$props$initData$7 = _this$props$initData.canClose,
        canClose = _this$props$initData$7 === void 0 ? true : _this$props$initData$7,
        _this$props$initData$8 = _this$props$initData.destroyOnClose,
        destroyOnClose = _this$props$initData$8 === void 0 ? true : _this$props$initData$8,
        _this$props$initData$9 = _this$props$initData.customButton,
        customButton = _this$props$initData$9 === void 0 ? null : _this$props$initData$9,
        _this$props$initData$10 = _this$props$initData.customFun,
        customFun = _this$props$initData$10 === void 0 ? function () {} : _this$props$initData$10,
        _this$props$initData$11 = _this$props$initData.onOk,
        onOk = _this$props$initData$11 === void 0 ? function () {} : _this$props$initData$11,
        _this$props$initData$12 = _this$props$initData.onCancel,
        _onCancel = _this$props$initData$12 === void 0 ? function () {} : _this$props$initData$12;

    return React.createElement("div", {
      className: "modal-pupModal"
    }, React.createElement(Modal, {
      ref: function ref(ins) {
        _this2.modalInstance = ins;
      },
      centered: true,
      className: "pop-form-modal",
      closable: canClose === false ? false : closable,
      destroyOnClose: destroyOnClose,
      footer: null,
      getContainer: this.props.getContainer,
      maskClosable: canClose === false ? false : maskClosable,
      onCancel: function onCancel() {
        _onCancel();
      },
      title: title,
      visible: this.state.modalVisible // 关闭时销毁 Modal 里的子元素
      ,
      width: modalWidth
    }, React.createElement("div", {
      className: "pop-form-custom-text"
    }, this.props.children), React.createElement(MyForm, {
      customButton: customButton,
      customFun: customFun,
      formItemLayout: formItemLayout,
      itemList: itemList,
      okText: this.props.okText,
      onCancel: _onCancel,
      onOk: onOk,
      formLayout: this.props.formLayout,
      wrappedComponentRef: function wrappedComponentRef(form) {
        _this2.form = form;
      }
    }, canClose && React.createElement(Button, {
      onClick: _onCancel,
      style: {
        marginRight: 6
      }
    }, "\u53D6\u6D88"))));
  };

  return PopForm;
}(React.Component);

PopForm.defaultProps = {
  initData: {
    title: '',
    modalWidth: 560,
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
  formLayout: "horizontal",
  children: [],
  okText: '确定',
  getContainer: function getContainer() {
    return document.body;
  }
};
PopForm.propTypes = process.env.NODE_ENV !== "production" ? {
  initData: PropTypes.shape({
    title: PropTypes.string,
    modalWidth: PropTypes.number,
    formItemLayout: PropTypes.object,
    itemList: PropTypes.array,
    closable: PropTypes.bool,
    maskClosable: PropTypes.bool,
    canClose: PropTypes.bool,
    destroyOnClose: PropTypes.bool,
    customButton: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    customFun: PropTypes.func,
    onOk: PropTypes.func,
    onCancel: PropTypes.func
  }),
  formLayout: PropTypes.string,
  children: PropTypes.node,
  okText: PropTypes.string,
  getContainer: PropTypes.func
} : {};
export default PopForm;