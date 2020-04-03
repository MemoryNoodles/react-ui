function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

import React from "react";
import { Badge, Tag } from "antd";
import PropTypes from "prop-types";
var CheckableTag = Tag.CheckableTag;

var MyTag =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(MyTag, _React$Component);

  function MyTag(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.handleChange = function (checked) {
      if (checked === void 0) {
        checked = false;
      }

      _this.setState({
        checked: checked
      }); // 回调：value传回父组件


      _this.props.onChange(_this.props.value);
    };

    _this.state = {
      checked: _this.props.checked
    };
    return _this;
  }

  var _proto = MyTag.prototype;

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextprops) {
    if (this.props.checked !== nextprops.checked) {
      this.setState({
        checked: nextprops.checked
      });
    }
  };

  _proto.render = function render() {
    return this.props.disabled ? React.createElement(Tag, _extends({}, this.props, {
      style: {
        cursor: "not-allowed"
      }
    }), this.props.tag.label) : React.createElement(CheckableTag, _extends({}, this.props, {
      checked: this.state.checked,
      onChange: this.handleChange
    }));
  };

  return MyTag;
}(React.Component);
/*
 * 带checked单选、多选功能的tags 组件
 * author：徐静
 * date：2019.02.15
 * */


MyTag.defaultProps = {
  checked: false,
  disabled: false,
  tag: {},
  value: "",
  onChange: function onChange(value) {}
};
MyTag.propTypes = process.env.NODE_ENV !== "production" ? {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  tag: PropTypes.object,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func
} : {};

var CheckTagGroup =
/*#__PURE__*/
function (_React$Component2) {
  _inheritsLoose(CheckTagGroup, _React$Component2);

  function CheckTagGroup(props) {
    var _this2;

    _this2 = _React$Component2.call(this, props) || this;
    _this2.state = {
      // 选中列表(外部只赋初值，该变量内部维护)
      checkedList: _this2.props.defaultCheckedList,
      checkedTags: []
    };
    return _this2;
  }

  var _proto2 = CheckTagGroup.prototype;

  _proto2.componentWillMount = function componentWillMount() {
    var _this$props = this.props,
        _this$props$defaultCh = _this$props.defaultCheckedList,
        defaultCheckedList = _this$props$defaultCh === void 0 ? [] : _this$props$defaultCh,
        tags = _this$props.tags;

    if (defaultCheckedList.length > 0) {
      var checkedTags = [];
      defaultCheckedList.forEach(function (checkItem) {
        tags.forEach(function (tag) {
          if (tag.value === checkItem) {
            checkedTags.push(tag);
          }
        });
      });
      this.setState({
        checkedTags: checkedTags
      });
    }
  };

  _proto2.onTagChange = function onTagChange(value, option) {
    var _this$state = this.state,
        _this$state$checkedLi = _this$state.checkedList,
        checkedList = _this$state$checkedLi === void 0 ? [] : _this$state$checkedLi,
        _this$state$checkedTa = _this$state.checkedTags,
        checkedTags = _this$state$checkedTa === void 0 ? [] : _this$state$checkedTa;

    switch (this.props.type) {
      case "radio":
        if (this.state.checkedList.includes(value)) {
          checkedList = [];
          checkedTags = [];
        } else {
          checkedList = [value];
          checkedTags = [option];
        }

        break;

      case "checkbox":
        if (this.state.checkedList.includes(value)) {
          checkedList = this.state.checkedList.filter(function (item) {
            return item !== value;
          });
          checkedTags = this.state.checkedTags.filter(function (tag) {
            return tag.value !== value;
          });
        } else {
          checkedList.push(value);
          checkedTags.push(option);
        }

        break;

      default:
        break;
    } // 渲染页面显示


    this.setState({
      checkedList: checkedList,
      checkedTags: checkedTags
    }); // 回调：checkedList传回父组件

    this.props.onChange && this.props.onChange(checkedList, checkedTags);
  };

  _proto2.render = function render() {
    var _this3 = this;

    return React.createElement("div", {
      className: "ant-tag-check-group " + this.props.wrapClassName
    }, this.props.tags.map(function (tag) {
      return tag.withPoint ? React.createElement(Badge, {
        className: "tag-check-point",
        dot: true
      }, React.createElement(MyTag, {
        key: tag.value,
        checked: _this3.state.checkedList.includes(tag.value),
        className: "my-checkable-tag " + _this3.props.tagClassName,
        disabled: tag.disabled,
        onChange: function onChange(value) {
          _this3.onTagChange(value, tag);
        },
        tag: tag,
        value: tag.value
      }, tag.label)) : React.createElement(MyTag, {
        key: tag.value,
        checked: _this3.state.checkedList.includes(tag.value),
        className: "my-checkable-tag " + _this3.props.tagClassName,
        disabled: tag.disabled,
        onChange: function onChange(value) {
          _this3.onTagChange(value, tag);
        },
        tag: tag,
        value: tag.value
      }, tag.label);
    }));
  };

  return CheckTagGroup;
}(React.Component);

CheckTagGroup.defaultProps = {
  defaultCheckedList: [],
  onChange: function onChange(checkedList, option) {},
  type: "checkbox",
  tags: [{
    value: 1,
    label: "苹果",
    extraProps: 'apple',
    withPoint: true
  }, {
    value: 2,
    label: "香蕉",
    extraProps: 'banana'
  }, {
    value: 3,
    label: "橘子",
    extraProps: 'orange'
  }, {
    value: 4,
    label: "柠檬",
    extraProps: 'lemon',
    disabled: true
  }],
  wrapClassName: "",
  tagClassName: ""
};
export { CheckTagGroup as default };
CheckTagGroup.propTypes = process.env.NODE_ENV !== "production" ? {
  defaultCheckedList: PropTypes.array,
  onChange: PropTypes.func,
  type: PropTypes.oneOf(['radio', 'checkbox']),
  tags: PropTypes.array,
  wrapClassName: PropTypes.string,
  tagClassName: PropTypes.string
} : {};