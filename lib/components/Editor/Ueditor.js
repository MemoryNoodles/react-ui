"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _wangEditor = _interopRequireDefault(require("./wangEditor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

// eslint-disable-line
var WangEditor =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(WangEditor, _Component);

  function WangEditor(props, context) {
    var _this;

    _this = _Component.call(this, props, context) || this;

    _this.returnHtmlContent = function () {
      if (!_this.editorContent || _this.editorContent == "<p></p>" || _this.editorContent == "<p><br></p>") {
        return "";
      }

      return _this.editorContent;
    };

    _this.state = {};
    _this.editorContent = '';
    _this.editor = {};
    _this.dataUrl = _this.props.serverUrl;
    return _this;
  }

  var _proto = WangEditor.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;

    var elem = this.refs.editorElem;
    this.editor = new _wangEditor["default"](elem); // 使用 onchange 函数监听内容的变化，并实时更新到 state 中

    this.editor.customConfig = {
      onchange: function onchange(html) {
        _this2.editorContent = html;
        console.log(html);
        var content = "";

        if (!_this2.editorContent || _this2.editorContent == "<p></p>" || _this2.editorContent == "<p><br></p>") {
          content = "";
        } else {
          content = _this2.editorContent;
        }

        if (_this2.props.onChange) {
          _this2.props.onChange(content);
        }
      },
      menus: this.props.menus || ['head', 'bold', 'fontSize', 'fontName', 'italic', 'underline', 'strikeThrough', 'foreColor', 'backColor', 'link', 'list', 'justify', 'quote', 'emoticon', 'image', 'upFile', 'undo', 'redo'],
      uploadServer: this.dataUrl
    };
    /* editor.customConfig.onchange = */

    this.editor.create();
    this.editor.txt.html(this.props.value || "");
  };

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value && nextProps.value !== this.editorContent) {
      this.editor.txt.html(nextProps.value || "");
    }
  };

  _proto.render = function render() {
    return _react["default"].createElement("div", {
      className: "App"
    }, _react["default"].createElement("div", {
      ref: "editorElem",
      style: {
        textAlign: 'left',
        width: this.props.width || "100%",
        minWidth: "620px"
      }
    }));
  };

  return WangEditor;
}(_react.Component);

var _default = WangEditor;
exports["default"] = _default;