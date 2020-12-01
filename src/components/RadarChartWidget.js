import React, { PureComponent } from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';


export default class RadarChartWidget extends PureComponent {

  defaultGraphData = [
    {subject: 'German', A: 0, B: 0, fullMark: 150},
    {subject: 'English', A: 0, B: 0, fullMark: 150},
    {subject: 'Russian', A: 0, B: 0, fullMark: 150},
    {subject: 'Chinise', A: 0, B: 0, fullMark: 150},
    {subject: 'Spanish', A: 0, B: 0, fullMark: 150},
    {subject: 'Arabic', A: 0, B: 0, fullMark: 150},
]

  render() {
    return (
        // w: 500 h: 500
      <RadarChart
        cx={220}
        cy={180}
        outerRadius={150}
        width={this.props.width}
        height={this.props.height}
        data={this.props.graphData === null ? this.defaultGraphData : this.props.graphData}
      >
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis />
        <Radar name="Mike" dataKey="A" stroke="rgb(97, 160, 17)" fill="rgb(97, 160, 17, 0.6)" fillOpacity={0.6} />
      </RadarChart>
    );
  }
}
