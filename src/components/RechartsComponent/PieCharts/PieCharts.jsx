import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";

export default class PieCharts extends PureComponent {
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
    customizedLabel = (
        { cx, cy, midAngle, innerRadius, outerRadius, percent },
        labelColor,
        fontSize
    ) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
        const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

        return (
            <text
                dominantBaseline="central"
                fill={labelColor || "white"}
                fontSize={fontSize || 14}
                textAnchor={x > cx ? "start" : "end"}
                x={x}
                y={y}
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };
    pieLabel = label => {
        if (label) {
            if (label.position) {
                if (label.position === "out") {
                    return true;
                }
                return e =>
                    this.customizedLabel(e, label.color, label.fontSize);
            }
            return label;
        }
        if (label === false) {
            return false;
        }
        return e => this.customizedLabel(e);
    };
    render() {
        const {
            data,
            legend,
            pies,
            height,
            margin,
            width,
            toolTip,
            colors
        } = this.props.option;

        return (
            <PieChart
                height={height || 300}
                margin={margin || { top: 5, right: 5, bottom: 5, left: 5 }}
                width={width || 400}
            >
                {legend ? <Legend /> : ""}
                {toolTip === false ? "" : <Tooltip />}
                {pies && pies.length > 0
                    ? pies.map(item => (
                          <Pie
                              {...item}
                              key={item.value}
                              animationDuration={item.animationDuration || 500}
                              cx={item.cx || "50%"}
                              cy={item.cy || "50%"}
                              data={data}
                              dataKey={item.value}
                              innerRadius={item.innerRadius || 0}
                              isAnimationActive={!item.closeAnimation}
                              label={this.pieLabel(item.label)}
                              labelLine={item.labelLine || false}
                              nameKey={item.name || "name"}
                              onClick={e => item.onClick(e)}
                              outerRadius={item.outerRadius || "80%"}
                          >
                              {colors
                                  ? colors.map(cell => (
                                        <Cell
                                            key={`cell-${cell}`}
                                            fill={cell}
                                        />
                                    ))
                                  : ""}
                          </Pie>
                      ))
                    : ""}
            </PieChart>
        );
    }
}
