import React from "react";
import {Modal, Button} from "antd";
import PropTypes from "prop-types"; // eslint-disable-line
import MyForm from "./form";// eslint-disable-line


/**
 * 弹出框表单组件.
 * User: 王洪瑞/3153981409@qq.com
 * Date: 2019/2/18
 * Time: 16:12
 *
 */
class PopForm extends React.Component {
    static propTypes = {
        initData: PropTypes.shape({
            title: PropTypes.string,
            modalWidth: PropTypes.number,
            formItemLayout: PropTypes.object,
            itemList: PropTypes.array,
            closable: PropTypes.bool,
            maskClosable: PropTypes.bool,
            canClose: PropTypes.bool,
            destroyOnClose: PropTypes.bool,
            customButton:  PropTypes.oneOfType([
                PropTypes.object,
                PropTypes.bool
            ]),
            customFun: PropTypes.func,
            onOk: PropTypes.func,
            onCancel: PropTypes.func,
        }),
        formLayout:PropTypes.string,
        children: PropTypes.node,
        okText: PropTypes.string,
        getContainer: PropTypes.func,
    };
    static defaultProps = {
        initData:{
            title: '',
            modalWidth: 560,
            formItemLayout: {
                labelCol: {span: 4},
                wrapperCol: {span: 19}
            },
            itemList: [],
            closable: false,
            maskClosable: false,
            canClose: true,
            destroyOnClose: true,
            customButton: null,
            customFun: () => {
            },
            onOk: () => {
            },
            onCancel: () => {
            },
        },
        formLayout:"horizontal",
        children: [],
        okText: '确定',
        getContainer: ()=>document.body,
    };

    constructor(props) {
        super(props);
        this.state = {
            // 弹出框显示/隐藏
            modalVisible: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.modalVisible !== nextProps.modalVisible) {
            // 显示Modal
            this.setState({
                modalVisible: nextProps.modalVisible
            })
        }
    }


    render() {
        const {
            title= '',
            modalWidth= 560,
            formItemLayout= {
                labelCol: {span: 4},
                wrapperCol: {span: 19}
            },
            itemList= [],
            closable= false,
            maskClosable= false,
            canClose= true,
            destroyOnClose= true,
            customButton= null,
            customFun= () => {
            },
            onOk= () => {
            },
            onCancel= () => {
            },
        } = this.props.initData;


        return (
            <div className="modal-pupModal">
                <Modal
                    ref={(ins) => {
                        this.modalInstance = ins
                    }}
                    centered
                    className="pop-form-modal"
                    closable={canClose===false?false:closable}
                    destroyOnClose={destroyOnClose}
                    footer={null}
                    getContainer={this.props.getContainer}
                    maskClosable={canClose===false?false:maskClosable}
                    onCancel={() => {
                        onCancel()
                    }}
                    title={title}
                    visible={this.state.modalVisible}// 关闭时销毁 Modal 里的子元素
                    width={modalWidth}
                >
                    <div className="pop-form-custom-text">
                        {this.props.children}
                    </div>
                    <MyForm
                        customButton={customButton}
                        customFun={customFun}
                        formItemLayout={formItemLayout}
                        itemList={itemList}
                        okText={this.props.okText}
                        onCancel={onCancel}
                        onOk={onOk}
                        formLayout={this.props.formLayout}
                        wrappedComponentRef={(form) => {
                            this.form = form
                        }}
                    >
                        {canClose && <Button onClick={onCancel} style={{marginRight: 6}}>取消</Button>}
                    </MyForm>
                </Modal>
            </div>

        );
    }
}

export default PopForm;
