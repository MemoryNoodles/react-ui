import React, { Component } from 'react';
import { WangEditor } from "cake/src"; // eslint-disable-line
class App extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {

        }
        this.dataUrl = sessionStorage.getItem("loginSession")?JSON.parse(sessionStorage.getItem("loginSession")).content.data_url:"";
    }
    render() {
        return (
            <div >
                <WangEditor serverUrl="http://192.168.7.64:16089" menus={['head', 'bold', 'fontSize', 'fontName', 'italic', 'underline', 'strikeThrough', 'foreColor', 'backColor', 'link', 'list', 'justify', 'quote', 'emoticon', 'image','upFile', 'undo', 'redo']} />
            </div>
        );
    }

}

export default App;