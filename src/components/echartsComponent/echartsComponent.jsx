/**
 * Created with react_project.
 * User: 王洪瑞/3153981409@qq.com
 * Date: 2019/3/6
 * Time: 14:11
 *
 */

import React from "react";
import echarts from "echarts";
import PropTypes from "prop-types";

class MyEcharts extends React.Component{
    static propTypes = {
        option: PropTypes.object,
    };
    static defaultProps = {
        option: {},// 图表配置
    };
    constructor(props){
        super(props);
        this.myEcharts = React.createRef();
        this.myChart = null;
    }
    componentDidMount(){
        // 首次初始化
        const { option = {} } = this.props;
        this.myChart = echarts.init(this.myEcharts.current);
        this.myChart.setOption(option);
        window.addEventListener("resize",this.resizeEvent);
    }
    componentWillReceiveProps(nextProps){
        // 外部配置发生改变 重新初始化图表 
        if(this.props.option!==nextProps.option){
            this.myChart = echarts.init(this.myEcharts.current);
            this.myChart.setOption(nextProps.option);
            window.addEventListener("resize",this.resizeEvent);
        }
    }
    resizeEvent = () => {
        if(this.myChart){
            this.myChart.resize();
        }
    }
    componentWillUnmount(){
        window.removeEventListener("resize",this.resizeEvent);
    }
    render(){
        return (
            <div className="echartsBox">
                <div  ref={this.myEcharts} />
            </div>
        )
    }
}
export default MyEcharts;