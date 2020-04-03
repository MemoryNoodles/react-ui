import React, { Component } from 'react';
import { TransferSelectTag } from "cake/src"; // eslint-disable-line

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
            sourceData.push({label:`张三${i}`,key:i})
        }
        this.setState({
            sourceData
        })
    }
    onChange = (nextTargetKeys, direction, moveKeys) => {
        // eslint-disable-next-line no-console
        console.log(nextTargetKeys, direction, moveKeys)
    }
    render() {
        /* const sourceData = [];
        for(let i=0; i<20; i++){
            sourceData.push({label:`张三自`,value:i})
        } */
        return (
           <div>
               <h1>以下是穿梭过滤框组件示例</h1>
               <div>
                   <TransferSelectTag dataSource={this.state.sourceData} onChange={this.onChange} />
               </div>
           </div>
        );
    }

}

export default App;