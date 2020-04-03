function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

import React from "react";
import { Table } from "antd";
import PropTypes from "prop-types"; // 分页条数

var PAGE_SIZE_OPTIONS = ["10", "20", "30"]; // Table滚动高度(10条数据高度)

var TABLE_SCROLL_Y = 616;
/*
 * Table 组件
 * author：王洪瑞
 * date：2019.01.31
 * */

var TableData =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(TableData, _React$Component);

  function TableData(_props) {
    var _this;

    _this = _React$Component.call(this, _props) || this;

    _this.resetData = function (props) {
      var _props$dataSource = props.dataSource,
          dataSource = _props$dataSource === void 0 ? {} : _props$dataSource;

      if (dataSource.page) {
        // 传回来的数据有分页功能
        var _dataSource$page = dataSource.page,
            pageNo = _dataSource$page.pageNo,
            totalCount = _dataSource$page.totalCount,
            pageSize = _dataSource$page.pageSize,
            _dataSource$page$enti = _dataSource$page.entities,
            entities = _dataSource$page$enti === void 0 ? [] : _dataSource$page$enti;

        if (totalCount !== 0 && pageNo && pageNo !== 1 && entities && entities.length === 0 && _this.flag) {
          // 如果当前页不属于第一页并且此页没数据，就自动跳转到前一页，正常情况下只会跳转一次
          _this.props.queryData({
            pageNo: pageNo - 1,
            pageSize: pageSize
          });

          _this.flag = false; // 避免死循环
        } else {
          _this.setState({
            dataList: entities,
            hasPage: true
          });

          _this.resetPage({
            pageNo: pageNo,
            totalCount: totalCount,
            pageSize: pageSize
          });
        }
      } else if (dataSource.data) {
        /* 传回来的数据没有分页++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
        _this.setState({
          dataList: dataSource.data,
          hasPage: false
        });
      } else {
        _this.setState({
          dataList: [],
          hasPage: false
        });
      }
    };

    _this.returnPage = function () {
      return {
        pageNo: _this.state.pageInfo.current,
        pageSize: _this.state.pageInfo.pageSize
      };
    };

    _this.resetPage = function (obj) {
      var _obj$pageNo = obj.pageNo,
          pageNo = _obj$pageNo === void 0 ? _this.state.pageInfo.current : _obj$pageNo,
          _obj$totalCount = obj.totalCount,
          totalCount = _obj$totalCount === void 0 ? _this.state.pageInfo.total : _obj$totalCount,
          _obj$pageSize = obj.pageSize,
          pageSize = _obj$pageSize === void 0 ? _this.state.pageInfo.pageSize : _obj$pageSize;
      var pageInfo = _this.state.pageInfo;
      pageInfo.current = pageNo;
      pageInfo.total = totalCount;
      pageInfo.pageSize = pageSize;

      _this.setState({
        pageInfo: pageInfo,
        loading: false
      });
    };

    _this.changePage = function (pageNo) {
      _this.setState({
        loading: _this.state.hasLoading
      });

      var pageInfo = _this.state.pageInfo;

      _this.props.queryData({
        pageNo: pageNo,
        pageSize: pageInfo.pageSize
      });
    };

    _this.toSelectChange = function (page, size) {
      _this.setState({
        loading: _this.state.hasLoading
      });

      if (_this.props.queryData) {
        _this.props.queryData({
          pageNo: 1,
          pageSize: size
        });
      }
    };

    _this.state = {
      loading: true,
      pageInfo: {
        current: 1,
        pageSize: _this.props.pageSizeOptions && _this.props.pageSizeOptions[0] ? _this.props.pageSizeOptions[0] : 10,
        total: 0,
        pageSizeOptions: PAGE_SIZE_OPTIONS,
        showQuickJumper: false,
        showSizeChanger: true
      },
      dataList: [],
      hasPage: false,
      hasLoading: _this.props.loading
    };
    _this.flag = true;
    return _this;
  }

  var _proto = TableData.prototype;

  _proto.componentWillMount = function componentWillMount() {
    this.setState({
      loading: this.state.hasLoading
    });
    this.resetData(this.props);
  };

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    this.resetData(_objectSpread({}, nextProps));
  }
  /* 刷新table数据 */
  ;

  _proto.render = function render() {
    var _this$props = this.props,
        _this$props$bordered = _this$props.bordered,
        bordered = _this$props$bordered === void 0 ? false : _this$props$bordered,
        _this$props$columns = _this$props.columns,
        columns = _this$props$columns === void 0 ? [] : _this$props$columns,
        _this$props$rowSelect = _this$props.rowSelection,
        rowSelection = _this$props$rowSelect === void 0 ? null : _this$props$rowSelect,
        _this$props$size = _this$props.size,
        size = _this$props$size === void 0 ? "default" : _this$props$size,
        _this$props$pagingSiz = _this$props.pagingSize,
        pagingSize = _this$props$pagingSiz === void 0 ? "default" : _this$props$pagingSiz,
        _this$props$title = _this$props.title,
        title = _this$props$title === void 0 ? null : _this$props$title,
        _this$props$scroll = _this$props.scroll,
        scroll = _this$props$scroll === void 0 ? false : _this$props$scroll,
        _this$props$onRow = _this$props.onRow,
        _onRow = _this$props$onRow === void 0 ? function () {} : _this$props$onRow,
        _rowClassName = _this$props.rowClassName,
        _this$props$intervalC = _this$props.intervalColor,
        intervalColor = _this$props$intervalC === void 0 ? true : _this$props$intervalC,
        _rowKey = _this$props.rowKey,
        _this$props$component = _this$props.components,
        components = _this$props$component === void 0 ? {} : _this$props$component,
        _this$props$position = _this$props.position,
        position = _this$props$position === void 0 ? "bottom" : _this$props$position,
        _this$props$pageSizeO = _this$props.pageSizeOptions,
        pageSizeOptions = _this$props$pageSizeO === void 0 ? this.state.pageInfo.pageSizeOptions : _this$props$pageSizeO;

    var _this$state = this.state,
        _this$state$loading = _this$state.loading,
        loading = _this$state$loading === void 0 ? false : _this$state$loading,
        _this$state$pageInfo = _this$state.pageInfo,
        pageInfo = _this$state$pageInfo === void 0 ? false : _this$state$pageInfo,
        _this$state$dataList = _this$state.dataList,
        dataList = _this$state$dataList === void 0 ? [] : _this$state$dataList,
        _this$state$hasPage = _this$state.hasPage,
        hasPage = _this$state$hasPage === void 0 ? false : _this$state$hasPage;
    return React.createElement("div", {
      className: "ant-table-wrap"
    }, React.createElement(Table, _extends({}, this.props, {
      key: this.state.loading,
      bordered: bordered,
      columns: columns,
      components: components,
      dataSource: dataList,
      loading: loading,
      locale: {
        emptyText: ""
      },
      onRow: function onRow(record) {
        return _onRow(record);
      },
      pagination: hasPage ? _objectSpread({}, pageInfo, {
        pageSizeOptions: pageSizeOptions,
        position: position,
        size: pagingSize,
        onChange: this.changePage,
        onShowSizeChange: this.toSelectChange,
        showTotal: function showTotal(total) {
          return "\u5171 " + total + " \u6761\u6570\u636E";
        }
      }) : false,
      rowClassName: function rowClassName(record, index) {
        var className = " ";

        if (index % 2 === 1 && intervalColor) {
          className = 'tr-row-bg ';
        } else {
          className = ' ';
        }

        if (_rowClassName && _rowClassName(record)) {
          className += _rowClassName(record);
        }

        return className;
      },
      rowKey: function rowKey(record, index) {
        if (_rowKey) {
          return _rowKey(record, index);
        }

        return index;
      },
      rowSelection: rowSelection,
      scroll: scroll ? _objectSpread({
        y: TABLE_SCROLL_Y
      }, scroll) : {
        y: TABLE_SCROLL_Y
      },
      size: size,
      title: title
    })));
  };

  return TableData;
}(React.Component);

TableData.defaultProps = {
  bordered: false,
  columns: [],
  loading: false,
  intervalColor: false,
  queryData: function queryData() {},
  rowKey: function rowKey(record) {
    return record.id;
  },
  rowSelection: null,
  size: "default",
  pagingSize: "default",
  title: null,
  scroll: false,
  onRow: function onRow() {},
  rowClassName: false,
  components: {},
  position: "bottom",
  pageSizeOptions: PAGE_SIZE_OPTIONS
};
export { TableData as default };
TableData.propTypes = process.env.NODE_ENV !== "production" ? {
  bordered: PropTypes.bool,
  columns: PropTypes.array,
  loading: PropTypes.bool,
  intervalColor: PropTypes.bool,
  queryData: PropTypes.func,
  rowKey: PropTypes.func,
  rowSelection: PropTypes.object,
  size: PropTypes.string,
  pagingSize: PropTypes.string,
  title: PropTypes.any,
  scroll: PropTypes.any,
  onRow: PropTypes.func,
  rowClassName: PropTypes.any,
  components: PropTypes.any,
  position: PropTypes.string,
  pageSizeOptions: PropTypes.array
} : {};