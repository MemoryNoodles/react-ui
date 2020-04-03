import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

export default class BarCharts extends PureComponent {
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

    customizedLabel = (e, labelColor, fontSize, onClick) => {
        const { x, y, value } = e;
        return (
            <text
                dy={-8}
                fill={labelColor}
                fontSize={fontSize || 14}
                onClick={() => onClick()}
                style={onClick ? { cursor: "pointer" } : {}}
                textAnchor="middle"
                x={x}
                y={y}
            >
                {value}
            </text>
        );
    };
    render() {
        const {
            data,
            x,
            y,
            legend,
            bars,
            height,
            margin,
            width,
            grid,
            toolTip,
            dataKey
        } = this.props.option;
        return (
            <BarChart
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
                {legend ? <Legend {...legend} /> : ""}
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
                {bars && bars.length > 0
                    ? bars.map(item => (
                          <Bar
                              key={item.value}
                              animationDuration={item.animationDuration || 500}
                              dataKey={item.value}
                              fill={item.bar ? item.bar.barColor : "#465fdd"}
                              isAnimationActive={!item.closeAnimation}
                              label={
                                  item.label
                                      ? {
                                            position:
                                                item.label.position || "top",
                                            fill: item.label.color || "#666",
                                            ...item.label
                                        }
                                      : false
                              }
                              name={item.name}
                              onClick={e =>
                                  item.onClick ? item.onClick(e) : {}
                              }
                              {...item}
                          />
                      ))
                    : ""}
            </BarChart>
        );
    }
}
