import React, { PureComponent } from 'react';
import {
  PieChart, Pie, Cell, Legend, Tooltip
} from 'recharts';

const data = [
  { name: 'German', value: 42 },
  { name: 'Turkish', value: 23 },
  { name: 'Egyptian', value: 25 },
  { name: 'Russian', value: 10 },
];

const COLORS = ['#0088FE', 'silver', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default class PieChartWidget extends PureComponent {

  defaultData = [{name: 'No data', value: 100}];

  render() {
    return (
        // w: 400 h: 400
      <PieChart width={this.props.width} height={this.props.height}>
        <Pie
          data={this.props.graphData === null ? this.defaultData : this.props.graphData}
          cx={220}
          cy={180}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {
            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
        </Pie>
        <Tooltip cursor={{ fill: 'rgba(256, 256, 256, 0.6)' }} />
        <Legend />
      </PieChart>
    );
  }
}
