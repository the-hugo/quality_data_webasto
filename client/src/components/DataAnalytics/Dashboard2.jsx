import React from 'react';
import { Card, Col, Row } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import MasterBar from './Structuring_Elements_Analytics/MasterBar';
import Heatmap from './Heatmap';
import HeatmapGrid from './HeatmapGrid';
import './Dashboard2.css';


const data = [
  {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
  {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
  {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
  // Add more data points as needed
];

const Dashboard2 = () => {
  return (
    <div className="site-card-wrapper">
      <row><MasterBar /> {/* Use MasterBar component here */}</row>
      <Row gutter={16}>
        <Col span={12}>
          <Card title="Heatmap Exact Location" bordered={true}>
            <Heatmap /> {/* Add Heatmap component here */}
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Heatmap Grid Locations" bordered={true}>
            <HeatmapGrid /> {/* Add HeatmapGrid component here */}
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Card title="Random Chart" bordered={true}>
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard2;
