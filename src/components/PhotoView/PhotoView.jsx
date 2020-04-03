import React, { Component } from "react";
import PropTypes from "prop-types";
import Viewer from "./viewerjs/viewer.min";

class PhotoView extends Component {
    static propTypes = {
        detailText:PropTypes.any,
        className:PropTypes.string,
        style:PropTypes.object
    };
    static defaultProps = {
        detailText:"",
        className:"",
        style:{}
    };
  constructor() {
    super();
    this.state = {
        detailText: ""
    };
    this.detailBox = React.createRef();
  }
  componentDidMount(){
      const detailText = this.props.detailText?this.props.detailText.replace(
          /<img([\s\S]*?)src\s*=/g,
          '<img data-original="" src='
      ):"";
      this.setState({
          detailText
      },() =>  { this.gallery = new Viewer(this.detailBox.current)});
  }
  
  componentWillReceiveProps(nextProps) {
      const detailText = nextProps.detailText?nextProps.detailText.replace(
        /<img([\s\S]*?)src\s*=/g,
        '<img data-original="" src='
      ):"";
      this.setState({
        detailText
      },() =>  { this.gallery = new Viewer(this.detailBox.current)});
  }
  
  render() {
      const {
          className="",
          style={},
      } = this.props
    return (
      <div key={Math.random()} className={className} style={{...style}}  ref={this.detailBox} id="detail-box">
        <div
            className="message-detail-text"
            dangerouslySetInnerHTML={{
            __html: this.state.detailText
          }}
        />
      </div>
    );
  }
}

export default PhotoView;
