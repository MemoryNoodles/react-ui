import React, { Component } from "react";
import { message, Modal } from "antd";
import { TableData } from "cake/src"; // eslint-disable-line


export default class TableDataDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messageList: {
                "pageNo": 1,
                "pageSize": 10,
                "totalCount": 17,
                "totalPage": 2,
                "entities": [{
                    "id": 3420,
                    "title": "李静新建了工单,请及时处理!",
                    "content": "李静新建了工单,请及时处理!工单编号[CP00012579]",
                    "sendTime": 1550124987910,
                    "sender": 0,
                    "type": 9,
                    "themeId": 0,
                    "workorderDataId": null,
                    "sendnum": null,
                    "readnum": null,
                    "status": 0
                }, {
                    "id": 3416,
                    "title": "杨智斌新建了工单,请及时处理!",
                    "content": "杨智斌新建了工单,请及时处理!工单编号[CP00012578]",
                    "sendTime": 1549004912959,
                    "sender": 0,
                    "type": 9,
                    "themeId": 0,
                    "workorderDataId": null,
                    "sendnum": null,
                    "readnum": null,
                    "status": 0
                }, {
                    "id": 3414,
                    "title": "sdfb",
                    "content": "http://192.168.7.64:16089/data/getData?reqCode=10004&key=BB51BA6E9DF0402583CA2637C062454D",
                    "sendTime": 1548900028062,
                    "sender": 7,
                    "type": 2,
                    "themeId": null,
                    "workorderDataId": null,
                    "sendnum": null,
                    "readnum": null,
                    "status": 0
                }, {
                    "id": 3413,
                    "title": "杨智斌新建了工单,请及时处理!",
                    "content": "杨智斌新建了工单,请及时处理!工单编号[CP00012576]",
                    "sendTime": 1548661333053,
                    "sender": 0,
                    "type": 9,
                    "themeId": 0,
                    "workorderDataId": null,
                    "sendnum": null,
                    "readnum": null,
                    "status": 0
                }]
            }
        };
    }


    // 请求消息列表
    getMyMessage=(params)=> {
        console.log(3333)
    }

    // 删除消息
    delInform(id) {
        Modal.confirm({
            title: "您确定删除该消息吗?",
            okText: "确定",
            cancelText: "取消",
            onOk:()=> {
                // 显示删除成功Alert
                message.success("删除成功");
            },
            onCancel() {}
        });
    }

    // 初始化表头数据
    getInitialTableHead() {
        // 设置table的表头标题
        this.tableColumns = [
            {
                width: "60%",
                title: "标题", // 菜单内容
                key: "title", // key
                dataIndex: "title", // key
            },
            {
                width: "20%",
                title: "接收时间",
                sorter: true,
                key: "sendTime",
                dataIndex: "sendTime",
            },
            {
                title: "操作",
                key: "operation",
                render: rowData => (
                        <span>
                            <a href="javascript:;" onClick={() => {this.delInform(rowData.id);}}>编辑</a>
                            <a href="javascript:;" onClick={() => {this.delInform(rowData.id);}}>删除</a>
                        </span>
                    )
            }
        ];
        return this.tableColumns;
    }
    handleTableChange = (pagination, filters, sorter) => {
          console.log(pagination, filters, sorter)
    };
    render() {
        return (
            <div>
                <h2>以下是 TableData 示例：</h2>
                <TableData
                    columns={this.getInitialTableHead()}
                    dataSource={{ page: this.state.messageList }}
                    intervalColor
                    serverSorter = {true}
                    onChange={this.handleTableChange}
                    scroll={{y:0}} // y轴不滚动
                    queryData={params => this.getMyMessage(params)}
                />
            </div>
        )
    }
}

