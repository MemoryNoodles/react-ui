function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

import React from "react";
import moment from "moment";
import { Form, Row, Col, Icon, Input, InputNumber, Select, DatePicker, Button, Switch, Radio, TreeSelect } from "antd";
import PropTypes from "prop-types";
import CheckTagGroup from "../CheckTagGroup/checkTagGroup";
var FormItem = Form.Item;
var Option = Select.Option;
var RadioGroup = Radio.Group;
var TreeNode = TreeSelect.TreeNode;
var MonthPicker = DatePicker.MonthPicker,
    WeekPicker = DatePicker.WeekPicker,
    RangePicker = DatePicker.RangePicker;
/*
 * SearchForm 高级搜索表单
 * author：徐静
 * date：2019.02.15
 * */

var SearchForm =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(SearchForm, _React$Component);

  function SearchForm(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.initJson = function () {
      _this.props.form.validateFields(function (err, values) {
        _this.json = values;
      });
    };

    _this.toggle = function () {
      _this.setState({
        expand: !_this.state.expand
      });
    };

    _this.getField = function (item) {
      if (item === void 0) {
        item = {};
      }

      var getFieldDecorator = _this.props.form.getFieldDecorator; // 默认折叠时仅留一行展示

      var _this$props = _this.props,
          collapsedShowRow = _this$props.collapsedShowRow,
          buttonsColSpan = _this$props.buttonsColSpan; // 初始化this.json

      _this.json[item.keyName] = _this.json[item.keyName] || item.defaultValue || "";

      switch (item.type) {
        case "text":
          return React.createElement(Col, {
            key: item.keyName,
            xl: item.colSpan || 4 // ≥1200px
            ,
            lg: item.colSpan || 4 // ≥992px
            ,
            md: item.mdColSpan || 6 // ≥768px
            ,
            sm: item.smColSpan || 8 // ≥576px
            ,
            xs: item.xsColSpan || 12 // <576px
            ,
            style: {
              display: _this.totalColSpan <= 24 * collapsedShowRow - buttonsColSpan || _this.state.expand ? "block" : "none"
            }
          }, React.createElement("div", {
            className: "form-item-input-container"
          }, React.createElement(FormItem, _extends({}, item.formItemLayout, {
            label: item.name,
            style: item.itemStyle
          }), getFieldDecorator(item.keyName, {
            rules: item.rules ? item.rules : [],
            initialValue: item.defaultValue ? item.defaultValue : ""
          })(React.createElement(Input, {
            disabled: item.disabled,
            onChange: function onChange(e) {
              if (item.onChange) {
                item.onChange(e, _this.props.form);
              }
            },
            placeholder: item.placeholder,
            style: item.itemInputStyle
          })))));

        case "number":
          return React.createElement(Col, {
            key: item.keyName,
            xl: item.colSpan || 4 // ≥1200px
            ,
            lg: item.colSpan || 4 // ≥992px
            ,
            md: item.mdColSpan || 6 // ≥768px
            ,
            sm: item.smColSpan || 8 // ≥576px
            ,
            xs: item.xsColSpan || 12 // <576px
            ,
            style: {
              display: _this.totalColSpan <= 24 * collapsedShowRow - buttonsColSpan || _this.state.expand ? "block" : "none"
            }
          }, React.createElement("div", {
            className: "form-item-input-container"
          }, React.createElement(FormItem, _extends({}, item.formItemLayout, {
            label: item.name,
            style: item.itemStyle
          }), getFieldDecorator(item.keyName, {
            rules: item.rules ? item.rules : [],
            initialValue: item.defaultValue ? item.defaultValue : "" // 默认初始值

          })(React.createElement(InputNumber, {
            disabled: item.disabled,
            max: item.max,
            min: item.min,
            onChange: function onChange(e) {
              if (item.onChange) {
                item.onChange(e, _this.props.form);
              }
            },
            placeholder: item.placeholder,
            style: item.itemInputStyle
          })))));

        case "switch":
          return React.createElement(Col, {
            key: item.keyName,
            xl: item.colSpan || 4 // ≥1200px
            ,
            lg: item.colSpan || 4 // ≥992px
            ,
            md: item.mdColSpan || 6 // ≥768px
            ,
            sm: item.smColSpan || 8 // ≥576px
            ,
            xs: item.xsColSpan || 12 // <576px
            ,
            style: {
              display: _this.totalColSpan <= 24 * collapsedShowRow - buttonsColSpan || _this.state.expand ? "block" : "none"
            }
          }, React.createElement(FormItem, {
            label: item.name,
            style: item.itemStyle
          }, getFieldDecorator(item.keyName, {
            rules: item.rules ? item.rules : [],
            initialValue: item.defaultValue ? item.defaultValue : ""
          })(React.createElement(Switch, {
            checkedChildren: "ON",
            unCheckedChildren: "OFF"
          }))));

        case "radio":
          return React.createElement(Col, {
            key: item.keyName,
            xl: item.colSpan || 4 // ≥1200px
            ,
            lg: item.colSpan || 4 // ≥992px
            ,
            md: item.mdColSpan || 6 // ≥768px
            ,
            sm: item.smColSpan || 8 // ≥576px
            ,
            xs: item.xsColSpan || 12 // <576px
            ,
            style: {
              display: _this.totalColSpan <= 24 * collapsedShowRow - buttonsColSpan || _this.state.expand ? "block" : "none"
            }
          }, React.createElement(FormItem, {
            label: item.name,
            style: item.itemStyle
          }, getFieldDecorator(item.keyName, {
            rules: item.rules ? item.rules : [],
            initialValue: item.defaultValue ? item.defaultValue : "" // 默认初始值

          })(React.createElement(RadioGroup, {
            buttonStyle: "outline",
            disabled: item.disabled,
            onChange: function onChange(e) {
              if (item.onChange) {
                item.onChange(e, _this.props.form);
              }
            },
            style: item.itemInputStyle
          }, item.options && item.options.length > 0 ? item.options.map(function (op) {
            return React.createElement(Radio, {
              key: op.value,
              disabled: item.disabled,
              value: op.value
            }, op.label);
          }) : ""))));
        // 定制单选tag（带取消选中效果）

        case "radioTag":
          return React.createElement(Col, {
            key: item.keyName,
            xl: item.colSpan || 4 // ≥1200px
            ,
            lg: item.colSpan || 4 // ≥992px
            ,
            md: item.mdColSpan || 6 // ≥768px
            ,
            sm: item.smColSpan || 8 // ≥576px
            ,
            xs: item.xsColSpan || 12 // <576px
            ,
            style: {
              display: _this.totalColSpan <= 24 * collapsedShowRow - buttonsColSpan || _this.state.expand ? "block" : "none"
            }
          }, React.createElement(FormItem, {
            label: item.name,
            style: item.itemStyle
          }, getFieldDecorator(item.keyName, {
            rules: item.rules ? item.rules : [],
            initialValue: item.defaultValue ? [item.defaultValue] : [] // 默认初始值

          })(React.createElement(CheckTagGroup, {
            disabled: item.disabled,
            onChange: function onChange(checkedList) {
              // 选中某一个tag
              if (checkedList && checkedList.length > 0) {
                _this.json[item.keyName] = checkedList[0];
              } else {
                // 取消某一个tag
                _this.json[item.keyName] = "";
              }

              if (item.onChange) {
                item.onChange(checkedList);
              }
            },
            style: _objectSpread({
              display: "flex",
              flexWrap: "nowrap"
            }, item.itemInputStyle),
            tags: item.options,
            tagStyle: {
              width: "100%",
              height: 30,
              lineHeight: "30px",
              textAlign: "center",
              border: "1px solid #ddd"
            },
            tagWrapStyle: {
              width: "30%",
              marginRight: "3%"
            },
            type: "radioWithCancel"
          }))));

        case "select":
          return React.createElement(Col, {
            key: item.keyName,
            xl: item.colSpan || 4 // ≥1200px
            ,
            lg: item.colSpan || 4 // ≥992px
            ,
            md: item.mdColSpan || 6 // ≥768px
            ,
            sm: item.smColSpan || 8 // ≥576px
            ,
            xs: item.xsColSpan || 12 // <576px
            ,
            style: {
              display: _this.totalColSpan <= 24 * collapsedShowRow - buttonsColSpan || _this.state.expand ? "block" : "none"
            }
          }, React.createElement("div", {
            className: "form-item-select-container"
          }, React.createElement(FormItem, _extends({}, item.formItemLayout, {
            label: item.name,
            style: item.itemStyle
          }), getFieldDecorator(item.keyName, {
            rules: item.rules ? item.rules : [],
            initialValue: item.defaultValue ? item.defaultValue : ""
          })(React.createElement(Select, {
            suffixIcon: React.createElement(Icon, {
              type: "caret-down"
            }),
            key: item.value,
            disabled: item.disabled,
            filterOption: function filterOption(input, option) {
              return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
            },
            onChange: function onChange(value, option) {
              if (item.onChange) {
                item.onChange(value, option, _this.props.form);
              }
            },
            placeholder: item.placeholder,
            showSearch: item.showSearch,
            style: item.itemInputStyle
          }, item.options && item.options.map(function (op) {
            return React.createElement(Option, _extends({}, op, {
              key: op.value,
              value: op.value
            }), op.label);
          }))))));

        case "selectTree":
          return React.createElement(Col, {
            key: item.keyName,
            xl: item.colSpan || 4 // ≥1200px
            ,
            lg: item.colSpan || 4 // ≥992px
            ,
            md: item.mdColSpan || 6 // ≥768px
            ,
            sm: item.smColSpan || 8 // ≥576px
            ,
            xs: item.xsColSpan || 12 // <576px
            ,
            style: {
              display: _this.totalColSpan <= 24 * collapsedShowRow - buttonsColSpan || _this.state.expand ? "block" : "none"
            }
          }, React.createElement("div", {
            className: "form-item-input-container"
          }, React.createElement(FormItem, _extends({}, item.formItemLayout, {
            label: item.name,
            style: item.itemStyle
          }), getFieldDecorator(item.keyName, {
            rules: item.rules ? item.rules : [],
            initialValue: item.defaultValue ? item.defaultValue : "" // 默认初始值

          })(React.createElement(TreeSelect, {
            allowClear: true,
            dropdownStyle: {
              maxHeight: 300,
              overflow: 'auto'
            },
            multiple: true,
            placeholder: "\u8BF7\u9009\u62E9\u5750\u5E2D",
            showSearch: true,
            treeCheckable: true
          }, item.options && item.options.map(function (op) {
            return React.createElement(TreeNode, {
              key: op.id + op.name,
              selectable: false,
              title: op.name,
              value: op.name
            }, op.member && op.member.map(function (subItem) {
              return React.createElement(TreeNode, {
                key: subItem.id,
                title: subItem.name,
                value: subItem.id
              });
            }));
          }))))));

        case "date":
          return React.createElement(Col, {
            key: item.keyName,
            xl: item.colSpan || 4 // ≥1200px
            ,
            lg: item.colSpan || 4 // ≥992px
            ,
            md: item.mdColSpan || 6 // ≥768px
            ,
            sm: item.smColSpan || 8 // ≥576px
            ,
            xs: item.xsColSpan || 12 // <576px
            ,
            style: {
              display: _this.totalColSpan <= 24 * collapsedShowRow - buttonsColSpan || _this.state.expand ? "block" : "none"
            }
          }, React.createElement(FormItem, {
            label: item.name,
            style: item.itemStyle
          }, getFieldDecorator(item.keyName, {
            rules: item.rules ? item.rules : [],
            initialValue: item.defaultValue ? item.defaultValue : ""
          })(item.dateType === "week" ? React.createElement(WeekPicker, {
            disabled: item.disabled,
            disabledDate: item.disabledDate,
            onChange: function onChange(date, dateString) {
              _this.json[item.keyName] = date.startOf("isoWeek").format("YYYY-MM-DD") + "~" + date.endOf("isoWeek").format("YYYY-MM-DD");
              item.onChange && item.onChange(date, dateString, _this.props.form);
            },
            placeholder: item.placeholder,
            style: item.itemInputStyle
          }) : item.dateType === "month" ? React.createElement(MonthPicker, {
            disabled: item.disabled,
            disabledDate: item.disabledDate,
            onChange: function onChange(date, dateString) {
              _this.json[item.keyName] = dateString;
              item.onChange && item.onChange(date, dateString, _this.props.form);
            },
            placeholder: item.placeholder,
            style: item.itemInputStyle
          }) : React.createElement(DatePicker, {
            disabled: item.disabled,
            disabledDate: item.disabledDate,
            onChange: function onChange(date, dateString) {
              _this.json[item.keyName] = dateString;
              item.onChange && item.onChange(date, dateString, _this.props.form);
            },
            placeholder: item.placeholder,
            showTime: item.showTime ? item.showTime : false // showTime={{
            //     defaultValue: moment('00:00:00', 'HH:mm:ss'),
            //     format: 'HH:mm:ss'
            // }}
            ,
            style: item.itemInputStyle
          }))));

        case "dateRange":
          return React.createElement(Col, {
            key: item.keyName,
            xl: item.colSpan || 4 // ≥1200px
            ,
            lg: item.colSpan || 4 // ≥992px
            ,
            md: item.mdColSpan || 6 // ≥768px
            ,
            sm: item.smColSpan || 8 // ≥576px
            ,
            xs: item.xsColSpan || 12 // <576px
            ,
            style: {
              display: _this.totalColSpan <= 24 * collapsedShowRow - buttonsColSpan || _this.state.expand ? "block" : "none"
            }
          }, React.createElement(FormItem, {
            label: item.name,
            style: item.itemStyle
          }, getFieldDecorator(item.keyName, {
            rules: item.rules ? item.rules : [],
            initialValue: item.defaultValue ? item.defaultValue : ""
          })(React.createElement(RangePicker, {
            disabled: item.disabled,
            disabledDate: item.disabledDate,
            onChange: function onChange(date, dateString) {
              _this.json[item.keyName] = dateString;

              if (item.beginKeyName) {
                _this.json[item.beginKeyName] = dateString[0];
              }

              if (item.endKeyName) {
                _this.json[item.endKeyName] = dateString[1];
              }

              item.onChange && item.onChange(date, dateString, _this.props.form);
            },
            placeholder: item.placeholder || ["开始日期", "结束日期"],
            format: item.format ? item.format : "YYYY-MM-DD",
            showTime: item.showTime ? item.showTime : false // showTime={{ format: 'HH:mm:ss' }}
            ,
            style: item.itemInputStyle
          }))));

        case "custom":
          return React.createElement(Col, {
            key: item.name,
            xl: item.colSpan || 4 // ≥1200px
            ,
            lg: item.colSpan || 4 // ≥992px
            ,
            md: item.mdColSpan || 6 // ≥768px
            ,
            sm: item.smColSpan || 8 // ≥576px
            ,
            xs: item.xsColSpan || 12 // <576px
            ,
            style: {
              display: _this.totalColSpan <= 24 * collapsedShowRow - buttonsColSpan || _this.state.expand ? "block" : "none"
            }
          }, React.createElement(FormItem, {
            label: item.name,
            style: item.itemStyle
          }, getFieldDecorator(item.keyName, {
            rules: item.rules ? item.rules : [],
            initialValue: item.defaultValue ? item.defaultValue : ""
          })(item.render(_this.props.form))));

        default:
          return null;
      }
    };

    _this.state = {
      expand: _this.props.defaultExpand || true // 当前折叠状态

    };
    _this.totalColSpan = 0; // 提交时获取的表单值

    _this.json = {};
    return _this;
  }

  var _proto = SearchForm.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.initJson();
  }
  /* componentDidUpdate(){
      this.initJson()
  } */
  // 初试化Json
  ;

  // 表单搜索
  _proto.handleSearch = function handleSearch(e) {
    var _this2 = this;

    var event = e || window.event;

    if (event) {
      event.preventDefault();
    }

    this.props.form.validateFields(function (err, values) {
      // 若验证通过
      if (!err) {
        Object.keys(values).map(function (i) {
          if (!moment.isMoment(values[i])) {
            _this2.json[i] = values[i];
          }

          return false;
        });
        Object.keys(_this2.json).map(function (i) {
          if (_this2.json[i] === undefined) {
            _this2.json[i] = "";
          }

          return false;
        }); // console.log(this.json, "this.json",values);
        // 调用父组件

        if (_this2.props.search) {
          _this2.props.search(_objectSpread({}, _this2.json));
        }
      }
    });
  } // 表单重置
  ;

  _proto.handleReset = function handleReset() {
    this.json = {};
    this.props.form.resetFields(); // 获取全部组件的值

    var json = this.props.form.getFieldsValue();

    if (this.props.reset) {
      this.props.reset(_objectSpread({}, json));
    } // resetType：1:重置后自动查询（默认）  2：重置后不自动查询


    if (this.props.resetType === 1 && this.props.search) {
      // true：该查询属于重置查询
      this.props.search(_objectSpread({}, json), true);
    }
  } // 获取某一表单项
  ;

  // 获取所有表单项
  _proto.getFields = function getFields() {
    var config = this.props.config;
    var children = [];
    this.totalColSpan = 0; // 遍历配置列表

    for (var i = 0, len = config.length; i < len; i++) {
      var item = config[i]; // totalColSpan用于计算折叠，仅留一行展示

      this.totalColSpan += item.colSpan ? item.colSpan : 4;
      children.push(this.getField(item));
    }

    return children;
  };

  _proto.render = function render() {
    var _this3 = this;

    return React.createElement(Form, {
      className: "ant-advanced-search-form " + this.props.wrapClassName,
      layout: "inline",
      onSubmit: function onSubmit(e) {
        return _this3.handleSearch(e);
      }
    }, React.createElement(Row, {
      align: "top",
      gutter: 16,
      justify: this.props.justify,
      type: "flex"
    }, this.getFields(), React.createElement(Col, {
      span: this.props.buttonsColSpan,
      style: {
        position: "relative",
        top: 2,
        display: "flex",
        flexWrap: "nowrap",
        alignItems: "center",
        paddingBottom: 10
      }
    }, React.createElement(Button, {
      htmlType: "submit",
      type: "primary"
    }, "\u67E5\u8BE2"), React.createElement(Button, {
      onClick: function onClick() {
        return _this3.handleReset();
      },
      style: {
        marginLeft: 8
      }
    }, "\u91CD\u7F6E"), React.createElement("span", {
      style: {
        marginLeft: 8,
        fontSize: 12
      }
    }, // 若允许折叠
    this.props.collapse ? React.createElement("a", {
      onClick: this.toggle,
      style: {
        whiteSpace: "nowrap"
      }
    }, this.state.expand ? "收起" : "展开", React.createElement(Icon, {
      type: this.state.expand ? "up" : "down"
    })) : ""))));
  };

  return SearchForm;
}(React.Component);

SearchForm.defaultProps = {
  collapse: false,
  // 是否允许折叠
  collapsedShowRow: 1,
  // 折叠时展示几行
  defaultExpand: true,
  // 初始默认折叠状态：true:展开
  buttonsColSpan: 4,
  form: {},
  config: [],
  justify: "start",
  // 对齐方式
  wrapClassName: "",
  search: function search() {},
  reset: function reset() {},
  resetType: 1 // 1:重置后自动查询  2：重置后不自动查询

};
SearchForm.propTypes = process.env.NODE_ENV !== "production" ? {
  collapse: PropTypes.bool,
  collapsedShowRow: PropTypes.number,
  defaultExpand: PropTypes.bool,
  buttonsColSpan: PropTypes.number,
  form: PropTypes.object,
  config: PropTypes.array,
  justify: PropTypes.oneOf(['start', 'center', 'end']),
  wrapClassName: PropTypes.string,
  search: PropTypes.func,
  reset: PropTypes.func,
  resetType: PropTypes.number
} : {};
var WrappedSearchForm = Form.create()(SearchForm);
export default WrappedSearchForm;