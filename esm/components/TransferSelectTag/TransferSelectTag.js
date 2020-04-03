function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

import React from "react";
import { Transfer, Tooltip } from "antd";
import PropTypes from "prop-types";

var TransferSelectTag =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(TransferSelectTag, _React$Component);

  function TransferSelectTag() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.state = {
      targetKeys: _this.props.targetKeys,
      selectedKeys: [],
      sourceSelectedKeys: [],
      targetSelectedKeys: []
    };

    _this.handleChange = function (nextTargetKeys, direction, moveKeys) {
      _this.setState({
        targetKeys: nextTargetKeys
      });

      _this.props.onChange(nextTargetKeys, direction, moveKeys);
    };

    _this.handleSelectChange = function (sourceSelectedKeys, targetSelectedKeys) {
      _this.setState({
        selectedKeys: [].concat(sourceSelectedKeys, targetSelectedKeys),
        sourceSelectedKeys: sourceSelectedKeys,
        targetSelectedKeys: targetSelectedKeys
      });
    };

    _this.filterOption = function (inputValue, option) {
      return option.label.indexOf(inputValue) > -1;
    };

    return _this;
  }

  var _proto = TransferSelectTag.prototype;

  // 双击事件
  _proto.dbClick = function dbClick(id) {
    if (this.state.targetKeys.indexOf(id) === -1) {
      if (this.state.sourceSelectedKeys.length === 0) {
        // 没有选中双击左边一条
        this.handleChange([id].concat(this.state.targetKeys), "right", [id]);
      } else {
        // 有选中双击左边
        this.handleChange([].concat(this.state.sourceSelectedKeys, this.state.targetKeys), "right", this.state.sourceSelectedKeys);
        var arr = this.state.selectedKeys;
        this.state.sourceSelectedKeys.map(function (item) {
          return arr.splice(arr.indexOf(item), 1);
        });
        this.setState({
          selectedKeys: arr
        });
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (this.state.targetSelectedKeys.length === 0) {
        // 没有选中双击右边一条
        var _arr = this.state.targetKeys;

        _arr.splice(_arr.indexOf(id), 1);

        this.handleChange(_arr, "left", [id]);
      } else {
        // 有选中双击右边
        var _arr2 = this.state.targetKeys;
        this.state.targetSelectedKeys.map(function (item) {
          return _arr2.splice(_arr2.indexOf(item), 1);
        });
        this.handleChange(_arr2, "left", this.state.targetSelectedKeys);
        var selectedArr = this.state.selectedKeys;
        this.state.targetSelectedKeys.map(function (item) {
          return selectedArr.splice(selectedArr.indexOf(item), 1);
        });
        this.setState({
          selectedKeys: selectedArr
        });
      }
    }
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$state = this.state,
        targetKeys = _this$state.targetKeys,
        selectedKeys = _this$state.selectedKeys;
    var _this$props = this.props,
        dataSource = _this$props.dataSource,
        showSelect = _this$props.showSelect,
        titles = _this$props.titles,
        disabled = _this$props.disabled,
        onScroll = _this$props.onScroll,
        locale = _this$props.locale,
        showSearch = _this$props.showSearch,
        listStyle = _this$props.listStyle,
        className = _this$props.className;
    return React.createElement(Transfer, {
      className: showSelect ? "" + className : className + " noSelect-Transfer",
      dataSource: dataSource,
      disabled: disabled,
      filterOption: this.filterOption,
      listStyle: listStyle,
      locale: locale,
      onChange: this.handleChange,
      onScroll: onScroll,
      onSelectChange: this.handleSelectChange,
      render: function render(item) {
        return React.createElement(Tooltip, {
          title: item.description
        }, React.createElement("span", {
          onDoubleClick: function onDoubleClick() {
            return _this2.dbClick(item.key);
          }
        }, item.label));
      },
      selectedKeys: selectedKeys,
      showSearch: showSearch,
      targetKeys: targetKeys,
      titles: titles
    });
  };

  return TransferSelectTag;
}(React.Component);

TransferSelectTag.defaultProps = {
  dataSource: [],
  showSelect: true,
  titles: ["源列表", "目的列表"],
  targetKeys: [],
  disabled: false,
  showSearch: true,
  onChange: function onChange() {},
  onScroll: function onScroll() {},
  locale: {
    itemUnit: "条",
    itemsUnit: "条",
    notFoundContent: "列表为空",
    searchPlaceholder: "请输入搜索内容"
  },
  listStyle: {},
  className: ""
};
export { TransferSelectTag as default };
TransferSelectTag.propTypes = process.env.NODE_ENV !== "production" ? {
  dataSource: PropTypes.array,
  showSelect: PropTypes.bool,
  titles: PropTypes.array,
  targetKeys: PropTypes.array,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onScroll: PropTypes.func,
  locale: PropTypes.object,
  showSearch: PropTypes.bool,
  listStyle: PropTypes.object,
  className: PropTypes.string
} : {};