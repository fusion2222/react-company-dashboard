import React, { PureComponent } from 'react';
import {
    LineChart, XAxis, YAxis, Line, CartesianGrid, Tooltip, Legend
} from 'recharts';

export default class LineChartWidget extends PureComponent {

  defaultGraphData = [
    {name: 'Automobiles', America: 0, Europe: 0, amt: 500},
    {name: 'Electronics', America: 0, Europe: 0, amt: 500},
    {name: 'Tools', America: 0, Europe: 0, amt: 500},
    {name: 'Construction', America: 0, Europe: 0, amt: 500},
  ]

    render() {
      return (
        <LineChart
          width={this.props.width} // 500
          height={this.props.height} // 300
          data={this.props.graphData === null ? this.defaultGraphData : this.props.graphData}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="America" stroke="#FF8042" activeDot={{ r: 4 }} />
          <Line type="monotone" dataKey="Europe" stroke="rgb(97, 160, 17)" />
        </LineChart>
      );
    }
  }