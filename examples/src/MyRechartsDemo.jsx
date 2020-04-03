import React from "react";
import { MyRecharts } from "cake/src";

const lineOption = {
    // width: 700, //宽
    // height: 500, //高
    // margin: { left: 30, top: 30, right: 30, bottom: 30 }, //margin
    // x: {
    //     //x轴
    //     padding: { left: 30, right: 30 },
    //     lineColor: "red", //x轴颜色
    //     stroke: "red", //x轴刻度颜色
    //     fontSize: 16 //x轴刻度字体大小
    // },
    // y: {
    //     //y轴
    //     tick: true, //刻度
    //     tickLine: true //刻度线
    // },
    //legend: true, //图例
    // grid: {
    //     //网格
    //     x: true, //横向
    //     y: false //竖向
    // },
    lines: [
        //线形图的线
        {
            name: "金额",
            value: "uv",
            //dot: false, //小圆点
            // onClick: e => {
            //     //点击事件
            //     console.log(e);
            // },
            // closeAnimation: true //关闭动画
        },
        // {
        //     name: "阿重拍",
        //     value: "pv",
        //     lineColor: "red", //线的颜色
        //     onClick: e => {
        //         //点击事件
        //         console.log(e);
        //     },
        //     label: {
        //         color: "red" //数据颜色
        //     },
        //     animationDuration: 1000, //动画持续时间
        //     r: 6 // 圆点半径
        // }
    ],
    data: [
        //传入数据
        {
            name: "18年08月",
            uv: 3500,
            pv: 2400,
            amt: 2400
        },
        {
            name: "18年09月",
            uv: 4200,
            pv: 1398,
            amt: 2210
        },
        {
            name: "18年10月",
            uv: 3800,
            pv: 9800,
            amt: 2290
        },
        {
            name: "18年11月",
            uv: 3800,
            pv: 3908,
            amt: 2000
        },
        {
            name: "18年12月",
            uv: 5000,
            pv: 4800,
            amt: 2181
        },
        {
            name: "19年01月",
            uv: 5000,
            pv: 3800,
            amt: 2500
        }
    ]
};

const barOption = {
    // width: 700, //宽
    // height: 500, //高
    // margin: { left: 30, top: 30, right: 30, bottom: 30 }, //margin
    // x: {
    //     //x轴
    //     tick:{
    //         fill:"red"
    //     },
    //     padding: { left: 30, right: 30 },
    //     lineColor: "blue", //x轴颜色
    //     color: "blue", //x轴刻度颜色
    //     fontSize: 16 //x轴刻度字体大小
    // },
    // y: {
    //     //y轴
    //     tick: true, //刻度
    //     tickLine: true //刻度线
    // },
    bars: [
        //线形图的线
        {
            name: "金额",
            value: "uv",
            //closeAnimation: true //关闭动画
        },
        // {
        //     name: "阿重拍",
        //     value: "pv",
        //     bar: {
        //         barColor: "blue" //线的颜色
        //     },
        //     onClick: e => {
        //         console.log(e);
        //     },
        //     label: {
        //         color: "blue" //数据颜色
        //     },
        //     animationDuration: 1000 //动画持续时间
        // }
    ],
    data: [
        //传入数据
        {
            name: "18年08月",
            uv: 3500,
            pv: 2400,
            amt: 2400
        },
        {
            name: "18年09月",
            uv: 4200,
            pv: 1398,
            amt: 2210
        },
        {
            name: "18年10月",
            uv: 3800,
            pv: 9800,
            amt: 2290
        },
        {
            name: "18年11月",
            uv: 3800,
            pv: 3908,
            amt: 2000
        },
        {
            name: "18年12月",
            uv: 5000,
            pv: 4800,
            amt: 2181
        },
        {
            name: "19年01月",
            uv: 5000,
            pv: 3800,
            amt: 2500
        }
    ]
};

const pieOption = {
    // width: 700, //宽
    // height: 500, //高
    // legend: true, //图例
    //colors: ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "blue", "red"], //扇形颜色
    pies: [
        {
            name: "金额",
            value: "pv",
            // cx:350, //圆心X轴
            // cy:250, //圆心Y轴
            // innerRadius:0,      //内径
            // outerRadius:200,    //外径
            // onClick: e => {
            //     console.log(e);
            // },
            // animationDuration: 1000 //动画持续时间
        }
    ],
    data: [
        //传入数据
        {
            name: "18年08月",
            uv: 3500,
            pv: 2400,
            amt: 2400
        },
        {
            name: "18年09月",
            uv: 4200,
            pv: 1398,
            amt: 2210
        },
        {
            name: "18年10月",
            uv: 3800,
            pv: 9800,
            amt: 2290
        },
        {
            name: "18年11月",
            uv: 3800,
            pv: 3908,
            amt: 2000
        },
        {
            name: "18年12月",
            uv: 5000,
            pv: 4800,
            amt: 2181
        },
        {
            name: "19年01月",
            uv: 5000,
            pv: 3800,
            amt: 2500
        }
    ]
};

export default class MyRechartsDemo extends React.Component {
    render() {
        return (
            <div>
                <MyRecharts option={lineOption} type="line" />
                <MyRecharts option={barOption} type="bar" />
                <MyRecharts option={pieOption} type="pie" />
            </div>
        );
    }
}
