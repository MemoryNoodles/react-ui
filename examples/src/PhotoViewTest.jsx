import React, { Component } from 'react';
import { PhotoView } from "cake/src"; // eslint-disable-line
class PhotoViewTest extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {

        }
    }
    render() {
        return (
            <div >
                <PhotoView detailText={"<p></p><div class=\"media-wrap image-wrap\"><img src=\"http://192.168.7.146:8080/data/getData?reqCode=10002&amp;img_key=51639790E0CF4354BCD1053F107BDC1A\"/></div><p></p>"} />
            </div>
        );
    }

}

export default PhotoViewTest;