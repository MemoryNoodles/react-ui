import React, { Component } from "react";
import {MyEcharts} from "cake/src"; // eslint-disable-line

class MyEchartsTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            option: {
                series: [
                    {
                        name:'星座',
                        type:'pie',
                        data:[
                            {value:4, name:'双子座'},
                        ]
                    },
                    {
                        name:'姓名',
                        type:'pie',
                        data:[
                            {value:1, name:'234'},
                            {value:2, name:'567'},
                            {value:3, name:'768'},
                        ],
                    },
                    {
                        name:'部门',
                        type:'pie',
                        data:[
                            {value:22, name:'QQ部'},
                            {value:23, name:'sfg部'}
                        ]
                    }
                ]
            }
        };
    }

    componentDidMount(){
        let option={}
        // 定时器模拟请求接口
        setTimeout(()=>{
            option = {
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },

                series: [
                    {
                        name:'星座',
                        type:'pie',
                        selectedMode: 'single',
                        radius: ['50%', '70%'],

                        label: {
                            normal: {
                                position: 'out',
                                fontSize: 20,
                                color:'',
                                fontFamily:'Microsoft Yahei'
                            }
                        },
                        data:[
                            {value:4, name:'双子座'},
                            {value:3, name:'白羊座'},
                            {value:3, name:'金牛座'},
                            {value:2, name:'天蝎座'},
                            {value:2, name:'双鱼座'},
                            {value:2, name:'处女座'},
                            {value:2, name:'射手座'},
                            {value:1, name:'摩羯座'},
                            {value:1, name:'天秤座'},
                            {value:1, name:'水瓶座'},
                            {value:1, name:'狮子座'}
                        ]
                    },
                    {
                        name:'姓名',
                        type:'pie',
                        hoverAnimation:false,
                        cursor:"default",
                        radius: ['30%', '40%'],
                        label: {
                            show:false
                        },
                        data:[
                            {value:1, name:'1'},
                        ],
                        tooltip:{
                            show:false
                        }
                    },
                    {
                        name:'部门',
                        type:'pie',
                        hoverAnimation:false,
                        radius: ['0%', '30%'],
                        label: {
                            normal: {
                                position: 'center',
                                fontSize: 22,
                                fontFamily:'Microsoft YaHei',
                                color:'#80F0E3'
                            }
                        },
                        tooltip:{
                            show:false
                        },
                        data:[
                            {value:22, name:'QQ部'}
                        ]
                    }
                ]
            };
            this.setState({option})
        },10000)
    }

    render() {
        console.log("Demo option",this.state.option)

        return (
            <div style={{height:600}} >
                <h1>echarts实例</h1>
                <MyEcharts option={this.state.option} />
            </div>
        );
    }
}
export default MyEchartsTest;
