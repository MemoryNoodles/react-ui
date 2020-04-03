import React, { Component } from "react";
import { SearchForm } from "cake/src";


export default class DraggableModalDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lotcodeList:[],// searchform彩种列表
            platLotcodeList:[],// searchform平台彩种列表
            playList:[],// searchform玩法列表
            algorithmList:[],// searchform算法列表
        };
    }
    queryData=(json) =>{
        console.log("json:",json)
        // console.log("this.searchFormIns.json:",this.searchFormIns.json)
    }

    // 全量获取彩种
    lotGetlotnopage=()=>{
        // Api.lotGetlotnopage()
        //     .then(res=>{
        //         this.setState({
        //             lotcodeList:res.content,
        //             platLotcodeList:[],
        //             playList:[],
        //             algorithmList:[],
        //         })
        //     })
    }
    // 全量获取平台彩种(根据彩种id)
    platGetlotplatnopage=(lotNumber='')=>{
        // Api.platGetlotplatnopage({lotNumber})
        //     .then(res=>{
        //         this.setState({
        //             platLotcodeList:res.content,
        //             playList:[],
        //             algorithmList:[],
        //         })
        //     })
    }
    // 获取平台彩种下的玩法（在searchForm中）
    playGetlotplaybyplat=(platNumber)=>{
        // Api.playGetlotplaybyplat({platNumber})
        //     .then(res=>{
        //         this.setState({
        //             playList:res.content,
        //             algorithmList:[],
        //         })
        //     })
    }
    // 根据平台彩种编号,玩法编号获取算法（在searchForm中）
    baseGetarithbyplatplaynum=(platNumber,playNumber)=>{
        // Api.baseGetarithbyplatplaynum({platNumber,playNumber})
        //     .then(res=>{
        //         this.setState({
        //             algorithmList:res.content
        //         })
        //     })
    }

    render() {
        const Config = [ // 联动
            {
                name: "彩种",
                keyName: "lotcode",
                type: "select",
                placeholder: "请选择彩种",
                options:[
                    {value:"",label:"全部"},
                    ...this.state.lotcodeList.map(item=>{
                        return {value:item.lotNumber,label:item.name}
                    })
                ],
                onChange:(value,option,form)=>{
                    // 获取彩种下的平台彩种
                    this.platGetlotplatnopage(value)
                    form.setFieldsValue({platNumber:'',playNumber:'',arithId:''})
                },
                colSpan: 3,
            },
            {
                name: "平台彩种",
                keyName: "platNumber",
                type: "select",
                placeholder: "请选择平台彩种",
                options:[
                    {value:"",label:"全部"},
                    ...this.state.platLotcodeList.map(item=>{
                        return {value:item.platNumber,label:item.name}
                    })
                ],
                onChange:(value,option,form)=>{
                    // 获取平台彩种下的玩法
                    this.playGetlotplaybyplat(value)
                    form.setFieldsValue({playNumber:'',arithId:''})
                },
                colSpan: 3,
            },
            {
                name: "玩法",
                keyName: "playNumber",
                type: "select",
                placeholder: "请选择玩法",
                options:[
                    {value:"",label:"全部"},
                    ...this.state.playList.map(item=>{
                        return {value:item.playNumber,label:item.name}
                    })
                ],
                onChange:(value,option,form)=>{
                    // 根据平台彩种编号,玩法编号获取算法
                    this.baseGetarithbyplatplaynum(form.getFieldValue('platNumber'),value)
                    form.setFieldsValue({arithId:''})
                },
                colSpan: 3,
            },
            {
                name: "算法",
                keyName: "arithId",
                type: "select",
                placeholder: "请选择算法",
                options:[
                    {value:"",label:"全部"},
                    ...this.state.algorithmList.map(item=>{
                        return {value:item.id,label:item.name}
                    })
                ],
                colSpan: 3,
            }
        ]

        const searchConfig=[
            // 过滤表单配置示例
            {
                name: "姓名",
                type: "text",
                keyName: "name",
                placeholder: "请输入姓名",
                onChange:(e, form)=> {
                    // 除了联动，一般用不上
                    console.log(e.target, e.target.value, form);
                }
            },
            {
                name: "年龄",
                type: "number",
                keyName: "age",
                placeholder: "请输入年龄",
            },
            {
                name: "性别",
                type: "radio",
                keyName: "sex",
                defaultValue:1,
                options: [
                    { value: 1, label: "男" },
                    { value: 2, label: "女" },
                ]
            },
            {
                name: "爱好",
                type: "radioTag",
                keyName: "habby",
                defaultValue:1,
                options: [
                    { value: 1, label: "唱歌" },
                    { value: 2, label: "跳舞" },
                    { value: 3, label: "画画" },
                ]
            },
            {
                name: "类型",
                type: "select",
                keyName: "type",
                defaultValue:1,
                options: [
                    { value: 1, label: "111" },
                    { value: 2, label: "222" },
                    { value: 3, label: "333" }
                ]
            },
            {
                name: "日期",
                keyName: "date",
                type: "date",
                dateType: "date",
                placeholder: "请选择时间",
                // disabledDate:(current)=>{
                //     return current && current < moment("2018-08-14", "YYYY-MM-DD")
                // }
            },
            {
                name: "周",
                keyName: "week",
                type: "date",
                dateType: "week",
                placeholder: "请选择时间"
            },
            {
                name: "月份",
                keyName: "month",
                type: "date",
                dateType: "month",
                placeholder: "请选择时间"
            },
            {
                name: "时间范围",
                type: "dateRange",
                keyName: "time",
                beginKeyName: "startTime",
                endKeyName: "endTime",
                colSpan: 8,
                mdColSpan: 10,
                smColSpan: 12,
            },
        ]
        
        return (
            <div>
                <h2>以下是 SearchForm 示例：</h2>
                <SearchForm
                    config={searchConfig}
                    reset={this.resetSearch}
                    search={this.queryData}
                    collapse={true}
                    // ref={ins=>this.searchFormIns=ins}
                />
            </div>
        )
    }
}

