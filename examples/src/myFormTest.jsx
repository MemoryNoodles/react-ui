import React, {Component} from "react";
import {Button, Form, InputNumber} from "antd";
import {MyForm,CheckTagGroup,TransferTag,WangEditor} from "cake/src";
// 自定义表单组件
const FormItem = Form.Item;
/**
 * Created with react_project.
 * User: 王洪瑞/3153981409@qq.com
 * Date: 2019/2/18
 * Time: 16:12
 *
 */
export default class MyFormTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            targetList:[{value:"3",label:"23"}]
        };
    }

    render() {
        const itemList=[
            {
                name: "文本框",
                keyName: "text",
                type: "text",
                rules: [
                    {required: true, message: "请填写", whitespace: true},
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
                    {required: false, message: "请上传"}
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
                    {value: "2", label: "先测试"},
                    {value: "3", label: "先测试"},
                    {value: "4", label: "先测试"},
                    {value: "5", label: "先测试"},
                    {value: "6", label: "先测试"},
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
                    value: "1", label: "先测试"
                }],
                rules: [
                    {required: true, message: "请选择"}
                ],
                placeholder: "请选择",
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
                render: () => <WangEditor />,
            },
            {
                name: "自定义穿梭过滤组件",
                keyName: "filter",
                type: "custom",
                validateStatus:"success",
                defaultValue:[...this.state.targetList],
                rules: [
                    {required: true, message: "请填写"}
                ],
                render: () => <TransferTag sourceData={[{value:"1",label:"李四"}]} />,
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
                                    rules: [{required: false, message: "请选择"}],
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
        ]

        return (
            <div>
                <h2>以下是 MyForm 示例：</h2>
                <div style={{width:800,display:"inline-block"}}>
                    <MyForm
                        // formItemLayout={{labelCol: { span: 4},wrapperCol: { span: 17 }}}
                        formLayout="vertical"
                        itemList={itemList}
                        okText="提交"
                        onCancel={()=>{}}
                        onOk={(json)=>{console.log("onOk:",json)}}
                        wrappedComponentRef={(form) => this.myform = form}
                    >
                        <Button onClick={()=>{}} style={{marginRight:10}}>取消</Button>
                    </MyForm>
                </div>
            </div>
        )
    }
}

