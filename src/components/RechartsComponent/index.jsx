import React from "react";
import PropTypes from "prop-types";

import BarCharts from "./BarCharts/BarCharts";
import LineCharts from "./LineCharts/LineCharts";
import PieCharts from "./PieCharts/PieCharts";

class MyRecharts extends React.Component {
    static propTypes = {
        type: PropTypes.string,
        option: PropTypes.object
    };

    static defaultProps = {
        type: "line",
        option: {}
    };

    constructor() {
        super();
        this.state = {};
    }

    render() {
        const { type, option } = this.props;
        return (
            <div>
                {type === "line" ? <LineCharts option={option} /> : ""}
                {type === "bar" ? <BarCharts option={option} /> : ""}
                {type === "pie" ? <PieCharts option={option} /> : ""}
            </div>
        );
    }
}

export default MyRecharts;
