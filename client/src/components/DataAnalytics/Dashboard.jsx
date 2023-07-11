import React, { useState } from 'react';
import { Card, Col, Row } from 'antd';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import MasterBar from './Structuring_Elements_Analytics/MasterBar.jsx';
import Heatmap from './Structuring_Elements_Analytics/Heatmap.jsx';
import HeatmapGrid from './Structuring_Elements_Analytics/HeatmapGrid.jsx';
import './Dashboard.css';

const data = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  // Add more data points as needed
];

const Dashboard = () => {
  const [locationIds, setLocationIds] = useState([]);

  return (
    <div className="site-card-wrapper">
      <Col span={24}>
        <MasterBar setLocationIds={setLocationIds} />
      </Col>

      <Row gutter={16}>
        <Col span={8}>
          <Card title="Heatmap Exact Location" bordered={true}>
            <Heatmap locationIds={locationIds} />
          </Card>
          <Card title="Line Chart 1" bordered={true}>
            <div className="chart-container">
              <LineChart
                width={400}
                height={280}
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="pv"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
              </LineChart>
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Heatmap Grid Locations" bordered={true}>
            <HeatmapGrid locationIds={locationIds} />
          </Card>
          <Card title="Line Chart 2" bordered={true}>
            <div className="chart-container">
              <LineChart
               width={400}
               height={280}
               data={data}
               margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
             >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="pv"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
              </LineChart>
            </div>
          </Card>
        </Col>
        <Col span={5}>
          <Card
            title={
              <div className="ant-card-head-title">
                <h2>Most Product Defects</h2>
              </div>
            }
            bordered={true}
            style={{ width: '300px', height: '200px' }}
            className="kpi-card"
          >
            <p className="text-item">Sample Text 1</p>
          </Card>

          <Card
            title={
              <div className="ant-card-head-title">
                <h2>Most Category Defects</h2>
              </div>
            }
            bordered={true}
            className="kpi-card"
          >
            <p className="text-item">Sample Text 2</p>
          </Card>
          <Card
            title={
              <div className="ant-card-head-title">
                <h2>Most Error-Types Recorded</h2>
              </div>
            }
            bordered={true}
            className="kpi-card"
          >
            <p className="text-item">Sample Text 3</p>
          </Card>
          <Card
            title={
              <div className="ant-card-head-title">
                <h2>KPI 4 Header</h2>
              </div>
            }
            bordered={true}
            className="kpi-card"
          >
            <p className="text-item">Sample Text 4</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
