import React from "react";
import {Form, Input, InputNumber, Select, Radio, Checkbox, DatePicker, Button, Upload,Icon} from "antd";
import MyUpload from "./upload";
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/zh-cn';
import locale from 'antd/lib/date-picker/locale/zh_CN';

moment.locale('zh-cn');
const FormItem = Form.Item;
const {Option} = Select;
const {TextArea, Search} = Input;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const {MonthPicker, WeekPicker,RangePicker} = DatePicker;

class MyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // 验证码
            seconds: 60,
            tipTxt: "点击发送"
        }
        this.formItemBox = React.createRef();
    }

    componentDidMount() {
        /* // this.resizeHeight(true);
        window.addEventListener("resize", () => {
            this.resizeHeight();
        }); */
    }
    componentDidUpdate(){
        /* this.resizeHeight(true); */
    }
    /* 设置内容高度 */
    resizeHeight = () => {
        if (this.formItemBox) {
            try{
                const formItemBox = this.formItemBox.current;
                if(!formItemBox) return;
                const documentHeight =
                    document.documentElement.clientHeight || document.body.clientHeight;
                const formItemBoxHeight = formItemBox.offsetHeight;
                const formItemBoxScrollHeight = formItemBox.scrollHeight;
                if (
                    formItemBoxHeight + 200 > documentHeight ||
                    formItemBoxScrollHeight > formItemBoxHeight
                ) {
                    formItemBox.style.maxHeight = `${document.documentElement.clientHeight - 220}px`;
                } else if (formItemBoxScrollHeight <= formItemBoxHeight) {
                    formItemBox.style.maxHeight = `${formItemBoxScrollHeight}px`;
                }
            }catch (e) {
                console.log("重置高度异常：",e)
            }
        }
    }

    handleSubmit = (e, customFun) => {
        const event = e || window.event;
        if (event) {
            event.preventDefault();
        }
        this.props.form.validateFieldsAndScroll((err, values) => {
            // 若验证通过
            if (!err) {
                // 调用父组件
                if (customFun) {
                    customFun({...values});
                } else {
                    this.props.onOk({...values});
                }
            }
        });
    }
    /* 返回对应的roles 主要返回了form表单对象，方便做联动校验 */
    returnRoles = (rules) => {
        const newRules = [];
        if (rules) {
            rules.map((item) => {
                const obj = { ...item }
                if (item.validator) {
                    obj.validator = (rule, value, callback) => item.validator(rule, value, callback, this.props.form);
                    newRules.push({...obj})
                }else{
                    newRules.push({...item});
                }
                return false
            })
        }
        return newRules
    }

    /**
     * 渲染各个子元素
     * @param item object
     * @returns {null}
     */
    getField = (item) => {
        if (item) {
            const {getFieldDecorator} = this.props.form;
            switch (item.type) {
                /* input框 */
                case "text":
                    return getFieldDecorator(item.keyName, {
                        rules: this.returnRoles(item.rules),
                        initialValue: item.defaultValue
                    })(
                        <Input
                            disabled={item.disabled}
                            onChange={e => {
                                if (item.onChange) {
                                    item.onChange(e, this.props.form);
                                }
                            }}
                            placeholder={item.placeholder}
                            style={item.itemInputStyle}
                        />
                    );
                /* 数字框 */
                case "number":
                    return getFieldDecorator(item.keyName, {
                        rules: this.returnRoles(item.rules),
                        initialValue: item.defaultValue
                    })(
                        <InputNumber
                            disabled={item.disabled}
                            max={item.max ? item.max : Infinity}
                            min={item.min ? item.min : -Infinity}
                            onChange={value => {
                                if (item.onChange) {
                                    item.onChange(value, this.props.form);
                                }
                            }}
                            placeholder={item.placeholder}
                            style={item.itemInputStyle}
                        />
                    );
                /* 密码框 */
                case "password":
                    return getFieldDecorator(item.keyName, {
                        rules: this.returnRoles(item.rules),
                        initialValue: item.defaultValue
                    })(
                        <Input
                            autoComplete="new-password"
                            disabled={item.disabled}
                            onChange={e => {
                                if (item.onChange) {
                                    item.onChange(e, this.props.form);
                                }
                            }}
                            placeholder={item.placeholder}
                            style={item.itemInputStyle}
                            type="password"

                        />
                    );
                /* 发送验证码 */
                case "verify":
                    return getFieldDecorator(item.keyName, {
                        rules: this.returnRoles(item.rules),
                        initialValue: item.defaultValue
                    })(
                        <Search
                            className="verify"
                            disabled={false}
                            enterButton={this.state.tipTxt}
                            onSearch={(value, e) => {
                                const btn = e.target;
                                if (e.target.tagName === "BUTTON") {
                                    item.onSearch(value,this.props.form, () => {
                                        // (发送验证码)请求成功回调
                                        btn.disabled = true; // 禁用按钮
                                        btn.classname = "disabled";
                                        // 显示60s倒计时
                                        this.setState({
                                            seconds: 60,
                                            tipTxt: `60s`
                                        })
                                        const timer = setInterval(() => {
                                            this.setState(
                                                preState => ({
                                                    seconds: preState.seconds - 1,
                                                    tipTxt: `${this.state.seconds - 1}s`
                                                }),
                                                () => {
                                                    if (this.state.seconds < 0) {
                                                        btn.disabled = false; // 恢复按钮
                                                        btn.classname = "";
                                                        clearInterval(timer);
                                                        this.setState({
                                                            seconds: 60,
                                                            tipTxt: "点击发送"
                                                        });
                                                    }
                                                }
                                            );
                                        }, 1000);
                                    });
                                }
                            }}
                            placeholder={item.placeholder}
                            style={item.itemInputStyle}
                        />
                    );
                /* 文本域 */
                case "textarea":
                    return getFieldDecorator(item.keyName, {
                        rules: this.returnRoles(item.rules),
                        initialValue: item.defaultValue
                    })(
                        <TextArea
                            autosize={{minRows: item.rows || 2, maxRows: 6}}
                            disabled={item.disabled}
                            onChange={e => {
                                if (item.onChange) {
                                    item.onChange(e, this.props.form);
                                }
                            }}
                            placeholder={item.placeholder}
                            rows={item.rows}
                            style={item.itemInputStyle}
                        />
                    );
                /* 单选框 */
                case "radio":
                    return getFieldDecorator(item.keyName, {
                        rules: this.returnRoles(item.rules),
                        initialValue: item.defaultValue
                    })(
                        <RadioGroup
                            buttonStyle="outline"
                            onChange={e => {
                                if (item.onChange) {
                                    item.onChange(e, this.props.form);
                                }
                            }}
                            style={item.itemInputStyle}
                        >
                            {item.options.length > 0
                                ? item.options.map(op => (
                                    <Radio
                                        key={op.value}
                                        disabled={item.disabled}
                                        value={op.value}
                                    >
                                        {op.label}
                                    </Radio>
                                ))
                                : ""}
                        </RadioGroup>
                    );
                /* 复选框 */
                case "checkbox":
                    return getFieldDecorator(item.keyName, {
                        rules: this.returnRoles(item.rules),
                        initialValue: item.defaultValue
                    })(
                        <CheckboxGroup
                            disabled={item.disabled}
                            onChange={checkedValue => {
                                if (item.onChange) {
                                    item.onChange(checkedValue, this.props.form);
                                }
                            }}
                            options={item.options}
                            style={item.itemInputStyle}
                        />
                    );
                /* 下拉框 */
                case "select":
                    return getFieldDecorator(item.keyName, {
                        rules: this.returnRoles(item.rules),
                        initialValue: item.defaultValue
                    })(
                        <Select
                            suffixIcon={<Icon type="caret-down" />}
                            disabled={item.disabled}
                            notFoundContent="无"
                            onChange={(value, option) => {
                                if (item.onChange) {
                                    item.onChange(value, option, this.props.form);
                                }
                            }}
                            placeholder={item.placeholder}
                            style={item.itemInputStyle}
                        >
                            {item.options.map(op => <Option key={op.value} value={op.value}>{op.label}</Option>)}
                        </Select>
                    );
                /* 日期 */
                case "date": // 注：提交方法传出的date值是moment格式
                    return getFieldDecorator(item.keyName, {
                        rules: this.returnRoles(item.rules),
                        initialValue: item.defaultValue
                    })(
                        <DatePicker
                            disabled={item.disabled}
                            disabledDate={item.disabledDate}
                            //禁用到 今天：(current)=>{return current && current < moment().endOf('day')}
                            //禁用到 今天的前一天：(current)=>{return current && current < moment().subtract(1, 'days')}
                            locale={locale}
                            onChange={(date, dateString) => {
                                if (item.onChange) {
                                    item.onChange(date, dateString, this.props.form);
                                }
                            }}
                            placeholder={item.placeholder}
                            style={item.itemInputStyle}
                        />
                    );
                /* 周 */
                case "week": // 注：提交方法传出的date值是moment格式
                    return getFieldDecorator(item.keyName, {
                        rules: this.returnRoles(item.rules),
                        initialValue: item.defaultValue
                    })(
                        <WeekPicker
                            disabled={item.disabled}
                            disabledDate={item.disabledDate}
                            locale={locale}
                            onChange={(date, dateString) => {
                                if (item.onChange) {
                                    item.onChange(date, dateString, this.props.form);
                                }
                            }}
                            placeholder={item.placeholder}
                            style={item.itemInputStyle}
                        />
                    );
                /* 月 */
                case "month": // 注：提交方法传出的date值是moment格式
                    return getFieldDecorator(item.keyName, {
                        rules: this.returnRoles(item.rules),
                        initialValue: item.defaultValue
                    })(
                        <MonthPicker
                            disabled={item.disabled}
                            disabledDate={item.disabledDate}
                            locale={locale}
                            onChange={(date, dateString) => {
                                if (item.onChange) {
                                    item.onChange(date, dateString, this.props.form);
                                }
                            }}
                            placeholder={item.placeholder}
                            style={item.itemInputStyle}
                        />
                    );
                /* 时间 */
                case "datetime": // 注：提交方法传出的date值是moment格式
                    return getFieldDecorator(item.keyName, {
                        rules: this.returnRoles(item.rules),
                        initialValue: item.defaultValue
                    })(
                        <DatePicker
                            disabled={item.disabled}
                            disabledDate={item.disabledDate}
                            disabledTime={item.disabledTime}
                            locale={locale}
                            onChange={(date, dateString) => {
                                // 时间发生变化的回调
                                if (item.onChange) {
                                    item.onChange(date, dateString, this.props.form);
                                }
                            }}
                            placeholder={item.placeholder}
                            format={item.format || "YYYY-MM-DD HH:mm:ss"}
                            showTime={item.showTime || {
                                // defaultValue: moment('00:00:00', 'HH:mm:ss'),
                                format: 'HH:mm:ss'
                            }} //showTime:false(不带时刻)
                            style={{width: "100%", ...item.itemInputStyle}}
                        />
                    );
                /* 时间范围 */
                case "dateRange":
                    return getFieldDecorator(item.keyName, {
                        rules: this.returnRoles(item.rules),
                        initialValue: item.defaultValue
                    })(
                        <RangePicker
                            disabledDate={item.disabledDate}
                            format={item.format || "YYYY-MM-DD HH:mm:ss"}
                            locale={locale}
                            onChange={(date, dateString) => {
                                // 时间发生变化的回调
                                if (item.onChange) {
                                    item.onChange(date, dateString, this.props.form);
                                }
                            }}
                            placeholder={item.placeholder}
                            showTime={item.showTime ? item.showTime : false}
                            // showTime={{ defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],format: 'HH:mm:ss' }}
                            style={{width: "100%", ...item.itemInputStyle}}
                        />
                    );
                /* 上传文件 */
                case "file":
                    return getFieldDecorator(item.keyName, {
                        rules: this.returnRoles(item.rules),
                        initialValue: item.defaultValue
                    })(
                        <MyUpload {...item} form={this.props.form} />
                    );
                // 单个自定义组件
                case "custom":
                    return getFieldDecorator(item.keyName, {
                        rules: this.returnRoles(item.rules),
                        initialValue: item.defaultValue
                    })(
                        item.render(this.props.form)
                    );
                case "multiCustom":// 多个自定义组件组合
                    return item.render(this.props.form) // render：(form)=>{return nodeDom} //将getFieldDecorator传递到外部
                default:
                    return null;
            }
        } else {
            return null;
        }
    }

    render() {
        let {
            formItemLayout = {
                labelCol: {span: 3}, // label 标签布局
                wrapperCol: {span: 20}
            },
            buttonItemLayout = {},
        } = this.props;
        const {
            formLayout = "horizontal", // horizontal、vertical、inline、double
            withButtonContainter=true,
            customButton,
            hideRequiredMark = false,
            itemList = [],
            itemStyle = {},
            onOk, // 提交表单执行回调(function||false)
            okText = "确定" // 提交表单按钮文本
        } = this.props;
        formItemLayout = formLayout === 'vertical'||formLayout === 'double' ? {} : formItemLayout; // 适配 formLayout = "vertical" 时为{}
        buttonItemLayout = formLayout === 'vertical'||formLayout === 'double' ? {} : buttonItemLayout; // 适配 formLayout = "vertical" 时为{}

        return (
            <Form
                hideRequiredMark={hideRequiredMark}
                layout={formLayout}
                onSubmit={e => {
                    this.handleSubmit(e);
                }}
            >
                <div ref={this.formItemBox} className={`form-item-box ${formLayout==="double"?"double-layout":""}`}>
                    {
                        itemList.map((item) => {
                            let display = "block";
                            if (item.visible === false) {
                                display = "none";
                            } else if (formLayout === "inline") {
                                display = "inline-block";
                            }else if(formLayout === "double"){
                                display = "flex";
                            }
                            return (
                                <FormItem
                                    {...formItemLayout}
                                    key={item.keyName} // label 标签的文本
                                    hasFeedback={item.hasFeedback !== false}
                                    className={item.type}
                                    label={item.name}
                                    style={{
                                        display,
                                        ...itemStyle,
                                        ...item.itemStyle
                                    }}
                                    wrapperCol={item.name?formItemLayout.wrapperCol:{span: 24}}
                                >
                                    {this.getField(item)}
                                </FormItem>
                            )
                        })
                    }
                </div>
                {
                    withButtonContainter?
                        <div
                            className="action-button-container"
                            style={{...buttonItemLayout}}
                        >
                            {this.props.children}
                            {customButton ?
                                <Button
                                    onClick={e => this.handleSubmit(e, customButton.customFun)}
                                    style={{marginRight: "7px"}}
                                    type="primary"
                                >
                                    {customButton.text}
                                </Button> : ""}
                            {onOk ? <Button htmlType="submit" type="primary">{okText}</Button> : ""}

                        </div> : null
                }
            </Form>
        )
    }
}

MyForm.defaultProps = {
    formLayout: 'horizontal',
    formItemLayout: {
        labelCol: {span: 3}, // label 标签布局
        wrapperCol: {span: 20}
    },
    withButtonContainter: true,
    buttonItemLayout: {},
    customButton: false,
    hideRequiredMark: false,
    hasFeedback: true,
    itemList: [],
    itemStyle: {},
    onOk: undefined,
    okText: "确定",
    children: null,
    form: undefined
}
MyForm.propTypes = {
    formLayout: PropTypes.string,
    formItemLayout: PropTypes.object,
    withButtonContainter: PropTypes.bool,
    buttonItemLayout: PropTypes.object,
    customButton: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ]),
    hideRequiredMark: PropTypes.bool,
    hasFeedback: PropTypes.bool,
    itemList: PropTypes.array,
    itemStyle: PropTypes.object,
    onOk: PropTypes.func,
    okText: PropTypes.string,
    children: PropTypes.any,
    form: PropTypes.any
}
const WrappedMyForm = Form.create()(MyForm);
export default WrappedMyForm;