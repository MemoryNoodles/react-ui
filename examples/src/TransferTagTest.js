/**
 * Created with react_project.
 * User: 王洪瑞/3153981409@qq.com
 * Date: 2019/3/8
 * Time: 10:32
 *
 */
import React, { Component } from 'react';
import { TransferTag } from "cake/src"; // eslint-disable-line
class App extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            sourceData:[]
        }

    }
    componentDidMount(){
        this.queryData();
    }
    /* 请求初始数据 并对数据做处理 */
    queryData = () => {
        const sourceData = [];
        /* 这个数据只是模拟数据  具体的要自己去请求 */
        for(let i=0; i<100; i++){
            sourceData.push({label:`张三${i}`,value:i})
        }
        this.setState({
            sourceData
        })
    }
    delPermission = (arr,callback) => {
        const flag = true;
        new Promise((resolve) =>{
            resolve();
        } ).then(()=>{
            callback(flag)
        })
        return flag;
    }
    render() {
        /* const sourceData = [];
        for(let i=0; i<20; i++){
            sourceData.push({label:`张三自`,value:i})
        } */
        return (
           <div>
               <h1>以下是穿梭过滤框组件示例</h1>
               <div style={{width:360,margin:"0 auto"}} >
                   <TransferTag value={[{value:"1",label:"测试"}]} sourceData={this.state.sourceData} delPermission={(arr,callback)=>{this.delPermission(arr,callback)}}  />
               </div>
           </div>
        );
    }

}

export default App;