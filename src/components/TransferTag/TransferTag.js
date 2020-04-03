/**
 * Created with react_project.
 * User: 王洪瑞/3153981409@qq.com
 * Date: 2019/3/8
 * Time: 10:28
 *
 */
import React from "react";
import {Input,Icon,Tooltip} from "antd";
import PropTypes from "prop-types";

const {Search} = Input
export default class TransferTag extends React.Component{
    static propTypes = {
        targetTitle:PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.string,
        ]),
        sourceTitle:PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.string,
        ]),
        sourceData:PropTypes.array,
        onChange:PropTypes.func,
        targetFilter:PropTypes.bool,
        sourceFilter:PropTypes.bool,
        style:PropTypes.object,
        className:PropTypes.string,
        value:PropTypes.array,
        delPermission:PropTypes.func,
    };
    static defaultProps = {
        targetTitle:"已选中",
        sourceTitle:"未选中",
        sourceData:[],
        onChange:()=>{},
        targetFilter:true,
        sourceFilter:true,
        style:{},
        className:"",
        value:[],
        delPermission:undefined
    };
    constructor(props){
        super(props);
        this.state={
            targetData:[...this.props.value]||[],// 目标 过滤之前的数据
            sourceData:[...this.props.sourceData]||[],// 源 过滤之前的数据
            targetDataFilter:[...this.props.value]||[],// 目标 过滤之后的数据
            sourceDataFilter:[...this.props.sourceData]||[],// 源 过滤之后的数据
            targetSearchValue:"",
            sourceSearchValue:""
        }
        this.flag=false;
    }
    componentDidMount(){
        // this.dataChange(this.props.targetData);
    }
    /* 校验两个数组的值是否相等 */
    arrayEquals =  (aArr,bArr) => {
        if (!aArr||!bArr) {
            return false;
        }
        if (aArr.length !== bArr.length){
            return false
        }
        for (let i = 0, l = aArr.length; i < l; i++) {
            // Check if we have nested arrays
            if (aArr[i] instanceof Array && bArr[i] instanceof Array) {
                // recurse into the nested arrays
                if (!this.arrayEquals(aArr[i],bArr[i]))
                    return false;
            }
            else if(aArr[i] instanceof Object && bArr[i] instanceof Object){
                if(!this.objEquals(aArr[i],bArr[i])){
                    return false;
                }
            }
            else if (aArr[i] !== bArr[i]) {
                // Warning - two different object instances will never be equal: {x:20} != {x:20}
                return false;
            }
        }
        return true;
    }
    /* 校验数组是否相等 */
    objEquals = function(object1,object2) {
        // For the first loop, we only check for types
        for (const propName in object1) { // eslint-disable-line
            // Check for inherited methods and properties - like .equals itself
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
            // Return false if the return value is different
            if (object1.hasOwnProperty(propName) !== object2.hasOwnProperty(propName)) { // eslint-disable-line
                return false;
            }
            // Check instance type
            else if (typeof object1[propName] !== typeof object2[propName]) {
                // Different types => not equal
                return false;
            }
        }
        // Now a deeper check using other objects property names
        for(const propName in object2) { // eslint-disable-line
            // We must check instances anyway, there may be a property that only exists in object2
            // I wonder, if remembering the checked values from the first loop would be faster or not
            if (object1.hasOwnProperty(propName) !== object2.hasOwnProperty(propName)) { // eslint-disable-line
                return false;
            }
            else if (typeof object1[propName] !== typeof object2[propName]) {
                return false;
            }
            // If the property is inherited, do not check any more (it must be equa if both objects inherit it)
            if(!object1.hasOwnProperty(propName)) // eslint-disable-line
                continue ;// eslint-disable-line

            // Now the detail check and recursion

            // This returns the script back to the array comparing
            /** REQUIRES Array.equals* */
            if (object1[propName] instanceof Array && object2[propName] instanceof Array) {
                // recurse into the nested arrays
                if (!object1[propName].equals(object2[propName]))
                    return false;
            }
            else if (object1[propName] instanceof Object && object2[propName] instanceof Object) {
                // recurse into another objects
                // console.log("Recursing to compare ", this[propName],"with",object2[propName], " both named \""+propName+"\"");
                if (!object1[propName].equals(object2[propName]))
                    return false;
            }
            // Normal value comparison for strings and numbers
            else if(object1[propName] !== object2[propName]) {
                return false;
            }
        }
        return true;
    }
    componentWillReceiveProps = (nextProps) => {
        if(!this.flag&&((!this.arrayEquals(this.props.sourceData,nextProps.sourceData))||(!this.arrayEquals(this.props.value,nextProps.value)))){
            this.setState({
                targetData:[...nextProps.value]||[],
                sourceData:[...nextProps.sourceData]||[],
                targetDataFilter:nextProps.value?[...nextProps.value].filter((item)=>item.label.indexOf(this.state.targetSearchValue)>-1):[],// 目标 过滤之后的数据
                sourceDataFilter:nextProps.sourceData?[...nextProps.sourceData].filter((item)=>item.label.indexOf(this.state.sourceSearchValue)>-1):[],// 源 过滤之后的数据
            })
        }
    }
    componentDidUpdate(){
        // this.dataChange();
    }
    /* 从未选中到选中 */
    sourceToTag = (obj) => {
        const {targetDataFilter=[], sourceDataFilter=[],targetData=[],sourceData=[],targetSearchValue="" } = this.state;
        const sourceArr = sourceData.filter(item=>item.value!==obj.value);// 过滤掉源数组当前选中的项
        const sourceFilterArr = sourceDataFilter.filter(item=>`${item.value}`!==`${obj.value}`);// 过滤掉页面显示源数组当前选中的项
        const flag = targetData.some(item=>`${item.value}`===`${obj.value}`); // 判断目标数组中是否有重复的
        if(!flag){              // 判重
            targetData.push(obj);
            if(obj.label.indexOf(targetSearchValue)>-1){ // 根据过滤条件需要是否要显示在页面上
                targetDataFilter.push(obj)
            }
        }
        this.setState({
            targetData,
            sourceData:sourceArr,
            sourceDataFilter:sourceFilterArr,
            targetDataFilter
        },()=>{
            this.dataChange();
            this.flag = true; // 为了防止页面重复刷新 以致死循环
        })
    }
    /* 从选中到未选中 */  // 如果需要判断是否有权限删除已选中的
    targetToSource = (obj) => {
        const {delPermission} = this.props;
        if(delPermission&&typeof delPermission === "function"){
            delPermission([obj.value],(isCan)=>{
                if(isCan){
                    const {targetDataFilter=[], sourceDataFilter=[],targetData=[],sourceData=[],sourceSearchValue="" } = this.state;
                    const targetArr = targetData.filter(item=>item.value!==obj.value);// 去掉目标数据中未过滤数组的对象
                    const targetFilterArr = targetDataFilter.filter(item=>`${item.value}`!==`${obj.value}`);// 去掉目标数据中已过滤数组的对象
                    const flag = sourceData.some(item=>`${item.value}`===`${obj.value}`); // 判断原数据有没有相同id的数据   判重

                    if(!flag){
                        sourceData.push(obj);// 判断原数据有没有相同id的数据   判重 不重复  添加
                        if(obj.label.indexOf(sourceSearchValue)>-1){
                            sourceDataFilter.push(obj)// 判断原数据有没有相同id的数据   判重 不重复  加上过滤条件添加
                        }
                    }
                    this.setState({
                        targetData:targetArr,
                        sourceData,
                        sourceDataFilter,
                        targetDataFilter:targetFilterArr
                    },()=>{
                        this.dataChange();
                        this.flag = true;
                    })
                }
            })
        }else{
            const {targetDataFilter=[], sourceDataFilter=[],targetData=[],sourceData=[],sourceSearchValue="" } = this.state;
            const targetArr = targetData.filter(item=>item.value!==obj.value);// 去掉目标数据中未过滤数组的对象
            const targetFilterArr = targetDataFilter.filter(item=>`${item.value}`!==`${obj.value}`);// 去掉目标数据中已过滤数组的对象
            const flag = sourceData.some(item=>`${item.value}`===`${obj.value}`); // 判断原数据有没有相同id的数据   判重

            if(!flag){
                sourceData.push(obj);// 判断原数据有没有相同id的数据   判重 不重复  添加
                if(obj.label.indexOf(sourceSearchValue)>-1){
                    sourceDataFilter.push(obj)// 判断原数据有没有相同id的数据   判重 不重复  加上过滤条件添加
                }
            }
            this.setState({
                targetData:targetArr,
                sourceData,
                sourceDataFilter,
                targetDataFilter:targetFilterArr
            },()=>{
                this.dataChange();
                this.flag = true;
            })
        }
    }
    /* 目标数据过滤 */
    targetSearch = (value) => {
        const {targetData=[]} = this.state;
        const arr = targetData.filter((item)=>item.label.indexOf(value)>-1);
        this.setState({
            targetDataFilter:arr,
        },()=>{
            this.dataChange();
            this.flag = true;
        })
    }
    /* 源数据过滤 */
    sourceSearch = (value) => {
        const {sourceData=[]} = this.state;
        const arr = sourceData.filter((item)=>item.label.indexOf(value)>-1);
        this.setState({
            sourceDataFilter:arr,
        },()=>{
            this.dataChange();
            this.flag = true;
        })
    }
    /* 清空选中的数据 清空过滤条件下的数据 */
    clearTarget = () => {
        const {targetDataFilter=[], sourceDataFilter=[],targetData=[],sourceData=[],sourceSearchValue="" } = this.state;
        const {delPermission} = this.props; // 判断是否有删除已选中的数据的权限
        if(delPermission&&typeof delPermission === "function"){
            delPermission([...targetDataFilter].map(item=>item.value),(isCan)=> {
                if (isCan) {
                    const targetArr = targetData.filter(item => !targetDataFilter.some(subItem => `${subItem.value}` === `${item.value}`));// 清空当前显示在页面的数据，过滤的原始数据清空掉被过滤掉的部分
                    targetDataFilter.map(item => {
                        sourceData.push({...item});
                        if (item.label.indexOf(sourceSearchValue) > -1) {
                            sourceDataFilter.push({...item})
                        }
                        return false
                    });
                    this.setState({
                        sourceData,
                        sourceDataFilter,
                        targetData: targetArr,
                        targetDataFilter: []
                    }, () => {
                        this.dataChange();
                        this.flag = true;
                    })
                }
            })
        }else{
            const targetArr = targetData.filter(item => !targetDataFilter.some(subItem => `${subItem.value}` === `${item.value}`));// 清空当前显示在页面的数据，过滤的原始数据清空掉被过滤掉的部分
            targetDataFilter.map(item => {
                sourceData.push({...item});
                if (item.label.indexOf(sourceSearchValue) > -1) {
                    sourceDataFilter.push({...item})
                }
                return false
            });
            this.setState({
                sourceData,
                sourceDataFilter,
                targetData: targetArr,
                targetDataFilter: []
            }, () => {
                this.dataChange();
                this.flag = true;
            })
        }
    }
    /* 全选未选中filter之后的source数据 */
    checkAllSourceData = () => {
        const {targetDataFilter=[], sourceDataFilter=[],targetData=[],sourceData=[],targetSearchValue="" } = this.state;
        const sourceArr = sourceData.filter(item=>!sourceDataFilter.some(subItem=>`${subItem.value}`===`${item.value}`));// 清空当前显示在页面的数据，过滤的原始数据清空掉被过滤掉的部分
        sourceDataFilter.map(item=>{
            targetData.push({...item});
            if(item.label.indexOf(targetSearchValue)>-1){
                targetDataFilter.push({...item})
            }
            return false
        });
        this.setState({
            sourceData:sourceArr,
            sourceDataFilter:[],
            targetData,
            targetDataFilter
        },()=>{
            this.dataChange();
            this.flag = true;
        })
    }
    dataChange= () => {
        const {targetData=[],targetDataFilter=[],sourceData=[],sourceDataFilter=[]} = this.state;
        if(this.props.onChange){
            this.props.onChange(targetData,sourceData,targetDataFilter,sourceDataFilter)
        }
    }
    render(){
        const {
            targetTitle="已选中",
            sourceTitle="未选中" ,
            targetFilter=true,
            sourceFilter=true,
            style={},
            className="",
        } = this.props;
        const { targetSearchValue="",sourceSearchValue=""} = this.state;
        let {targetDataFilter=[], sourceDataFilter=[]} = this.state;
        targetDataFilter = targetDataFilter.sort((a,b)=>a.value-b.value);// 排序
        sourceDataFilter = sourceDataFilter.sort((a,b)=>a.value-b.value);// 排序
        return (<div className={`transfer-box ${className}`} style={{...style}} >
                    {/* 目标框 */}
                    <div className="transfer-target-box" >
                       <p className="transfer-box-title">
                           <span>{targetTitle}</span>
                           <span className="transfer-box-title-btn" onClick={()=>{this.clearTarget()}} onKeyPress={()=>{}}>清空</span>
                       </p>
                        {targetFilter&&<Search allowClear onChange={(e)=>this.setState({targetSearchValue:e.target.value})} onPressEnter={(e)=>{e.stopPropagation();e.preventDefault(); this.targetSearch(e.target.value)}} onSearch={(value)=>{this.targetSearch(value)}} placeholder="搜索" value={targetSearchValue} />}
                        <div className="transfer-content"  style={{borderTop:targetFilter?"none":"1px solid #dcdcdc"}}>
                            {
                                targetDataFilter.map((item)=><Tooltip title={item.label}><div key={item.value} className="transfer-content-target-tag" >{item.label} <Icon onClick={()=>{this.targetToSource(item)}}  type="close" /></div></Tooltip>)
                            }
                        </div>
                    </div>
                    {/* 原数据框 */}
                    <div className="transfer-source-box" >
                        <p className="transfer-box-title">
                            <span>{sourceTitle}</span>
                            {/* 判断是否为全选状态 */}
                            <span className="transfer-box-title-btn primary" onClick={()=>{this.checkAllSourceData()}} onKeyPress={()=>{}}>全选</span>
                        </p>
                        {sourceFilter&&<Search allowClear onChange={(e)=>this.setState({sourceSearchValue:e.target.value})} onPressEnter={(e)=>{e.stopPropagation();e.preventDefault();this.sourceSearch(e.target.value)}} onSearch={(value)=>{this.sourceSearch(value)}} placeholder="搜索" value={sourceSearchValue} />}
                        <div className="transfer-content" style={{borderTop:sourceFilter?"none":"1px solid #dcdcdc"}}>
                            {
                                sourceDataFilter.map((item)=><Tooltip title={item.label}><div key={item.value} className="transfer-content-source-tag"  onClick={()=>{this.sourceToTag(item)}} onKeyPress={()=>{}}>{item.label}</div></Tooltip>)
                            }
                        </div>
                    </div>
                </div>)
    }
}