import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

export default class LineCharts extends PureComponent {
    static propTypes = {
        option: PropTypes.object
    };

    static defaultProps = {
        option: {}
    };
    constructor() {
        super();
        this.state = {};
    }

    customizedLabel = (e, label) => {
        const { x, y, value } = e;
        return (
            <text
                dy={-8}
                fill={label.color}
                fontSize={label.fontSize || 14}
                textAnchor="middle"
                x={x}
                y={y}
            >
                {value}
            </text>
        );
    };
    onClick = () => {};
    render() {
        const {
            data,
            x,
            y,
            legend,
            lines,
            height,
            margin,
            width,
            grid,
            toolTip,
            dataKey
        } = this.props.option;
        return (
            <LineChart
                {...this.props}
                data={data}
                height={height || 400}
                margin={margin || { top: 5, right: 5, bottom: 5, left: 5 }}
                width={width || 600}
            >
                {x === false ? (
                    ""
                ) : (
                    <XAxis {...x} dataKey={dataKey || "name"} />
                )}
                {legend ? <Legend /> : ""}
                {y === false ? "" : <YAxis {...y} />}
                {grid ? (
                    <CartesianGrid
                        {...grid}
                        horizontal={grid.x}
                        vertical={grid.y}
                    />
                ) : (
                    ""
                )}
                {toolTip === false ? "" : <Tooltip {...toolTip} />}
                {lines && lines.length > 0
                    ? lines.map(item => (
                          <Line
                              {...item}
                              key={item.value}
                              activeDot={item.activeDot || {
                                  r: item.r || 3,
                                  onClick: e =>
                                      item.onClick ? item.onClick(e) : {}
                              }}
                              animationDuration={item.animationDuration || 500}
                              dataKey={item.value}
                              dot={
                                  item.dot === false
                                      ? false : item.dot ||
                                       {
                                            r: item.r || 3,
                                            onClick: e =>
                                                item.onClick
                                                    ? item.onClick(e)
                                                    : {}
                                        }
                              }
                              label={
                                  item.label
                                      ? e => this.customizedLabel(e, item.label)
                                      : ""
                              }
                              name={item.name}
                              stroke={item.lineColor || "#465fdd"}
                              type="monotone"
                          />
                      ))
                    : ""}
            </LineChart>
        );
    }
}
