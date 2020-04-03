import React from "react";
import { Button, Upload} from "antd";
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');


class MyUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileList:[] // 已经上传的文件列表
        }
    }

    componentDidMount() {
        if(this.props.defaultValue){
            this.setState({fileList:this.props.defaultValue})
        }
    }


    render() {
        let {
            uploadType, // 上传类型：single：单文件 multi:多文件
            onChange,
            beforeUpload,
            onRemove,
            itemInputStyle,
            itemBtnStyle,
            btnText
        } = this.props;

        return (
            <Upload
                {...this.props}
                // 已经上传的文件列表（受控）
                fileList={this.state.fileList}
                // 上传文件改变时的状态
                onChange={info=>{
                    // file:{
                    //     uid: 'uid',      // 文件唯一标识，建议设置为负数，防止和内部产生的 id 冲突
                    //     name: 'xx.png'   // 文件名
                    //     status: 'done', // 状态有：uploading done error removed
                    //     response: '{"status": "success"}', // 服务端响应内容
                    //     linkProps: '{"download": "image"}', // 下载链接额外的 HTML 属性
                    // }
                    const {file,fileList}=info
                    if(uploadType==="single"){
                        this.setState({
                            fileList:[file]
                        },()=>{
                            onChange&&onChange([...this.state.fileList],this.props.form)
                        })
                    }else{
                        this.setState({
                            fileList:fileList
                        },()=>{
                            onChange&&onChange([...this.state.fileList],this.props.form)
                        })
                    }
                }}
                // 上传文件之前的钩子: (file) => {return false},返回 false 后变为手动上传文件(不会出现进度条)
                beforeUpload={(file, fileList)=>beforeUpload&&beforeUpload(file, fileList, this.props.form)}
                // 点击移除文件时的回调：(file) => {return false}//不移除
                onRemove={file=>{
                    if(uploadType==="single"){
                        this.setState({
                            fileList:[]
                        })
                    }else{
                        this.setState({
                            fileList:this.state.fileList.filter(item=>{return item.uid!==file.uid})
                        })
                    }
                    onRemove&&onRemove(file,this.props.form)
                }}
                // 点击文件链接的回调
                onPreview={(file)=>{
                    onPreview&&onPreview(file,this.props.form)
                }}
                style={itemInputStyle}
                withCredentials
            >
                <Button style={itemBtnStyle}>{btnText||'上传文件'}</Button>
            </Upload>
        )
    }
}

MyUpload.defaultProps = {
    uploadType:"single",// 上传类型：single：单文件 multi:多文件
    action:"", // 上传的地址
    listType:"text", // 上传列表的内建样式
    defaultValue: [], // {name:""}
    multiple: false,// 是否支持多选文件
    showUploadList: false,// 是否展示文件列表
    disabled: false,
    onChange: undefined,
    beforeUpload: undefined,
    onRemove: undefined,
    onPreview: undefined,
    itemInputStyle: {},
    itemBtnStyle: {},
    btnText: "",
}
MyUpload.propTypes = {
    uploadType: PropTypes.string, // 上传类型：single：单文件 multi:多文件
    action: PropTypes.string, // 上传的地址
    listType: PropTypes.string, // 上传列表的内建样式
    defaultValue: PropTypes.array,
    multiple: PropTypes.bool, // 是否支持多选文件
    showUploadList: PropTypes.bool, // 是否展示文件列表
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    beforeUpload: PropTypes.func,
    onRemove: PropTypes.func,
    onPreview: PropTypes.func,
    itemInputStyle: PropTypes.object,
    itemBtnStyle: PropTypes.object,
    btnText: PropTypes.string,
}
export default MyUpload;