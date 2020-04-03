import React, { Component } from "react";
import { CheckTagGroup } from "cake/src"; // eslint-disable-line


export default class CheckTagGroupDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tags:[
                {value:1,label:"苹果",extraProps:'apple',withPoint:true},
                {value:2,label:"香蕉",extraProps:'banana'},
                {value:3,label:"橘子",extraProps:'orange'},
                {value:4,label:"柠檬",extraProps:'lemon',disabled:true},
            ],
            checkedTags:[2,3]
        };
    }


    render() {

        return (
            <div>
               <div>
                   <h2>以下是 CheckTagGroupDemo 示例：</h2>
                   <CheckTagGroup
                       defaultCheckedList={this.state.checkedTags}
                       onChange={(checkedList,checkedTags) => {
                           console.log('checkedList：',checkedList,'checkedTags：',checkedTags)
                           this.setState({checkedTags:checkedList})
                       }}
                       tags={this.state.tags}
                       // type="radio"
                   />
               </div>
            </div>
        )
    }
}

