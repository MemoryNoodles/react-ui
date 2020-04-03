import React from "react";
import { Badge,Tag } from "antd";
import PropTypes from "prop-types";

const { CheckableTag } = Tag;

class MyTag extends React.Component {
    static propTypes = {
        checked: PropTypes.bool,
        disabled: PropTypes.bool,
        tag:PropTypes.object,
        value:PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        onChange:PropTypes.func,
    };
    static defaultProps = {
        checked:false,
        disabled:false,
        tag:{},
        value:"",
        onChange:(value)=>{}
    };
    constructor(props) {
        super(props);
        this.state = {
            checked: this.props.checked
        };
    }

    componentWillReceiveProps(nextprops){
        if(this.props.checked!==nextprops.checked){
            this.setState({checked:nextprops.checked})
        }
    }

    handleChange=(checked=false)=>{
        this.setState({checked})
        // 回调：value传回父组件
        this.props.onChange(this.props.value)
    }

    render() {
        return this.props.disabled?
            <Tag {...this.props} style={{cursor:"not-allowed"}}>{this.props.tag.label}</Tag>:
            <CheckableTag
                {...this.props}
                checked={this.state.checked}
                onChange={this.handleChange}
            />
    }
}
/*
 * 带checked单选、多选功能的tags 组件
 * author：徐静
 * date：2019.02.15
 * */
export default class CheckTagGroup extends React.Component {
    static propTypes = {
        defaultCheckedList: PropTypes.array,
        onChange:PropTypes.func,
        type:PropTypes.oneOf(['radio','checkbox']),
        tags:PropTypes.array,
        wrapClassName:PropTypes.string,
        tagClassName:PropTypes.string,
    };
    static defaultProps = {
        defaultCheckedList:[],
        onChange:(checkedList,option)=>{},
        type:"checkbox",
        tags:[
            {value:1,label:"苹果",extraProps:'apple',withPoint:true},
            {value:2,label:"香蕉",extraProps:'banana'},
            {value:3,label:"橘子",extraProps:'orange'},
            {value:4,label:"柠檬",extraProps:'lemon',disabled:true},
        ],
        wrapClassName:"",
        tagClassName:"",
    };

    constructor(props) {
        super(props);
        this.state = {
            // 选中列表(外部只赋初值，该变量内部维护)
            checkedList: this.props.defaultCheckedList,
            checkedTags: []
        }
    }
    componentWillMount(){
        const {defaultCheckedList=[],tags} = this.props
        if(defaultCheckedList.length>0){
            const checkedTags = []
            defaultCheckedList.forEach(checkItem=>{
                tags.forEach(tag=>{
                    if(tag.value===checkItem){
                        checkedTags.push(tag)
                    }
                })
            })
            this.setState({checkedTags})
        }
    }

    onTagChange(value,option){
        let {checkedList=[],checkedTags=[]} = this.state
        switch (this.props.type){
            case "radio":
                if(this.state.checkedList.includes(value)){
                    checkedList=[]
                    checkedTags=[]
                }else{
                    checkedList=[value]
                    checkedTags=[option]
                }
                break;
            case "checkbox":
                if(this.state.checkedList.includes(value)){
                    checkedList=this.state.checkedList.filter(item=>(item!==value))
                    checkedTags=this.state.checkedTags.filter(tag=>(tag.value!==value))
                }else{
                    checkedList.push(value)
                    checkedTags.push(option)
                }
                break;
            default:
                break;
        }
        // 渲染页面显示
        this.setState({checkedList,checkedTags})
        // 回调：checkedList传回父组件
        this.props.onChange&&this.props.onChange(checkedList,checkedTags)
    }

    render() {

        return (
            <div className={`ant-tag-check-group ${this.props.wrapClassName}`}>
                {
                    this.props.tags.map((tag)=>(
                        tag.withPoint?
                            <Badge className="tag-check-point" dot>
                                <MyTag
                                    key={tag.value}
                                    checked={this.state.checkedList.includes(tag.value)}
                                    className={`my-checkable-tag ${this.props.tagClassName}`}
                                    disabled={tag.disabled}
                                    onChange={(value)=>{this.onTagChange(value,tag)}}
                                    tag={tag}
                                    value={tag.value}
                                >
                                    {tag.label}
                                </MyTag>
                            </Badge> :
                            <MyTag
                                key={tag.value}
                                checked={this.state.checkedList.includes(tag.value)}
                                className={`my-checkable-tag ${this.props.tagClassName}`}
                                disabled={tag.disabled}
                                onChange={(value)=>{this.onTagChange(value,tag)}}
                                tag={tag}
                                value={tag.value}
                            >
                                {tag.label}
                            </MyTag>
                    ))
                }
            </div>
        )
    }
}
