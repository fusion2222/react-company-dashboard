import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";


export default class ColumnChartWidget extends PureComponent {

  defaultGraphData = [
    // Initial data
    { name: 'HR', n: 0, c: 0, amt: 30 },
    { name: 'Tech', n: 0, c: 0, amt: 30 },
    { name: 'Management', n: 0, c: 0, amt: 30 },
    { name: 'Marketing', n: 0, c: 0, amt: 30 },
  ]
  
  render() {
    return (
      <div>
        <BarChart
          width={this.props.width} // 400
          height={this.props.height} // 350
          data={this.props.graphData === null ? this.defaultGraphData : this.props.graphData}
          margin={{ left: 15, top: 5, bottom: 5, right: 15 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip cursor={{ fill: "rgba(256, 256, 256, 0.6)" }} />
          <Legend />
          <Bar dataKey="n" fill="#61a011" name="New" />
          <Bar dataKey="c" fill="#eac354" name="Completed" />
        </BarChart>
      </div>
    );
  }
}
