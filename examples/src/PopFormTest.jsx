import React, {Component} from "react";
import {Button, Form, InputNumber,message,Input,Cascader,Icon} from "antd";
import {PopForm, CheckTagGroup,WangEditor} from "cake/src"; // eslint-disable-line
// 自定义表单组件
const FormItem = Form.Item;
/**
 * Created with react_project.
 * User: 王洪瑞/3153981409@qq.com
 * Date: 2019/2/18
 * Time: 16:12
 *
 */
export default class PopFormTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            visible:false,
            moduleList:[
                {
                    id: 9,
                    name: "产品模块",
                    parentId: 0,
                    children: [
                        {
                            id: 109,
                            name: "产品描述",
                            parentId: 9,
                            children:[
                                {
                                    id: 1009,
                                    name: "图文描述",
                                    parentId: 109,
                                }
                            ]
                        },
                        {
                            id: 109,
                            name: "产品资源",
                            parentId: 9,
                            children:[]
                        }
                    ],
                },
                {
                    id: 10,
                    name: "项目模块",
                    parentId: 0,
                    children: [],
                },
                {
                    id: 11,
                    name: "任务模块",
                    parentId: 0,
                    children: [],
                }
            ]
        };
    }
    // 新增修改 (带联动)
    addOrUpdateInterviewQuestion(update = "", item = {}) {
        // 配置新增、修改弹出框数据
        this.addModalInitData = {
            title: "修改面谈问题",
            modalWidth: 700,
            formItemLayout: {labelCol: {span: 5}, wrapperCol: {span: 18}},
            itemList: [
                {
                    name: "ID",
                    type: "text",
                    keyName: "id",
                    defaultValue: item.id ? item.id : "",
                    visible: false
                },
                {
                    name: "配置类型",
                    type: "radio",
                    keyName: "configType",
                    placeholder: "请选择配置类型",
                    defaultValue: item.configType ? `${item.configType}` : "1",
                    options:[
                        {value:"1",label:"部门"},
                        {value:"2",label:"人事"},
                    ],
                    onChange:(e,option,form)=>{  // 联动
                        let value=e.target.value
                        form&&form.setFieldsValue({"questionType":"1"})
                        let options=[]
                        if(value==="1"){
                            options=[
                                {value:"1",label:"面谈内容"},
                            ]
                        }else{
                            options=[
                                {value:"1",label:"个人情况"},
                                {value:"2",label:"工作情况"},
                            ]
                        }
                        this.addModalInitData.itemList[2].options=options
                    },
                    rules: [
                        { required: true, message: "请选择配置类型" }
                    ]
                },
                {
                    name: "问题类型",
                    type: "radio",
                    keyName: "questionType",
                    placeholder: "请选择问题类型",
                    defaultValue: item.questionType ? `${item.questionType}` : "1",
                    options:`${item.configType}`==="2"?[
                        {value:"1",label:"个人情况"},
                        {value:"2",label:"工作情况"},
                    ]:[
                        {value:"1",label:"面谈内容"},
                    ],
                    rules: [
                        { required: true, message: "请选择问题类型" }
                    ]
                },
            ],
            onOk: json => {
            },
            onCancel: () => {
            }
        };
    }


    render() {

        return (
            <div>
                <h2>以下是 PopForm 示例：</h2>
                <Button
                    onClick={() => {
                        this.setState({modalVisible: true})
                    }}
                    type="primary"
                >点击
                </Button>
                <PopForm
                    formLayout="horizontal" // horizontal、vertical、inline、double
                    initData={{
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
                                btnText:"请上传图片",
                                rules: [
                                    {required: true, message: "请上传"}
                                ],
                                placeholder: "请上传",
                                onChange: (info,form) => {
                                    console.log(info,form)
                                }
                            },
                            {
                                name: "下载路径",
                                keyName: "url",
                                type: "file",
                                rules: [
                                    {required: true, message: "请上传安装包"}
                                ],
                                placeholder: "请上传",
                                showUploadList:true,
                                btnText:"请上传安装包",
                                // 上传文件之前的钩子,返回 false 后变为手动上传文件(不会出现进度条)
                                beforeUpload:(file,fileList,form) => {
                                    const arr=file.name.split(".")
                                    // 获取表单中选择的type: 1：Android，2：IOS
                                    const type=form.getFieldValue('type')
                                    let passFlag=true
                                    // 验证文件类型
                                    if(type===1){
                                        if(arr[arr.length-1]==="apk"){
                                            passFlag=true
                                        }else{
                                            passFlag=false
                                            message.error("请上传.apk文件！");
                                        }
                                    }else{
                                        if(arr[arr.length-1]==="ipa"){
                                            passFlag=true
                                        }else{
                                            passFlag=false
                                            message.error("请上传.ipa文件！");
                                        }
                                    }

                                    if(passFlag){
                                        // 上传安装包
                                        message.success('上传成功')
                                        form.setFieldsValue({'url': window.location.protocol+"//"+window.location.host+"/app/xx.apk"}) ;
                                    }

                                    // 手动上传文件
                                    return false
                                },
                                onRemove:(info,form)=>{// return false不移除
                                    form.setFieldsValue({
                                        'url':{
                                            value:"",
                                            error:new Error('请上传安装包')
                                        }
                                    }) ;
                                },
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
                                rules: [{required: true, message: "请选择"}],
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
                                name: "所属模块",
                                keyName: "moduleId",
                                type: "custom",
                                defaultValue:"",
                                rules: [
                                    {required: true, message: "请选择所属模块"}
                                ],
                                render:()=><Cascader suffixIcon={<Icon type="caret-down" />}
                                                     disabled={type==='addNext'}
                                                     options={this.state.moduleList||[]}
                                                     fieldNames={{ label: 'name', value: 'id', children: 'children' }}
                                                     onChange={(value,option)=>{console.log(value,option,"value,option")}}
                                                     placeholder="请选择模块" />,
                            },
                            {
                                name: "自定义编辑器",
                                keyName: "editor",
                                type: "custom",
                                rules: [
                                    {required: true, message: "请填写"}
                                ],
                                render: () => <WangEditor serverUrl="http://192.168.7.64:8089" />,
                            },
                            {
                                name: "自定义时间输入框",
                                keyName: "estimatedTime",
                                type: "custom",
                                rules: [
                                    {required: true, message: "请填写预计时间", whitespace: true},
                                    {
                                        validator: (rule, value, callback) => {
                                            if (value && value.length<6) {
                                                callback("请填写两位小数以内的时间！");
                                            } else {
                                                callback();
                                            }
                                        }
                                    }
                                ],
                                render: (form) => {
                                    return <Input addonAfter={"小时"} />
                                }
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
                                                        wrapClassName="tagWrapStyle"
                                                        tagClassName="tagStyle"
                                                        type="checkbox"
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
                        modalWidth: 800
                    }}
                    modalVisible={this.state.modalVisible}
                >
                    <span >完善信息后可用新验证登录</span>
                </PopForm>
            </div>
        )
    }
}

