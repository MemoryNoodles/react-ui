import React from "react";
import { Table } from "antd";
import PropTypes from "prop-types";
// 分页条数
const PAGE_SIZE_OPTIONS = ["10", "20", "30"];
// Table滚动高度(10条数据高度)
const TABLE_SCROLL_Y = 616;
/*
 * Table 组件
 * author：王洪瑞
 * date：2019.01.31
 * */
export default class TableData extends React.Component {
    static propTypes = {
        bordered: PropTypes.bool,
        columns : PropTypes.array,
        loading: PropTypes.bool,
        intervalColor: PropTypes.bool,
        queryData: PropTypes.func,
        rowKey: PropTypes.func,
        rowSelection : PropTypes.object,
        size: PropTypes.string,
        pagingSize:PropTypes.string,
        title:PropTypes.any,
        scroll:PropTypes.any,
        onRow:PropTypes.func,
        rowClassName:PropTypes.any,
        components:PropTypes.any,
        position:PropTypes.string,
        pageSizeOptions:PropTypes.array,
    };
    static defaultProps = {
        bordered: false,
        columns: [],
        loading: false,
        intervalColor: false,
        queryData: ()=>{},
        rowKey:record => record.id,
        rowSelection: null,
        size: "default",
        pagingSize: "default",
        title:null,
        scroll:false,
        onRow:()=>{},
        rowClassName:false,
        components:{},
        position:"bottom",
        pageSizeOptions:PAGE_SIZE_OPTIONS
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            pageInfo: {
                current: 1,
                pageSize: this.props.pageSizeOptions&&this.props.pageSizeOptions[0]?this.props.pageSizeOptions[0]:10,
                total: 0,
                pageSizeOptions: PAGE_SIZE_OPTIONS,
                showQuickJumper: false,
                showSizeChanger: true,
            },
            dataList: [],
            hasPage: false,
            hasLoading: this.props.loading,
        };
        this.flag = true;
    }

    componentWillMount() {
        this.setState({
            loading: this.state.hasLoading,
        });
        this.resetData(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.resetData({ ...nextProps });
    }
    /* 刷新table数据 */
    resetData = props => {
        const { dataSource = {} } = props;

        if (dataSource.page) {
            // 传回来的数据有分页功能
            const { pageNo, totalCount, pageSize, entities=[] } = dataSource.page;
            if(totalCount!==0&&pageNo&&pageNo !== 1&&entities&&entities.length===0 &&this.flag){  // 如果当前页不属于第一页并且此页没数据，就自动跳转到前一页，正常情况下只会跳转一次
                this.props.queryData({ pageNo:pageNo-1, pageSize });
                this.flag = false;// 避免死循环
            } else{
                this.setState({
                    dataList: entities,
                    hasPage: true,
                });
                this.resetPage({ pageNo, totalCount, pageSize });
            }
        } else if (dataSource.data) {
            /* 传回来的数据没有分页++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
            this.setState({
                dataList: dataSource.data,
                hasPage: false,
            });
        }else{
            this.setState({
                dataList: [],
                hasPage: false,
            });
        }
    };

    /* 返回分页条件 */
    returnPage = () => ({
        pageNo: this.state.pageInfo.current,
        pageSize: this.state.pageInfo.pageSize,
    });

    /* 重置分页 */
    resetPage = obj => {
        const {
            pageNo = this.state.pageInfo.current,
            totalCount = this.state.pageInfo.total,
            pageSize = this.state.pageInfo.pageSize,
        } = obj;
        const { pageInfo } = this.state;
        pageInfo.current = pageNo;
        pageInfo.total = totalCount;
        pageInfo.pageSize = pageSize;
        this.setState({
            pageInfo,
            loading: false,
        });
    };
    /* 改变分页 */
    changePage = pageNo => {
        //table上有sorter排序且有onChange的时候回出发这个函数
        if(pageNo != this.state.pageInfo.current ){
            this.setState({
                loading: this.state.hasLoading,
            });
            const { pageInfo } = this.state;
            this.props.queryData({ pageNo, pageSize: pageInfo.pageSize });
        }
       
    };
    /* 改变分页条数 */
    toSelectChange = (page, size) => {
        this.setState({
            loading: this.state.hasLoading,
        });
        if(this.props.queryData){
            this.props.queryData({ pageNo: 1, pageSize: size });
        }
    };
    render() {
        const {
            bordered = false,
            columns = [],
            rowSelection = null,
            size = "default",
            pagingSize = "default",
            title = null,
            scroll=false,
            onRow=()=>{},
            rowClassName,
            intervalColor=true,
            rowKey,
            components={},
            position="bottom",
            pageSizeOptions=this.state.pageInfo.pageSizeOptions
        } = this.props;
        const {loading=false,pageInfo=false,dataList=[],hasPage=false} = this.state

        return (
            <div className="ant-table-wrap">
                <Table
                    {...this.props}
                    key={this.state.loading}
                    bordered={bordered}
                    columns={columns}
                    components={components}
                    dataSource={dataList}
                    loading={loading}
                    locale={{
                        emptyText:""
                    }}
                    onRow={(record)=>onRow(record)}
                    pagination={hasPage?{...pageInfo,
                        pageSizeOptions,
                        position,
                        size:pagingSize,
                        onChange:this.changePage,
                        onShowSizeChange:this.toSelectChange,
                        showTotal:  (total) => `共 ${  total  } 条数据`}:false
                    }
                    rowClassName={(record, index)=>{
                        let className = " ";
                        if(index%2===1&&intervalColor){
                            className =  'tr-row-bg '
                        }else{
                            className =  ' '
                        }
                        if(rowClassName&& rowClassName(record)){
                            className +=  rowClassName(record)
                        }
                        return className; 
                    }}
                    rowKey={(record, index) => {
                        if(rowKey){
                            return rowKey(record,index)
                        }
                        return index
                    }}
                    rowSelection={rowSelection}
                    scroll={scroll?{y: TABLE_SCROLL_Y,...scroll}:{y: TABLE_SCROLL_Y}}
                    size={size}
                    title={title}
                />
            </div>
        )
    }
}

