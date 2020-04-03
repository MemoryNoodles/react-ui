import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.less";
import "cake/style/component.less"; // 引入全局less
import "cake/style/component.css"; // 引入全局css
import TableDataDemo from "./tableDataDemo";
import DraggableModalDemo from "./draggableModalDemo";
import CheckTagGroupDemo from "./checkTagGroupDemo";
import SearchFormDemo from "./searchFormDemo";
import WangEditor from "./Ueditor";
import PopFormTest from "./PopFormTest";
import MyEchartsTest from "./myEchartsTest";
import MyFormTest from "./myFormTest";
import PhotoViewTest from "./PhotoViewTest";
import TransferTag from "./TransferTagTest";
import MyRechartsDemo from "./MyRechartsDemo";
import TransferSelectTag from "./TransferSelectTagDemo";

ReactDOM.render(
    <div className="component-template" id="root">
        <TableDataDemo />
        <DraggableModalDemo />
        <CheckTagGroupDemo />
        <SearchFormDemo />
        <WangEditor />
        <PopFormTest />
        <MyEchartsTest />
        <MyFormTest />
        <PhotoViewTest />
        <TransferTag />
        <MyRechartsDemo />
        <TransferSelectTag />
    </div>,
    document.getElementById("example")
);
