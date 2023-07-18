import React, { useState } from 'react';
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
          className={`d-flex flex-column align-items-stretch col-${isOpen ? '22' : '24'}`}>
          <Row style={{ position: 'sticky', top: 0, zIndex: 999 }}>
            <Col>
              <MasterBar setLocationIds={setLocationIds} passFilteredData={setFilteredData} />
            </Col>
          </Row>
          <Row>
            <Col className="d-flex align-items-center justify-content-center" style={{ marginBottom: 20 }}>
              <Heatmap locationIds={locationIds} />
            </Col>
            <Col className="d-flex align-items-center justify-content-center" style={{ marginBottom: 20 }}>
              <HeatmapGrid locationIds={locationIds} />
            </Col>
          </Row>
          <Row>
            <Col className="d-flex align-items-center justify-content-center" style={{ marginBottom: 20 }}>
              <Timeseries filteredData={filteredData} />
            </Col>
            <Col className="d-flex align-items-center justify-content-center">
              <BarChart filteredData={filteredData} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
