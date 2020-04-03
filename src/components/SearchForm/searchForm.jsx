import React from "react";
import moment from "moment";
import {
    Form,
    Row,
    Col,
    Icon,
    Input,
    InputNumber,
    Select,
    DatePicker,
    Button,
    Switch,
    Radio,
    TreeSelect,
} from "antd";
import PropTypes from "prop-types";
import CheckTagGroup from "../CheckTagGroup/checkTagGroup";

const FormItem = Form.Item;
const {Option} = Select;
const RadioGroup = Radio.Group;
const {TreeNode} = TreeSelect;
const {MonthPicker, WeekPicker, RangePicker} = DatePicker;

/*
 * SearchForm 高级搜索表单
 * author：徐静
 * date：2019.02.15
 * */
class SearchForm extends React.Component {
    static propTypes = {
        collapse: PropTypes.bool,
        collapsedShowRow: PropTypes.number,
        defaultExpand: PropTypes.bool,
        buttonsColSpan: PropTypes.number,
        form: PropTypes.object,
        config: PropTypes.array,
        justify: PropTypes.oneOf(['start', 'center', 'end']),
        wrapClassName: PropTypes.string,
        search: PropTypes.func,
        reset: PropTypes.func,
        resetType: PropTypes.number
    };
    static defaultProps = {
        collapse: false,// 是否允许折叠
        collapsedShowRow: 1,// 折叠时展示几行
        defaultExpand: true,// 初始默认折叠状态：true:展开
        buttonsColSpan: 4,
        form: {},
        config: [],
        justify: "start",// 对齐方式
        wrapClassName: "",
        search: () => {
        },
        reset: () => {
        },
        resetType:1 // 1:重置后自动查询  2：重置后不自动查询
    };

    constructor(props) {
        super(props);
        this.state = {
            expand: this.props.defaultExpand || true // 当前折叠状态
        };
        this.totalColSpan = 0;
        // 提交时获取的表单值
        this.json = {};
    }

    componentDidMount(){
        this.initJson()
    }
    /* componentDidUpdate(){
        this.initJson()
    } */

    // 初试化Json
    initJson = () =>{
        this.props.form.validateFields((err, values) => {
            this.json=values
        })
    }

    // 展开/折叠 表单
    toggle = () => {
        this.setState({expand: !this.state.expand});
    }

    // 表单搜索
    handleSearch(e) {
        const event = e || window.event;
        if (event) {
            event.preventDefault();
        }
        this.props.form.validateFields((err, values) => {
            // 若验证通过
            if (!err) {
                Object.keys(values).map(i => {
                    if (!moment.isMoment(values[i])) {
                        this.json[i] = values[i];
                    }
                    return false;
                })
                Object.keys(this.json).map(i => {
                    if (this.json[i] === undefined) {
                        this.json[i] = ""
                    }
                    return false;
                })

                // console.log(this.json, "this.json",values);

                // 调用父组件
                if (this.props.search) {
                    this.props.search({...this.json});
                }
            }
        });
    }

    // 表单重置
    handleReset() {
        this.json = {};
        this.props.form.resetFields();
        // 获取全部组件的值
        const json=this.props.form.getFieldsValue()
        if (this.props.reset) {
            this.props.reset({...json});
        }
        // resetType：1:重置后自动查询（默认）  2：重置后不自动查询
        if (this.props.resetType===1 && this.props.search) {
            // true：该查询属于重置查询
            this.props.search({...json},true);
        }
    }

