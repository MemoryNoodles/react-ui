"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Search = _antd.Input.Search;

var TransferTag =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(TransferTag, _React$Component);

  function TransferTag(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.arrayEquals = function (aArr, bArr) {
      if (!aArr || !bArr) {
        return false;
      }

      if (aArr.length !== bArr.length) {
        return false;
      }

      for (var i = 0, l = aArr.length; i < l; i++) {
        // Check if we have nested arrays
        if (aArr[i] instanceof Array && bArr[i] instanceof Array) {
          // recurse into the nested arrays
          if (!_this.arrayEquals(aArr[i], bArr[i])) return false;
        } else if (aArr[i] instanceof Object && bArr[i] instanceof Object) {
          if (!_this.objEquals(aArr[i], bArr[i])) {
            return false;
          }
        } else if (aArr[i] !== bArr[i]) {
          // Warning - two different object instances will never be equal: {x:20} != {x:20}
          return false;
        }
      }

      return true;
    };

    _this.objEquals = function (object1, object2) {
      // For the first loop, we only check for types
      for (var propName in object1) {
        // eslint-disable-line
        // Check for inherited methods and properties - like .equals itself
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
        // Return false if the return value is different
        if (object1.hasOwnProperty(propName) !== object2.hasOwnProperty(propName)) {
          // eslint-disable-line
          return false;
        } // Check instance type
        else if (typeof object1[propName] !== typeof object2[propName]) {
            // Different types => not equal
            return false;
          }
      } // Now a deeper check using other objects property names


      for (var _propName in object2) {
        // eslint-disable-line
        // We must check instances anyway, there may be a property that only exists in object2
        // I wonder, if remembering the checked values from the first loop would be faster or not
        if (object1.hasOwnProperty(_propName) !== object2.hasOwnProperty(_propName)) {
          // eslint-disable-line
          return false;
        } else if (typeof object1[_propName] !== typeof object2[_propName]) {
          return false;
        } // If the property is inherited, do not check any more (it must be equa if both objects inherit it)


        if (!object1.hasOwnProperty(_propName)) // eslint-disable-line
          continue; // eslint-disable-line
        // Now the detail check and recursion
        // This returns the script back to the array comparing

        /** REQUIRES Array.equals* */

        if (object1[_propName] instanceof Array && object2[_propName] instanceof Array) {
          // recurse into the nested arrays
          if (!object1[_propName].equals(object2[_propName])) return false;
        } else if (object1[_propName] instanceof Object && object2[_propName] instanceof Object) {
          // recurse into another objects
          // console.log("Recursing to compare ", this[propName],"with",object2[propName], " both named \""+propName+"\"");
          if (!object1[_propName].equals(object2[_propName])) return false;
        } // Normal value comparison for strings and numbers
        else if (object1[_propName] !== object2[_propName]) {
            return false;
          }
      }

      return true;
    };

    _this.componentWillReceiveProps = function (nextProps) {
      if (!_this.flag && (!_this.arrayEquals(_this.props.sourceData, nextProps.sourceData) || !_this.arrayEquals(_this.props.value, nextProps.value))) {
        _this.setState({
          targetData: [].concat(nextProps.value) || [],
          sourceData: [].concat(nextProps.sourceData) || [],
          targetDataFilter: nextProps.value ? [].concat(nextProps.value).filter(function (item) {
            return item.label.indexOf(_this.state.targetSearchValue) > -1;
          }) : [],
          // 目标 过滤之后的数据
          sourceDataFilter: nextProps.sourceData ? [].concat(nextProps.sourceData).filter(function (item) {
            return item.label.indexOf(_this.state.sourceSearchValue) > -1;
          }) : [] // 源 过滤之后的数据

        });
      }
    };

    _this.sourceToTag = function (obj) {
      var _this$state = _this.state,
          _this$state$targetDat = _this$state.targetDataFilter,
          targetDataFilter = _this$state$targetDat === void 0 ? [] : _this$state$targetDat,
          _this$state$sourceDat = _this$state.sourceDataFilter,
          sourceDataFilter = _this$state$sourceDat === void 0 ? [] : _this$state$sourceDat,
          _this$state$targetDat2 = _this$state.targetData,
          targetData = _this$state$targetDat2 === void 0 ? [] : _this$state$targetDat2,
          _this$state$sourceDat2 = _this$state.sourceData,
          sourceData = _this$state$sourceDat2 === void 0 ? [] : _this$state$sourceDat2,
          _this$state$targetSea = _this$state.targetSearchValue,
          targetSearchValue = _this$state$targetSea === void 0 ? "" : _this$state$targetSea;
      var sourceArr = sourceData.filter(function (item) {
        return item.value !== obj.value;
      }); // 过滤掉源数组当前选中的项

      var sourceFilterArr = sourceDataFilter.filter(function (item) {
        return "" + item.value !== "" + obj.value;
      }); // 过滤掉页面显示源数组当前选中的项

      var flag = targetData.some(function (item) {
        return "" + item.value === "" + obj.value;
      }); // 判断目标数组中是否有重复的

      if (!flag) {
        // 判重
        targetData.push(obj);

        if (obj.label.indexOf(targetSearchValue) > -1) {
          // 根据过滤条件需要是否要显示在页面上
          targetDataFilter.push(obj);
        }
      }

      _this.setState({
        targetData: targetData,
        sourceData: sourceArr,
        sourceDataFilter: sourceFilterArr,
        targetDataFilter: targetDataFilter
      }, function () {
        _this.dataChange();

        _this.flag = true; // 为了防止页面重复刷新 以致死循环
      });
    };

    _this.targetToSource = function (obj) {
      var delPermission = _this.props.delPermission;

      if (delPermission && typeof delPermission === "function") {
        delPermission([obj.value], function (isCan) {
          if (isCan) {
            var _this$state2 = _this.state,
                _this$state2$targetDa = _this$state2.targetDataFilter,
                targetDataFilter = _this$state2$targetDa === void 0 ? [] : _this$state2$targetDa,
                _this$state2$sourceDa = _this$state2.sourceDataFilter,
                sourceDataFilter = _this$state2$sourceDa === void 0 ? [] : _this$state2$sourceDa,
                _this$state2$targetDa2 = _this$state2.targetData,
                targetData = _this$state2$targetDa2 === void 0 ? [] : _this$state2$targetDa2,
                _this$state2$sourceDa2 = _this$state2.sourceData,
                sourceData = _this$state2$sourceDa2 === void 0 ? [] : _this$state2$sourceDa2,
                _this$state2$sourceSe = _this$state2.sourceSearchValue,
                sourceSearchValue = _this$state2$sourceSe === void 0 ? "" : _this$state2$sourceSe;
            var targetArr = targetData.filter(function (item) {
              return item.value !== obj.value;
            }); // 去掉目标数据中未过滤数组的对象

            var targetFilterArr = targetDataFilter.filter(function (item) {
              return "" + item.value !== "" + obj.value;
            }); // 去掉目标数据中已过滤数组的对象

            var flag = sourceData.some(function (item) {
              return "" + item.value === "" + obj.value;
            }); // 判断原数据有没有相同id的数据   判重

            if (!flag) {
              sourceData.push(obj); // 判断原数据有没有相同id的数据   判重 不重复  添加

              if (obj.label.indexOf(sourceSearchValue) > -1) {
                sourceDataFilter.push(obj); // 判断原数据有没有相同id的数据   判重 不重复  加上过滤条件添加
              }
            }

            _this.setState({
              targetData: targetArr,
              sourceData: sourceData,
              sourceDataFilter: sourceDataFilter,
              targetDataFilter: targetFilterArr
            }, function () {
              _this.dataChange();

              _this.flag = true;
            });
          }
        });
      } else {
        var _this$state3 = _this.state,
            _this$state3$targetDa = _this$state3.targetDataFilter,
            targetDataFilter = _this$state3$targetDa === void 0 ? [] : _this$state3$targetDa,
            _this$state3$sourceDa = _this$state3.sourceDataFilter,
            sourceDataFilter = _this$state3$sourceDa === void 0 ? [] : _this$state3$sourceDa,
            _this$state3$targetDa2 = _this$state3.targetData,
            targetData = _this$state3$targetDa2 === void 0 ? [] : _this$state3$targetDa2,
            _this$state3$sourceDa2 = _this$state3.sourceData,
            sourceData = _this$state3$sourceDa2 === void 0 ? [] : _this$state3$sourceDa2,
            _this$state3$sourceSe = _this$state3.sourceSearchValue,
            sourceSearchValue = _this$state3$sourceSe === void 0 ? "" : _this$state3$sourceSe;
        var targetArr = targetData.filter(function (item) {
          return item.value !== obj.value;
        }); // 去掉目标数据中未过滤数组的对象

        var targetFilterArr = targetDataFilter.filter(function (item) {
          return "" + item.value !== "" + obj.value;
        }); // 去掉目标数据中已过滤数组的对象

        var flag = sourceData.some(function (item) {
          return "" + item.value === "" + obj.value;
        }); // 判断原数据有没有相同id的数据   判重

        if (!flag) {
          sourceData.push(obj); // 判断原数据有没有相同id的数据   判重 不重复  添加

          if (obj.label.indexOf(sourceSearchValue) > -1) {
            sourceDataFilter.push(obj); // 判断原数据有没有相同id的数据   判重 不重复  加上过滤条件添加
          }
        }

        _this.setState({
          targetData: targetArr,
          sourceData: sourceData,
          sourceDataFilter: sourceDataFilter,
          targetDataFilter: targetFilterArr
        }, function () {
          _this.dataChange();

          _this.flag = true;
        });
      }
    };

    _this.targetSearch = function (value) {
      var _this$state$targetDat3 = _this.state.targetData,
          targetData = _this$state$targetDat3 === void 0 ? [] : _this$state$targetDat3;
      var arr = targetData.filter(function (item) {
        return item.label.indexOf(value) > -1;
      });

      _this.setState({
        targetDataFilter: arr
      }, function () {
        _this.dataChange();

        _this.flag = true;
      });
    };

    _this.sourceSearch = function (value) {
      var _this$state$sourceDat3 = _this.state.sourceData,
          sourceData = _this$state$sourceDat3 === void 0 ? [] : _this$state$sourceDat3;
      var arr = sourceData.filter(function (item) {
        return item.label.indexOf(value) > -1;
      });

      _this.setState({
        sourceDataFilter: arr
      }, function () {
        _this.dataChange();

        _this.flag = true;
      });
    };

    _this.clearTarget = function () {
      var _this$state4 = _this.state,
          _this$state4$targetDa = _this$state4.targetDataFilter,
          targetDataFilter = _this$state4$targetDa === void 0 ? [] : _this$state4$targetDa,
          _this$state4$sourceDa = _this$state4.sourceDataFilter,
          sourceDataFilter = _this$state4$sourceDa === void 0 ? [] : _this$state4$sourceDa,
          _this$state4$targetDa2 = _this$state4.targetData,
          targetData = _this$state4$targetDa2 === void 0 ? [] : _this$state4$targetDa2,
          _this$state4$sourceDa2 = _this$state4.sourceData,
          sourceData = _this$state4$sourceDa2 === void 0 ? [] : _this$state4$sourceDa2,
          _this$state4$sourceSe = _this$state4.sourceSearchValue,
          sourceSearchValue = _this$state4$sourceSe === void 0 ? "" : _this$state4$sourceSe;
      var delPermission = _this.props.delPermission; // 判断是否有删除已选中的数据的权限

      if (delPermission && typeof delPermission === "function") {
        delPermission([].concat(targetDataFilter).map(function (item) {
          return item.value;
        }), function (isCan) {
          if (isCan) {
            var targetArr = targetData.filter(function (item) {
              return !targetDataFilter.some(function (subItem) {
                return "" + subItem.value === "" + item.value;
              });
            }); // 清空当前显示在页面的数据，过滤的原始数据清空掉被过滤掉的部分

            targetDataFilter.map(function (item) {
              sourceData.push(_objectSpread({}, item));

              if (item.label.indexOf(sourceSearchValue) > -1) {
                sourceDataFilter.push(_objectSpread({}, item));
              }

              return false;
            });

            _this.setState({
              sourceData: sourceData,
              sourceDataFilter: sourceDataFilter,
              targetData: targetArr,
              targetDataFilter: []
            }, function () {
              _this.dataChange();

              _this.flag = true;
            });
          }
        });
      } else {
        var targetArr = targetData.filter(function (item) {
          return !targetDataFilter.some(function (subItem) {
            return "" + subItem.value === "" + item.value;
          });
        }); // 清空当前显示在页面的数据，过滤的原始数据清空掉被过滤掉的部分

        targetDataFilter.map(function (item) {
          sourceData.push(_objectSpread({}, item));

          if (item.label.indexOf(sourceSearchValue) > -1) {
            sourceDataFilter.push(_objectSpread({}, item));
          }

          return false;
        });

        _this.setState({
          sourceData: sourceData,
          sourceDataFilter: sourceDataFilter,
          targetData: targetArr,
          targetDataFilter: []
        }, function () {
          _this.dataChange();

          _this.flag = true;
        });
      }
    };

    _this.checkAllSourceData = function () {
      var _this$state5 = _this.state,
          _this$state5$targetDa = _this$state5.targetDataFilter,
          targetDataFilter = _this$state5$targetDa === void 0 ? [] : _this$state5$targetDa,
          _this$state5$sourceDa = _this$state5.sourceDataFilter,
          sourceDataFilter = _this$state5$sourceDa === void 0 ? [] : _this$state5$sourceDa,
          _this$state5$targetDa2 = _this$state5.targetData,
          targetData = _this$state5$targetDa2 === void 0 ? [] : _this$state5$targetDa2,
          _this$state5$sourceDa2 = _this$state5.sourceData,
          sourceData = _this$state5$sourceDa2 === void 0 ? [] : _this$state5$sourceDa2,
          _this$state5$targetSe = _this$state5.targetSearchValue,
          targetSearchValue = _this$state5$targetSe === void 0 ? "" : _this$state5$targetSe;
      var sourceArr = sourceData.filter(function (item) {
        return !sourceDataFilter.some(function (subItem) {
          return "" + subItem.value === "" + item.value;
        });
      }); // 清空当前显示在页面的数据，过滤的原始数据清空掉被过滤掉的部分

      sourceDataFilter.map(function (item) {
        targetData.push(_objectSpread({}, item));

        if (item.label.indexOf(targetSearchValue) > -1) {
          targetDataFilter.push(_objectSpread({}, item));
        }

        return false;
      });

      _this.setState({
        sourceData: sourceArr,
        sourceDataFilter: [],
        targetData: targetData,
        targetDataFilter: targetDataFilter
      }, function () {
        _this.dataChange();

        _this.flag = true;
      });
    };

    _this.dataChange = function () {
      var _this$state6 = _this.state,
          _this$state6$targetDa = _this$state6.targetData,
          targetData = _this$state6$targetDa === void 0 ? [] : _this$state6$targetDa,
          _this$state6$targetDa2 = _this$state6.targetDataFilter,
          targetDataFilter = _this$state6$targetDa2 === void 0 ? [] : _this$state6$targetDa2,
          _this$state6$sourceDa = _this$state6.sourceData,
          sourceData = _this$state6$sourceDa === void 0 ? [] : _this$state6$sourceDa,
          _this$state6$sourceDa2 = _this$state6.sourceDataFilter,
          sourceDataFilter = _this$state6$sourceDa2 === void 0 ? [] : _this$state6$sourceDa2;

      if (_this.props.onChange) {
        _this.props.onChange(targetData, sourceData, targetDataFilter, sourceDataFilter);
      }
    };

    _this.state = {
      targetData: [].concat(_this.props.value) || [],
      // 目标 过滤之前的数据
      sourceData: [].concat(_this.props.sourceData) || [],
      // 源 过滤之前的数据
      targetDataFilter: [].concat(_this.props.value) || [],
      // 目标 过滤之后的数据
      sourceDataFilter: [].concat(_this.props.sourceData) || [],
      // 源 过滤之后的数据
      targetSearchValue: "",
      sourceSearchValue: ""
    };
    _this.flag = false;
    return _this;
  }

  var _proto = TransferTag.prototype;

  _proto.componentDidMount = function componentDidMount() {} // this.dataChange(this.props.targetData);

  /* 校验两个数组的值是否相等 */
  ;

  _proto.componentDidUpdate = function componentDidUpdate() {} // this.dataChange();

  /* 从未选中到选中 */
  ;

  _proto.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        _this$props$targetTit = _this$props.targetTitle,
        targetTitle = _this$props$targetTit === void 0 ? "已选中" : _this$props$targetTit,
        _this$props$sourceTit = _this$props.sourceTitle,
        sourceTitle = _this$props$sourceTit === void 0 ? "未选中" : _this$props$sourceTit,
        _this$props$targetFil = _this$props.targetFilter,
        targetFilter = _this$props$targetFil === void 0 ? true : _this$props$targetFil,
        _this$props$sourceFil = _this$props.sourceFilter,
        sourceFilter = _this$props$sourceFil === void 0 ? true : _this$props$sourceFil,
        _this$props$style = _this$props.style,
        style = _this$props$style === void 0 ? {} : _this$props$style,
        _this$props$className = _this$props.className,
        className = _this$props$className === void 0 ? "" : _this$props$className;
    var _this$state7 = this.state,
        _this$state7$targetSe = _this$state7.targetSearchValue,
        targetSearchValue = _this$state7$targetSe === void 0 ? "" : _this$state7$targetSe,
        _this$state7$sourceSe = _this$state7.sourceSearchValue,
        sourceSearchValue = _this$state7$sourceSe === void 0 ? "" : _this$state7$sourceSe;
    var _this$state8 = this.state,
        _this$state8$targetDa = _this$state8.targetDataFilter,
        targetDataFilter = _this$state8$targetDa === void 0 ? [] : _this$state8$targetDa,
        _this$state8$sourceDa = _this$state8.sourceDataFilter,
        sourceDataFilter = _this$state8$sourceDa === void 0 ? [] : _this$state8$sourceDa;
    targetDataFilter = targetDataFilter.sort(function (a, b) {
      return a.value - b.value;
    }); // 排序

    sourceDataFilter = sourceDataFilter.sort(function (a, b) {
      return a.value - b.value;
    }); // 排序

    return _react["default"].createElement("div", {
      className: "transfer-box " + className,
      style: _objectSpread({}, style)
    }, _react["default"].createElement("div", {
      className: "transfer-target-box"
    }, _react["default"].createElement("p", {
      className: "transfer-box-title"
    }, _react["default"].createElement("span", null, targetTitle), _react["default"].createElement("span", {
      className: "transfer-box-title-btn",
      onClick: function onClick() {
        _this2.clearTarget();
      },
      onKeyPress: function onKeyPress() {}
    }, "\u6E05\u7A7A")), targetFilter && _react["default"].createElement(Search, {
      allowClear: true,
      onChange: function onChange(e) {
        return _this2.setState({
          targetSearchValue: e.target.value
        });
      },
      onPressEnter: function onPressEnter(e) {
        e.stopPropagation();
        e.preventDefault();

        _this2.targetSearch(e.target.value);
      },
      onSearch: function onSearch(value) {
        _this2.targetSearch(value);
      },
      placeholder: "\u641C\u7D22",
      value: targetSearchValue
    }), _react["default"].createElement("div", {
      className: "transfer-content",
      style: {
        borderTop: targetFilter ? "none" : "1px solid #dcdcdc"
      }
    }, targetDataFilter.map(function (item) {
      return _react["default"].createElement(_antd.Tooltip, {
        title: item.label
      }, _react["default"].createElement("div", {
        key: item.value,
        className: "transfer-content-target-tag"
      }, item.label, " ", _react["default"].createElement(_antd.Icon, {
        onClick: function onClick() {
          _this2.targetToSource(item);
        },
        type: "close"
      })));
    }))), _react["default"].createElement("div", {
      className: "transfer-source-box"
    }, _react["default"].createElement("p", {
      className: "transfer-box-title"
    }, _react["default"].createElement("span", null, sourceTitle), _react["default"].createElement("span", {
      className: "transfer-box-title-btn primary",
      onClick: function onClick() {
        _this2.checkAllSourceData();
      },
      onKeyPress: function onKeyPress() {}
    }, "\u5168\u9009")), sourceFilter && _react["default"].createElement(Search, {
      allowClear: true,
      onChange: function onChange(e) {
        return _this2.setState({
          sourceSearchValue: e.target.value
        });
      },
      onPressEnter: function onPressEnter(e) {
        e.stopPropagation();
        e.preventDefault();

        _this2.sourceSearch(e.target.value);
      },
      onSearch: function onSearch(value) {
        _this2.sourceSearch(value);
      },
      placeholder: "\u641C\u7D22",
      value: sourceSearchValue
    }), _react["default"].createElement("div", {
      className: "transfer-content",
      style: {
        borderTop: sourceFilter ? "none" : "1px solid #dcdcdc"
      }
    }, sourceDataFilter.map(function (item) {
      return _react["default"].createElement(_antd.Tooltip, {
        title: item.label
      }, _react["default"].createElement("div", {
        key: item.value,
        className: "transfer-content-source-tag",
        onClick: function onClick() {
          _this2.sourceToTag(item);
        },
        onKeyPress: function onKeyPress() {}
      }, item.label));
    }))));
  };

  return TransferTag;
}(_react["default"].Component);

exports["default"] = TransferTag;
TransferTag.defaultProps = {
  targetTitle: "已选中",
  sourceTitle: "未选中",
  sourceData: [],
  onChange: function onChange() {},
  targetFilter: true,
  sourceFilter: true,
  style: {},
  className: "",
  value: [],
  delPermission: undefined
};
TransferTag.propTypes = process.env.NODE_ENV !== "production" ? {
  targetTitle: _propTypes["default"].oneOfType([_propTypes["default"].element, _propTypes["default"].string]),
  sourceTitle: _propTypes["default"].oneOfType([_propTypes["default"].element, _propTypes["default"].string]),
  sourceData: _propTypes["default"].array,
  onChange: _propTypes["default"].func,
  targetFilter: _propTypes["default"].bool,
  sourceFilter: _propTypes["default"].bool,
  style: _propTypes["default"].object,
  className: _propTypes["default"].string,
  value: _propTypes["default"].array,
  delPermission: _propTypes["default"].func
} : {};