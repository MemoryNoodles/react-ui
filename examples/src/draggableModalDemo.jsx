import React, { Component } from "react";
import { Button, Form, InputNumber } from "antd";
import { DraggableFormModal, CheckTagGroup, WangEditor } from "cake/src"; // eslint-disable-line
// 自定义表单组件
const FormItem = Form.Item;

export default class DraggableModalDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible:false
        };
    }
   
    initData(){
        return {
            title: "标题",
            itemList: [
                {
                    name: "文本框",
                    keyName: "text",
                    type: "text",
                    rules: [
                        {required: true, message: "请填写", whitespace: true},
                        {
                            validator: (rule, value, callback, form) => {
                                console.log(form);
                                if (value && value !== form.getFieldValue("newPwd")) {
                                    callback("两次密码不一致！");
                                } else {
                                    callback();
                                }
                            }
                        }
                    ],
                    placeholder: "请输入",
                    onChange: (e, form) => {
                        console.log(e.target, e.target.value, form)
                    }
                },
                {
                    name: "数字框",
                    keyName: "number",
                    type: "number",
                    rules: [
                        {required: true, message: "请填写"}
                    ],
                    placeholder: "请输入",
                },
                {
                    name: "密码框",
                    keyName: "password",
                    type: "password",
                    rules: [
                        {required: true, message: "请填写", whitespace: true}
                    ],
                    placeholder: "请输入",
                    onChange: (e, form) => {
                        console.log(e.target, e.target.value, form)
                    }
                },
                {
                    name: "验证码",
                    keyName: "verify",
                    type: "verify",
                    rules: [
                        {required: true, message: "请填写", whitespace: true}
                    ],
                    placeholder: "请输入",
                    onSearch: (e,form,callBack) => {
                        console.log(e);
                        callBack();
                    }
                },
                {
                    name: "文本域",
                    keyName: "textarea",
                    type: "textarea",
                    rules: [
                        {required: true, message: "请填写", whitespace: true}
                    ],
                    placeholder: "请输入",
                    onChange: (e, form) => {
                        console.log(e.target, e.target.value, form)
                    }
                },
                {
                    name: "上传文件",
                    keyName: "file",
                    type: "file",
                    rules: [
                        {required: true, message: "请上传"}
                    ],
                    placeholder: "请上传",
                    onChange: (e, form) => {
                        console.log(e.target, e.target.value, form)
                    }
                },
                {
                    name: "单选框",
                    keyName: "radio",
                    type: "radio",
                    options: [
                        {value: "1", label: "先测试"},
                        {value: "1", label: "先测试"},
                        {value: "1", label: "先测试"},
                        {value: "1", label: "先测试"},
                        {value: "1", label: "先测试"},
                        {value: "1", label: "先测试"},
                        {value: "1", label: "先测试"},
                        {value: "1", label: "先测试"},
                        {value: "1", label: "先测试"},
                        {value: "1", label: "先测试"},
                        {value: "1", label: "先测试"},
                    ],
                    rules: [
                        {required: true, message: "请选择"}
                    ],
                    placeholder: "请选择",
                },
                {
                    name: "复选框",
                    keyName: "checkbox",
                    type: "checkbox",
                    options: [
                        {value: "1", label: "先测试"},
                        {value: "2", label: "先测试"}
                    ],
                    rules: [
                        {required: true, message: "请选择"}
                    ],

                    placeholder: "请选择",
                },
                {
                    name: "下拉框",
                    keyName: "select",
                    type: "select",
                    options: [{
                        value: "1", label: "先测试",
                    },{
                        value: "2", label: "先测试",
                    }],
                    rules: [
                        {required: true, message: "请选择"}
                    ],
                    placeholder: "请选择",
                    onChange:(value)=>{
                        this.setState({
                            visible:value==="1"
                        })
                    },
                },
                {
                    name: "日期",
                    keyName: "date",
                    type: "date",
                    options: [{
                        value: "1", label: "先测试"
                    }],
                    rules: [
                        {required: true, message: "请选择"}
                    ],
                    placeholder: "请选择",
                    visible:this.state.visible
                },
                {
                    name: "周",
                    keyName: "week",
                    type: "week",
                    options: [{
                        value: "1", label: "先测试"
                    }],
                    rules: [
                        {required: true, message: "请选择"}
                    ],
                    placeholder: "请选择",

                },
                {
                    name: "月",
                    keyName: "month",
                    type: "month",
                    options: [{
                        value: "1", label: "先测试"
                    }],
                    rules: [
                        {required: true, message: "请选择"}
                    ],
                    placeholder: "请选择",
                },
                {
                    name: "时间",
                    keyName: "datetime",
                    type: "datetime",
                    options: [{
                        value: "1", label: "先测试"
                    }],
                    rules: [
                        {required: true, message: "请选择"}
                    ],
                    placeholder: "请选择",
                },
                {
                    name: "自定义编辑器",
                    keyName: "editor",
                    type: "custom",
                    rules: [
                        {required: true, message: "请填写"}
                    ],
                    render: () => <WangEditor serverUrl="http://192.1687.64:16089" />,
                },
                {
                    name: "自定义组合",
                    type: "multiCustom",
                    keyName: "message",
                    itemStyle: {marginBottom: 0},
                    render: (form) => {
                        const {getFieldDecorator} = form
                        return (
                            <div style={{display: "flex", flexWrap: "nowrap", alignItems: "center"}}>
                                <FormItem style={{marginRight: 16}}>
                                    {getFieldDecorator('messageType', {
                                        rules: [{required: true, message: "请选择"}],
                                        initialValue: "",
                                    })(
                                        <CheckTagGroup
                                            tags={[
                                                {value: "0", label: ">"},
                                                {value: "1", label: "<"},
                                                {value: "2", label: "="}
                                            ]}
                                            tagStyle={{
                                                width: 45,
                                                height: 28,
                                                lineHeight: "28px",
                                                textAlign: "center",
                                                border: "1px solid #ddd"
                                            }}
                                            type="radioWithCancel"
                                        />
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('messageNum', {
                                        rules: [{required: true, message: "请输入"}],
                                        initialValue: "",
                                    })(
                                        <InputNumber min={0} placeholder="请输入" />
                                    )}
                                </FormItem>
                            </div>
                        )
                    }
                },
            ],
            onCancel: () => {
                this.setState({modalVisible: false})
            },
            onOk: (values) => {
                console.log(values, "123")
            },
           // modalWidth: 800
        }
    }

    render() {
        return (
            <div>
                <h2>以下是 DraggableModal/DraggableFormModal 示例：</h2>
                <Button type="primary" onClick={()=>{this.setState({modalVisible:true})}}>点击</Button>
                <DraggableFormModal
                    ref={(ins)=>{this.modalInstance=ins}}
                    centered
                    initData={this.initData()}
                    // closable={false}
                    destroyOnClose
                    // footer={null}
                    maskClosable={false}
                    title="拖拽弹框示例"
                    modalVisible={this.state.modalVisible}// 关闭时销毁 Modal 里的子元素
                    width={850}
                    drag={true}
                >
                </DraggableFormModal>
            </div>
        )
    }
}

