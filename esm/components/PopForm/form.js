function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

import React from "react";
import { Form, Input, InputNumber, Select, Radio, Checkbox, DatePicker, Button, Upload, Icon } from "antd";
import MyUpload from "./upload";
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/zh-cn';
import locale from 'antd/lib/date-picker/locale/zh_CN';
moment.locale('zh-cn');
var FormItem = Form.Item;
var Option = Select.Option;
var TextArea = Input.TextArea,
    Search = Input.Search;
var CheckboxGroup = Checkbox.Group;
var RadioGroup = Radio.Group;
var MonthPicker = DatePicker.MonthPicker,
    WeekPicker = DatePicker.WeekPicker,
    RangePicker = DatePicker.RangePicker;

var MyForm =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(MyForm, _React$Component);

  function MyForm(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.resizeHeight = function () {
      if (_this.formItemBox) {
        try {
          var formItemBox = _this.formItemBox.current;
          if (!formItemBox) return;
          var documentHeight = document.documentElement.clientHeight || document.body.clientHeight;
          var formItemBoxHeight = formItemBox.offsetHeight;
          var formItemBoxScrollHeight = formItemBox.scrollHeight;

          if (formItemBoxHeight + 200 > documentHeight || formItemBoxScrollHeight > formItemBoxHeight) {
            formItemBox.style.maxHeight = document.documentElement.clientHeight - 220 + "px";
          } else if (formItemBoxScrollHeight <= formItemBoxHeight) {
            formItemBox.style.maxHeight = formItemBoxScrollHeight + "px";
          }
        } catch (e) {
          console.log("重置高度异常：", e);
        }
      }
    };

    _this.handleSubmit = function (e, customFun) {
      var event = e || window.event;

      if (event) {
        event.preventDefault();
      }

      _this.props.form.validateFieldsAndScroll(function (err, values) {
        // 若验证通过
        if (!err) {
          // 调用父组件
          if (customFun) {
            customFun(_objectSpread({}, values));
          } else {
            _this.props.onOk(_objectSpread({}, values));
          }
        }
      });
    };

    _this.returnRoles = function (rules) {
      var newRules = [];

      if (rules) {
        rules.map(function (item) {
          var obj = _objectSpread({}, item);

          if (item.validator) {
            obj.validator = function (rule, value, callback) {
              return item.validator(rule, value, callback, _this.props.form);
            };

            newRules.push(_objectSpread({}, obj));
          } else {
            newRules.push(_objectSpread({}, item));
          }

          return false;
        });
      }

      return newRules;
    };

    _this.getField = function (item) {
      if (item) {
        var getFieldDecorator = _this.props.form.getFieldDecorator;

        switch (item.type) {
          /* input框 */
          case "text":
            return getFieldDecorator(item.keyName, {
              rules: _this.returnRoles(item.rules),
              initialValue: item.defaultValue
            })(React.createElement(Input, {
              disabled: item.disabled,
              onChange: function onChange(e) {
                if (item.onChange) {
                  item.onChange(e, _this.props.form);
                }
              },
              placeholder: item.placeholder,
              style: item.itemInputStyle
            }));

          /* 数字框 */

          case "number":
            return getFieldDecorator(item.keyName, {
              rules: _this.returnRoles(item.rules),
              initialValue: item.defaultValue
            })(React.createElement(InputNumber, {
              disabled: item.disabled,
              max: item.max ? item.max : Infinity,
              min: item.min ? item.min : -Infinity,
              onChange: function onChange(value) {
                if (item.onChange) {
                  item.onChange(value, _this.props.form);
                }
              },
              placeholder: item.placeholder,
              style: item.itemInputStyle
            }));

          /* 密码框 */

          case "password":
            return getFieldDecorator(item.keyName, {
              rules: _this.returnRoles(item.rules),
              initialValue: item.defaultValue
            })(React.createElement(Input, {
              autoComplete: "new-password",
              disabled: item.disabled,
              onChange: function onChange(e) {
                if (item.onChange) {
                  item.onChange(e, _this.props.form);
                }
              },
              placeholder: item.placeholder,
              style: item.itemInputStyle,
              type: "password"
            }));

          /* 发送验证码 */

          case "verify":
            return getFieldDecorator(item.keyName, {
              rules: _this.returnRoles(item.rules),
              initialValue: item.defaultValue
            })(React.createElement(Search, {
              className: "verify",
              disabled: false,
              enterButton: _this.state.tipTxt,
              onSearch: function onSearch(value, e) {
                var btn = e.target;

                if (e.target.tagName === "BUTTON") {
                  item.onSearch(value, _this.props.form, function () {
                    // (发送验证码)请求成功回调
                    btn.disabled = true; // 禁用按钮

                    btn.classname = "disabled"; // 显示60s倒计时

                    _this.setState({
                      seconds: 60,
                      tipTxt: "60s"
                    });

                    var timer = setInterval(function () {
                      _this.setState(function (preState) {
                        return {
                          seconds: preState.seconds - 1,
                          tipTxt: _this.state.seconds - 1 + "s"
                        };
                      }, function () {
                        if (_this.state.seconds < 0) {
                          btn.disabled = false; // 恢复按钮

                          btn.classname = "";
                          clearInterval(timer);

                          _this.setState({
                            seconds: 60,
                            tipTxt: "点击发送"
                          });
                        }
                      });
                    }, 1000);
                  });
                }
              },
              placeholder: item.placeholder,
              style: item.itemInputStyle
            }));

          /* 文本域 */

          case "textarea":
            return getFieldDecorator(item.keyName, {
              rules: _this.returnRoles(item.rules),
              initialValue: item.defaultValue
            })(React.createElement(TextArea, {
              autosize: {
                minRows: item.rows || 2,
                maxRows: 6
              },
              disabled: item.disabled,
              onChange: function onChange(e) {
                if (item.onChange) {
                  item.onChange(e, _this.props.form);
                }
              },
              placeholder: item.placeholder,
              rows: item.rows,
              style: item.itemInputStyle
            }));

          /* 单选框 */

          case "radio":
            return getFieldDecorator(item.keyName, {
              rules: _this.returnRoles(item.rules),
              initialValue: item.defaultValue
            })(React.createElement(RadioGroup, {
              buttonStyle: "outline",
              onChange: function onChange(e) {
                if (item.onChange) {
                  item.onChange(e, _this.props.form);
                }
              },
              style: item.itemInputStyle
            }, item.options.length > 0 ? item.options.map(function (op) {
              return React.createElement(Radio, {
                key: op.value,
                disabled: item.disabled,
                value: op.value
              }, op.label);
            }) : ""));

          /* 复选框 */

          case "checkbox":
            return getFieldDecorator(item.keyName, {
              rules: _this.returnRoles(item.rules),
              initialValue: item.defaultValue
            })(React.createElement(CheckboxGroup, {
              disabled: item.disabled,
              onChange: function onChange(checkedValue) {
                if (item.onChange) {
                  item.onChange(checkedValue, _this.props.form);
                }
              },
              options: item.options,
              style: item.itemInputStyle
            }));

          /* 下拉框 */

          case "select":
            return getFieldDecorator(item.keyName, {
              rules: _this.returnRoles(item.rules),
              initialValue: item.defaultValue
            })(React.createElement(Select, {
              suffixIcon: React.createElement(Icon, {
                type: "caret-down"
              }),
              disabled: item.disabled,
              notFoundContent: "\u65E0",
              onChange: function onChange(value, option) {
                if (item.onChange) {
                  item.onChange(value, option, _this.props.form);
                }
              },
              placeholder: item.placeholder,
              style: item.itemInputStyle
            }, item.options.map(function (op) {
              return React.createElement(Option, {
                key: op.value,
                value: op.value
              }, op.label);
            })));

          /* 日期 */

          case "date":
            // 注：提交方法传出的date值是moment格式
            return getFieldDecorator(item.keyName, {
              rules: _this.returnRoles(item.rules),
              initialValue: item.defaultValue
            })(React.createElement(DatePicker, {
              disabled: item.disabled,
              disabledDate: item.disabledDate //禁用到 今天：(current)=>{return current && current < moment().endOf('day')}
              //禁用到 今天的前一天：(current)=>{return current && current < moment().subtract(1, 'days')}
              ,
              locale: locale,
              onChange: function onChange(date, dateString) {
                if (item.onChange) {
                  item.onChange(date, dateString, _this.props.form);
                }
              },
              placeholder: item.placeholder,
              style: item.itemInputStyle
            }));

          /* 周 */

          case "week":
            // 注：提交方法传出的date值是moment格式
            return getFieldDecorator(item.keyName, {
              rules: _this.returnRoles(item.rules),
              initialValue: item.defaultValue
            })(React.createElement(WeekPicker, {
              disabled: item.disabled,
              disabledDate: item.disabledDate,
              locale: locale,
              onChange: function onChange(date, dateString) {
                if (item.onChange) {
                  item.onChange(date, dateString, _this.props.form);
                }
              },
              placeholder: item.placeholder,
              style: item.itemInputStyle
            }));

          /* 月 */

          case "month":
            // 注：提交方法传出的date值是moment格式
            return getFieldDecorator(item.keyName, {
              rules: _this.returnRoles(item.rules),
              initialValue: item.defaultValue
            })(React.createElement(MonthPicker, {
              disabled: item.disabled,
              disabledDate: item.disabledDate,
              locale: locale,
              onChange: function onChange(date, dateString) {
                if (item.onChange) {
                  item.onChange(date, dateString, _this.props.form);
                }
              },
              placeholder: item.placeholder,
              style: item.itemInputStyle
            }));

          /* 时间 */

          case "datetime":
            // 注：提交方法传出的date值是moment格式
            return getFieldDecorator(item.keyName, {
              rules: _this.returnRoles(item.rules),
              initialValue: item.defaultValue
            })(React.createElement(DatePicker, {
              disabled: item.disabled,
              disabledDate: item.disabledDate,
              disabledTime: item.disabledTime,
              locale: locale,
              onChange: function onChange(date, dateString) {
                // 时间发生变化的回调
                if (item.onChange) {
                  item.onChange(date, dateString, _this.props.form);
                }
              },
              placeholder: item.placeholder,
              format: item.format || "YYYY-MM-DD HH:mm:ss",
              showTime: item.showTime || {
                // defaultValue: moment('00:00:00', 'HH:mm:ss'),
                format: 'HH:mm:ss'
              } //showTime:false(不带时刻)
              ,
              style: _objectSpread({
                width: "100%"
              }, item.itemInputStyle)
            }));

          /* 时间范围 */

          case "dateRange":
            return getFieldDecorator(item.keyName, {
              rules: _this.returnRoles(item.rules),
              initialValue: item.defaultValue
            })(React.createElement(RangePicker, {
              disabledDate: item.disabledDate,
              format: item.format || "YYYY-MM-DD HH:mm:ss",
              locale: locale,
              onChange: function onChange(date, dateString) {
                // 时间发生变化的回调
                if (item.onChange) {
                  item.onChange(date, dateString, _this.props.form);
                }
              },
              placeholder: item.placeholder,
              showTime: item.showTime ? item.showTime : false // showTime={{ defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],format: 'HH:mm:ss' }}
              ,
              style: _objectSpread({
                width: "100%"
              }, item.itemInputStyle)
            }));

          /* 上传文件 */

          case "file":
            return getFieldDecorator(item.keyName, {
              rules: _this.returnRoles(item.rules),
              initialValue: item.defaultValue
            })(React.createElement(MyUpload, _extends({}, item, {
              form: _this.props.form
            })));
          // 单个自定义组件

          case "custom":
            return getFieldDecorator(item.keyName, {
              rules: _this.returnRoles(item.rules),
              initialValue: item.defaultValue
            })(item.render(_this.props.form));

          case "multiCustom":
            // 多个自定义组件组合
            return item.render(_this.props.form);
          // render：(form)=>{return nodeDom} //将getFieldDecorator传递到外部

          default:
            return null;
        }
      } else {
        return null;
      }
    };

    _this.state = {
      // 验证码
      seconds: 60,
      tipTxt: "点击发送"
    };
    _this.formItemBox = React.createRef();
    return _this;
  }

  var _proto = MyForm.prototype;

  _proto.componentDidMount = function componentDidMount() {
    /* // this.resizeHeight(true);
    window.addEventListener("resize", () => {
        this.resizeHeight();
    }); */
  };

  _proto.componentDidUpdate = function componentDidUpdate() {}
  /* this.resizeHeight(true); */

  /* 设置内容高度 */
  ;

  _proto.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        _this$props$formItemL = _this$props.formItemLayout,
        formItemLayout = _this$props$formItemL === void 0 ? {
      labelCol: {
        span: 3
      },
      // label 标签布局
      wrapperCol: {
        span: 20
      }
    } : _this$props$formItemL,
        _this$props$buttonIte = _this$props.buttonItemLayout,
        buttonItemLayout = _this$props$buttonIte === void 0 ? {} : _this$props$buttonIte;
    var _this$props2 = this.props,
        _this$props2$formLayo = _this$props2.formLayout,
        formLayout = _this$props2$formLayo === void 0 ? "horizontal" : _this$props2$formLayo,
        _this$props2$withButt = _this$props2.withButtonContainter,
        withButtonContainter = _this$props2$withButt === void 0 ? true : _this$props2$withButt,
        customButton = _this$props2.customButton,
        _this$props2$hideRequ = _this$props2.hideRequiredMark,
        hideRequiredMark = _this$props2$hideRequ === void 0 ? false : _this$props2$hideRequ,
        _this$props2$itemList = _this$props2.itemList,
        itemList = _this$props2$itemList === void 0 ? [] : _this$props2$itemList,
        _this$props2$itemStyl = _this$props2.itemStyle,
        itemStyle = _this$props2$itemStyl === void 0 ? {} : _this$props2$itemStyl,
        onOk = _this$props2.onOk,
        _this$props2$okText = _this$props2.okText,
        okText = _this$props2$okText === void 0 ? "确定" : _this$props2$okText;
    formItemLayout = formLayout === 'vertical' || formLayout === 'double' ? {} : formItemLayout; // 适配 formLayout = "vertical" 时为{}

    buttonItemLayout = formLayout === 'vertical' || formLayout === 'double' ? {} : buttonItemLayout; // 适配 formLayout = "vertical" 时为{}

    return React.createElement(Form, {
      hideRequiredMark: hideRequiredMark,
      layout: formLayout,
      onSubmit: function onSubmit(e) {
        _this2.handleSubmit(e);
      }
    }, React.createElement("div", {
      ref: this.formItemBox,
      className: "form-item-box " + (formLayout === "double" ? "double-layout" : "")
    }, itemList.map(function (item) {
      var display = "block";

      if (item.visible === false) {
        display = "none";
      } else if (formLayout === "inline") {
        display = "inline-block";
      } else if (formLayout === "double") {
        display = "flex";
      }

      return React.createElement(FormItem, _extends({}, formItemLayout, {
        key: item.keyName // label 标签的文本
        ,
        hasFeedback: item.hasFeedback !== false,
        className: item.type,
        label: item.name,
        style: _objectSpread({
          display: display
        }, itemStyle, {}, item.itemStyle),
        wrapperCol: item.name ? formItemLayout.wrapperCol : {
          span: 24
        }
      }), _this2.getField(item));
    })), withButtonContainter ? React.createElement("div", {
      className: "action-button-container",
      style: _objectSpread({}, buttonItemLayout)
    }, this.props.children, customButton ? React.createElement(Button, {
      onClick: function onClick(e) {
        return _this2.handleSubmit(e, customButton.customFun);
      },
      style: {
        marginRight: "7px"
      },
      type: "primary"
    }, customButton.text) : "", onOk ? React.createElement(Button, {
      htmlType: "submit",
      type: "primary"
    }, okText) : "") : null);
  };

  return MyForm;
}(React.Component);

MyForm.defaultProps = {
  formLayout: 'horizontal',
  formItemLayout: {
    labelCol: {
      span: 3
    },
    // label 标签布局
    wrapperCol: {
      span: 20
    }
  },
  withButtonContainter: true,
  buttonItemLayout: {},
  customButton: false,
  hideRequiredMark: false,
  hasFeedback: true,
  itemList: [],
  itemStyle: {},
  onOk: undefined,
  okText: "确定",
  children: null,
  form: undefined
};
MyForm.propTypes = process.env.NODE_ENV !== "production" ? {
  formLayout: PropTypes.string,
  formItemLayout: PropTypes.object,
  withButtonContainter: PropTypes.bool,
  buttonItemLayout: PropTypes.object,
  customButton: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  hideRequiredMark: PropTypes.bool,
  hasFeedback: PropTypes.bool,
  itemList: PropTypes.array,
  itemStyle: PropTypes.object,
  onOk: PropTypes.func,
  okText: PropTypes.string,
  children: PropTypes.any,
  form: PropTypes.any
} : {};
var WrappedMyForm = Form.create()(MyForm);
export default WrappedMyForm;