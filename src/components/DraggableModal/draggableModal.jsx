import React from "react";
import { Modal } from "antd";
import PropTypes from "prop-types";

// 获得随机数
const genNonDuplicateID = length => Number(
    Math.random()
        .toString()
        .substr(3, length) + Date.now()
).toString(36);

/*
 * 可拖动的弹框 组件
 * author：徐静
 * date：2019.02.14
 * */
export default class DraggableModal extends React.Component {
    static propTypes = {
        width: PropTypes.number,
        top: PropTypes.number,
        title: PropTypes.string,
        visible: PropTypes.bool,
        wrapClassName: PropTypes.string,
        children: PropTypes.node,
        afterCloseToInitPosition: PropTypes.bool, // 拖动弹框关闭后是否回归初始位置
    };
    static defaultProps = {
        width:520,
        top:100,
        title: "Drag-Modal",
        visible:false,
        wrapClassName: "",
        children: <div />,
        afterCloseToInitPosition:true,
    };

    constructor(props) {
        super(props);
        this.id = genNonDuplicateID(10); // 获得随机id
        this.initLeft = (window.innerWidth - (this.props.width)) / 2; // 初始化水平位置调整
        this.initTop = this.props.top ; // 初始化垂直位置调整
        this.dragDom = null; // 拖拽的目标元素
        this.dragging = false; // 是否拖拽的开关
        this.tLeft = 0; // ---| 坐标轴x
        this.tTop = 0; //  ------> 坐标轴y
    }

    componentDidMount() {
        // 初始化dragDom初始位置
        this.getDragDom();
    }

    componentDidUpdate() {
        // 若dragDom不存在，初始化dragDom初始位置
        if (!this.dragDom) {
            this.getDragDom();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.visible) {
            this.dragging = false; // 停止移动状态
            document.onmousemove = null; // 停止鼠标移动事件
        }
    }

    /*
     * 初始渲染时，直接获取 Modal 的 dom 会获取不到。
     * 设置 ref 使用 findDOMNode 也获取不到。
     * 只能在定时器中使用原生方式来获取。
     * */
    getDragDom = () => {
        setTimeout(() => {
            // 获取唯一标示元素
            const dragDom = document.getElementsByClassName(`d_${this.id}`)[0];
            if (dragDom) {
                dragDom.style.left = `${this.initLeft}px`;
                dragDom.style.top = `${this.initTop}px`;
                this.dragDom = dragDom;
            }
        });
    };

    onMouseDown = e => {
        e.preventDefault();
        this.dragging = true; // 激活拖拽状态
        /*
         ** 实现点击后，当前浮层在最上面
         ** 将当前所有涉及可拖拽的浮层的 zindex = 1000
         ** 将当前拖拽目标的 zindex = 1001
         * */
        const nodeList = document.getElementsByClassName("drag_modal");
        if (nodeList.length > 0) {
            Array.from(nodeList).forEach(item => (item.style.zIndex = 1000));
            this.dragDom.style.zIndex = 1001;
        }

        /*
         * getBoundingClientRect: 返回一个 DomRect 对象
         *   包含该元素的 top、right、bottom、left 值，对应的是到屏幕上方和左边的距离，单位 px
         * */
        const dragDomRect = this.dragDom.getBoundingClientRect();
        /*
         * e.clientX、e.clientY
         *   获取鼠标的坐标位置
         * */
        this.tLeft = e.clientX - dragDomRect.left; // 鼠标按下时和选中元素的坐标偏移:x坐标
        this.tTop = e.clientY - dragDomRect.top; // 鼠标按下时和选中元素的坐标偏移:y坐标

        this.onMouseMove(this.dragDom);
    };

    onMouseUp = e => {
        e.preventDefault();
        this.dragging = false; // 停止移动状态
        document.onmousemove = null; // 停止鼠标移动事件
    };

    onMouseMove = node => {
        document.onmousemove = e => {
            e.preventDefault();
            if (this.dragging) {
                node.style.left = `${e.clientX - this.tLeft}px`;
                node.style.top = `${e.clientY - this.tTop}px`;
            }
        };
        document.onmouseup = e => {
            e.preventDefault();
            this.dragging = false; // 停止移动状态
            document.onmousemove = null; // 停止鼠标移动事件
        };
    };

    render() {
        return (
            <Modal
                {...this.props}
                afterClose={()=>{this.props.afterCloseToInitPosition&&this.getDragDom()}}
                keyboard={false}
                title={
                    <div
                        className="drag_title"
                        onMouseDown={this.onMouseDown}
                        onMouseUp={this.onMouseUp}
                    >
                        {this.props.title}
                    </div>
                }
                wrapClassName={`drag_modal_wrap d_${this.id} ${this.props.wrapClassName}`}
            >
                {this.props.children}
            </Modal>
        );
    }
}