    // 获取某一表单项
    getField = (item={}) => {
        const {getFieldDecorator} = this.props.form;
        // 默认折叠时仅留一行展示
        const {collapsedShowRow, buttonsColSpan} = this.props;
        // 初始化this.json
        this.json[item.keyName] = this.json[item.keyName]||item.defaultValue||"";

        switch (item.type) {
            case "text":
                return (
                    <Col
                        key={item.keyName}
                        xl={item.colSpan||4} // ≥1200px
                        lg={item.colSpan||4} // ≥992px
                        md={item.mdColSpan||6} // ≥768px
                        sm={item.smColSpan||8} // ≥576px
                        xs={item.xsColSpan||12} // <576px
                        style={{display: this.totalColSpan <= 24 * collapsedShowRow - buttonsColSpan || this.state.expand ? "block" : "none"}}
                    >
                        <div className="form-item-input-container">
                            <FormItem
                                {...item.formItemLayout}
                                label={item.name}
                                style={item.itemStyle}
                            >
                                {getFieldDecorator(item.keyName, {
                                    rules: item.rules ? item.rules : [],
                                    initialValue: item.defaultValue ? item.defaultValue : ""
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
                                )}
                            </FormItem>
                        </div>
                    </Col>
                );
            case "number":
                return (
                    <Col
                        key={item.keyName}
                        xl={item.colSpan||4} // ≥1200px
                        lg={item.colSpan||4} // ≥992px
                        md={item.mdColSpan||6} // ≥768px
                        sm={item.smColSpan||8} // ≥576px
                        xs={item.xsColSpan||12} // <576px
                        style={{display: this.totalColSpan <= 24 * collapsedShowRow - buttonsColSpan || this.state.expand ? "block" : "none"}}
                    >
                        <div className="form-item-input-container">
                            <FormItem
                                {...item.formItemLayout}
                                label={item.name}
                                style={item.itemStyle}
                            >
                                {getFieldDecorator(item.keyName, {
                                    rules: item.rules ? item.rules : [],
                                    initialValue: item.defaultValue ? item.defaultValue : "" // 默认初始值
                                })(
                                    <InputNumber
                                        disabled={item.disabled}
                                        max={item.max}
                                        min={item.min}
                                        onChange={e => {
                                            if (item.onChange) {
                                                item.onChange(e, this.props.form);
                                            }
                                        }}
                                        placeholder={item.placeholder}
                                        style={item.itemInputStyle}
                                    />
                                )}
                            </FormItem>
                        </div>
                    </Col>
                );
            case "switch":
                return (
                    <Col
                        key={item.keyName}
                        xl={item.colSpan||4} // ≥1200px
                        lg={item.colSpan||4} // ≥992px
                        md={item.mdColSpan||6} // ≥768px
                        sm={item.smColSpan||8} // ≥576px
                        xs={item.xsColSpan||12} // <576px
                        style={{display: this.totalColSpan <= 24 * collapsedShowRow - buttonsColSpan || this.state.expand ? "block" : "none"}}
                    >
                        <FormItem label={item.name} style={item.itemStyle}>
                            {getFieldDecorator(item.keyName, {
                                rules: item.rules ? item.rules : [],
                                initialValue: item.defaultValue ? item.defaultValue : ""
                            })(
                                <Switch checkedChildren="ON" unCheckedChildren="OFF" />
                            )}
                        </FormItem>
                    </Col>
                );
            case "radio":
                return (
                    <Col
                        key={item.keyName}
                        xl={item.colSpan||4} // ≥1200px
                        lg={item.colSpan||4} // ≥992px
                        md={item.mdColSpan||6} // ≥768px
                        sm={item.smColSpan||8} // ≥576px
                        xs={item.xsColSpan||12} // <576px
                        style={{display: this.totalColSpan <= 24 * collapsedShowRow - buttonsColSpan || this.state.expand ? "block" : "none"}}
                    >
                        <FormItem label={item.name} style={item.itemStyle}>
                            {getFieldDecorator(item.keyName, {
                                rules: item.rules ? item.rules : [],
                                initialValue: item.defaultValue ? item.defaultValue : "" // 默认初始值
                            })(
                                <RadioGroup
                                    buttonStyle="outline"
                                    disabled={item.disabled}
                                    onChange={e => {
                                        if (item.onChange) {
                                            item.onChange(e, this.props.form);
                                        }
                                    }}
                                    style={item.itemInputStyle}
                                >
                                    {
                                        item.options && item.options.length > 0 ?
                                            item.options.map(op => (
                                                <Radio
                                                    key={op.value}
                                                    disabled={item.disabled}
                                                    value={op.value}
                                                >{op.label}
                                                </Radio>
                                            )) : ""
                                    }
                                </RadioGroup>
                            )}
                        </FormItem>
                    </Col>
                );
            // 定制单选tag（带取消选中效果）
            case "radioTag":
                return (
                    <Col
                        key={item.keyName}
                        xl={item.colSpan||4} // ≥1200px
                        lg={item.colSpan||4} // ≥992px
                        md={item.mdColSpan||6} // ≥768px
                        sm={item.smColSpan||8} // ≥576px
                        xs={item.xsColSpan||12} // <576px
                        style={{display: this.totalColSpan <= 24 * collapsedShowRow - buttonsColSpan || this.state.expand ? "block" : "none"}}
                    >
                        <FormItem label={item.name} style={item.itemStyle}>
                            {getFieldDecorator(item.keyName, {
                                rules: item.rules ? item.rules : [],
                                initialValue: item.defaultValue ? [item.defaultValue] : [] // 默认初始值
                            })(
                                <CheckTagGroup
                                    disabled={item.disabled}
                                    onChange={checkedList => {
                                        // 选中某一个tag
                                        if (checkedList && checkedList.length > 0) {
                                            this.json[item.keyName] = checkedList[0]
                                        } else {
                                            // 取消某一个tag
                                            this.json[item.keyName] = ""
                                        }
                                        if (item.onChange) {
                                            item.onChange(checkedList);
                                        }
                                    }}
                                    style={{display: "flex", flexWrap: "nowrap", ...item.itemInputStyle}}
                                    tags={item.options}
                                    tagStyle={{
                                        width: "100%",
                                        height: 30,
                                        lineHeight: "30px",
                                        textAlign: "center",
                                        border: "1px solid #ddd",
                                    }}
                                    tagWrapStyle={{width: "30%", marginRight: "3%"}}
                                    type="radioWithCancel"
                                />
                            )}
                        </FormItem>
                    </Col>
                );
            case "select":
                return (
                    <Col
                        key={item.keyName}
                        xl={item.colSpan||4} // ≥1200px
                        lg={item.colSpan||4} // ≥992px
                        md={item.mdColSpan||6} // ≥768px
                        sm={item.smColSpan||8} // ≥576px
                        xs={item.xsColSpan||12} // <576px
                        style={{display: this.totalColSpan <= 24 * collapsedShowRow - buttonsColSpan || this.state.expand ? "block" : "none"}}
                    >
                        <div className="form-item-select-container">
                            <FormItem {...item.formItemLayout} label={item.name} style={item.itemStyle}>
                                {getFieldDecorator(item.keyName, {
                                    rules: item.rules ? item.rules : [],
                                    initialValue: item.defaultValue ? item.defaultValue : ""
                                })(
                                    <Select
                                        suffixIcon={<Icon type="caret-down" />}
                                        key={item.value}
                                        disabled={item.disabled}
                                        filterOption={(input, option) => (
                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        )}
                                        onChange={(value, option) => {
                                            if (item.onChange) {
                                                item.onChange(value, option, this.props.form);
                                            }
                                        }}
                                        placeholder={item.placeholder}
                                        showSearch={item.showSearch}
                                        style={item.itemInputStyle}
                                    >
                                        {
                                            item.options && item.options.map((op) => (
                                                <Option {...op} key={op.value} value={op.value}>{op.label}</Option>
                                            ))
                                        }
                                    </Select>
                                )}
                            </FormItem>
                        </div>
                    </Col>
                );
            case "selectTree":
                return (<Col
                    key={item.keyName}
                    xl={item.colSpan||4} // ≥1200px
                    lg={item.colSpan||4} // ≥992px
                    md={item.mdColSpan||6} // ≥768px
                    sm={item.smColSpan||8} // ≥576px
                    xs={item.xsColSpan||12} // <576px
                    style={{display: this.totalColSpan <= 24 * collapsedShowRow - buttonsColSpan || this.state.expand ? "block" : "none"}}
                >
                    <div className="form-item-input-container">
                        <FormItem
                            {...item.formItemLayout}
                            label={item.name}
                            style={item.itemStyle}
                        >
                            {getFieldDecorator(item.keyName, {
                                rules: item.rules ? item.rules : [],
                                initialValue: item.defaultValue ? item.defaultValue : "" // 默认初始值
                            })(
                                <TreeSelect
                                    allowClear
                                    dropdownStyle={{maxHeight: 300, overflow: 'auto'}}
                                    multiple
                                    placeholder="请选择坐席"
                                    showSearch
                                    treeCheckable
                                >
                                    {
                                        item.options && item.options.map((op) => (
                                            <TreeNode
                                                key={op.id + op.name}
                                                selectable={false}
                                                title={op.name}
                                                value={op.name}
                                            >
                                                {
                                                    op.member && op.member.map((subItem) => (<TreeNode
                                                        key={subItem.id}
                                                        title={subItem.name}
                                                        value={subItem.id}
                                                    />))
                                                }
                                            </TreeNode>))
                                    }
                                </TreeSelect>
                            )}
                        </FormItem>
                    </div>
                        </Col>)
            case "date":
                return (
                    <Col
                        key={item.keyName}
                        xl={item.colSpan||4} // ≥1200px
                        lg={item.colSpan||4} // ≥992px
                        md={item.mdColSpan||6} // ≥768px
                        sm={item.smColSpan||8} // ≥576px
                        xs={item.xsColSpan||12} // <576px
                        style={{display: this.totalColSpan <= 24 * collapsedShowRow - buttonsColSpan || this.state.expand ? "block" : "none"}}
                    >
                        <FormItem label={item.name} style={item.itemStyle}>
                            {getFieldDecorator(item.keyName, {
                                rules: item.rules ? item.rules : [],
                                initialValue: item.defaultValue ? item.defaultValue : ""
                            })(
                                item.dateType === "week" ? (
                                    <WeekPicker
                                        disabled={item.disabled}
                                        disabledDate={item.disabledDate}
                                        onChange={(date, dateString) => {
                                            this.json[item.keyName] = `${date.startOf("isoWeek").format("YYYY-MM-DD")}~${date.endOf("isoWeek").format("YYYY-MM-DD")}`;
                                            item.onChange && item.onChange(date, dateString, this.props.form);
                                        }}
                                        placeholder={item.placeholder}
                                        style={item.itemInputStyle}
                                    />
                                ) : item.dateType === "month" ? (
                                    <MonthPicker
                                        disabled={item.disabled}
                                        disabledDate={item.disabledDate}
                                        onChange={(date, dateString) => {
                                            this.json[item.keyName] = dateString;
                                            item.onChange && item.onChange(date, dateString, this.props.form);
                                        }}
                                        placeholder={item.placeholder}
                                        style={item.itemInputStyle}
                                    />
                                ) : (
                                    <DatePicker
                                        disabled={item.disabled}
                                        disabledDate={item.disabledDate}
                                        onChange={(date, dateString) => {
                                            this.json[item.keyName] = dateString;
                                            item.onChange && item.onChange(date, dateString, this.props.form);
                                        }}
                                        placeholder={item.placeholder}
                                        showTime={item.showTime ? item.showTime : false}
                                        // showTime={{
                                        //     defaultValue: moment('00:00:00', 'HH:mm:ss'),
                                        //     format: 'HH:mm:ss'
                                        // }}
                                        style={item.itemInputStyle}
                                    />
                                )
                            )}
                        </FormItem>
                    </Col>
                );
            case "dateRange":
                return (
                    <Col
                        key={item.keyName}
                        xl={item.colSpan||4} // ≥1200px
                        lg={item.colSpan||4} // ≥992px
                        md={item.mdColSpan||6} // ≥768px
                        sm={item.smColSpan||8} // ≥576px
                        xs={item.xsColSpan||12} // <576px
                        style={{display: this.totalColSpan <= 24 * collapsedShowRow - buttonsColSpan || this.state.expand ? "block" : "none"}}
                    >
                        <FormItem label={item.name} style={item.itemStyle}>
                            {getFieldDecorator(item.keyName, {
                                rules: item.rules ? item.rules : [],
                                initialValue: item.defaultValue ? item.defaultValue : ""
                            })(
                                <RangePicker
                                    disabled={item.disabled}
                                    disabledDate={item.disabledDate}
                                    onChange={(date, dateString) => {
                                        this.json[item.keyName] = dateString;
                                        if(item.beginKeyName){
                                            this.json[item.beginKeyName] = dateString[0]
                                        }
                                        if(item.endKeyName){
                                                this.json[item.endKeyName] = dateString[1]
                                        }
                                        item.onChange && item.onChange(date, dateString, this.props.form);
                                    }}
                                    placeholder={item.placeholder || ["开始日期", "结束日期"]}
                                    format={item.format ? item.format : "YYYY-MM-DD"}
                                    showTime={item.showTime ? item.showTime : false} // showTime={{ format: 'HH:mm:ss' }}
                                    style={item.itemInputStyle}
                                />
                            )}
                        </FormItem>
                    </Col>
                );
            case "custom":
                return (
                    <Col
                        key={item.name}
                        xl={item.colSpan||4} // ≥1200px
                        lg={item.colSpan||4} // ≥992px
                        md={item.mdColSpan||6} // ≥768px
                        sm={item.smColSpan||8} // ≥576px
                        xs={item.xsColSpan||12} // <576px
                        style={{display: this.totalColSpan <= 24 * collapsedShowRow - buttonsColSpan || this.state.expand ? "block" : "none"}}
                    >
                        <FormItem label={item.name} style={item.itemStyle}>
                            {getFieldDecorator(item.keyName, {
                                rules: item.rules ? item.rules : [],
                                initialValue: item.defaultValue ? item.defaultValue : ""
                            })(
                                item.render(this.props.form)
                            )}
                        </FormItem>
                    </Col>
                );
            default:
                return null
        }
    }

    // 获取所有表单项
    getFields() {
        const {config} = this.props;
        const children = [];
        this.totalColSpan = 0;
        // 遍历配置列表
        for (let i = 0, len = config.length; i < len; i++) {
            const item = config[i];
            // totalColSpan用于计算折叠，仅留一行展示
            this.totalColSpan += item.colSpan?item.colSpan:4;
            children.push(this.getField(item));
        }
        return children;
    }

    render() {


        return (
            <Form
                className={`ant-advanced-search-form ${this.props.wrapClassName}`}
                layout="inline"
                onSubmit={e => this.handleSearch(e)}
            >
                <Row align="top" gutter={16} justify={this.props.justify} type="flex">
                    {/* 获取表单内容 */}
                    {this.getFields()}

                    {/* 搜表表单按钮 */}
                    <Col
                        span={this.props.buttonsColSpan}
                        style={{
                            position: "relative",
                            top: 2,
                            display: "flex",
                            flexWrap: "nowrap",
                            alignItems: "center",
                            paddingBottom:10
                        }}
                    >
                        <Button htmlType="submit" type="primary">查询</Button>
                        <Button onClick={() => this.handleReset()} style={{marginLeft: 8}}>重置</Button>
                        <span style={{marginLeft: 8, fontSize: 12}}>
                            {
                                // 若允许折叠
                                this.props.collapse ?
                                    <a onClick={this.toggle} style={{whiteSpace: "nowrap"}}>
                                        {this.state.expand ? "收起" : "展开"}
                                        <Icon type={this.state.expand ? "up" : "down"} />
                                    </a> : ""
                            }
                        </span>
                    </Col>
                </Row>
            </Form>
        );
    }
}

const WrappedSearchForm = Form.create()(SearchForm);
export default WrappedSearchForm;
