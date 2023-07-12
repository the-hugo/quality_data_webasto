import React, { useState } from 'react';
import { Card } from 'antd';
import MasterBar from './Structuring_Elements_Analytics/MasterBar.jsx';
import Heatmap from './Structuring_Elements_Analytics/Heatmap.jsx';
import HeatmapGrid from './Structuring_Elements_Analytics/HeatmapGrid.jsx';
import Sidenav from '../HomeScreen/StructuringElements/SideBar.jsx';
import Timeseries from './Structuring_Elements_Analytics/TimeSeries.jsx';
import BarChart from './Structuring_Elements_Analytics/BarChart.jsx';
import { Container, Row, Col } from 'react-bootstrap';
import './Dashboard.css';

const Dashboard = () => {
  const [locationIds, setLocationIds] = useState([]);
  const [isOpen, setBool] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const handleChildStateChange = (currentBool) => {
    setBool(currentBool);
  };

  return (
    <Container fluid>
      <Row>
        <Sidenav onChildStateChange={handleChildStateChange} />
        <Col
          style={{ paddingLeft: 24 }}
          className={`d-flex flex-column align-items-stretch flex-shrink-2 col-${isOpen ? '22' : '24'} transition-col`}
        >
          <Row>
            <MasterBar setLocationIds={setLocationIds} passFilteredData={setFilteredData} />
          </Row>
          <Row>
            <Col>
              {/* Heatmap */}
              <Card title="Heatmap Exact Location" bordered={true}>
                <Heatmap locationIds={locationIds} />
              </Card>
            </Col>
            <Col>
              {/* Exact Heatmap */}
              <Card title="Heatmap Grid Locations" bordered={true}>
                <HeatmapGrid locationIds={locationIds} />
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Timeseries filteredData={filteredData}></Timeseries>
            </Col>
            <Col>
              <BarChart></BarChart>
            </Col>
          </Row>
        </Col>

        <Col>

        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
