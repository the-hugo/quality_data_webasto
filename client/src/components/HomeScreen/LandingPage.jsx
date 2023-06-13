import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidenav from './StructuringElements/SideBar';
import Popup from './ErrorSubmission/ErrorSubmision-popup';
import Header from './StructuringElements/Header';
import Clock from './StructuringElements/Clock';
import Footer from './StructuringElements/Footer';
import ArrowRight from './StructuringElements/ArrowRight';
import ArrowLeft from './StructuringElements/ArrowLeft';
import CustomError from './ErrorSelection/CustomErrors';
import SearchBar from './StructuringElements/SearchBar.jsx';
import { useEffect } from 'react';
import axios from 'axios';
import './styles.css';

export default function LandingPage() {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState([0, 3, 6, 9]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isOpen, setBool] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/home/defectlist'
        );
        const filteredData = response.data.filter(
          (item) => item.product_id === 'CC RC Roof Panel Rem Lid 3dr'
        );
        console.log('Filtered data:', filteredData); // Check the filtered data
        filteredData.forEach((item) => console.log('Item error:', item.error)); // Log the item.error
        setData(filteredData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  const back = () => {
    setPagination([0, 3, 6, 9]);
    console.log(pagination[2]);
  };

  const forward = () => {
    setPagination([9, 12, 15, 18]);
    console.log(pagination[2]);
  };

  const handleOpenPopup = (isOpen) => {
    setShowPopup(isOpen);
    setShowOverlay(isOpen);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setShowOverlay(false);
  };

  const handleChildStateChange = (currentBool) => {
    setBool(currentBool);
  };

  return (
    <Container fluid>
      <Row className="d-flex w-100">
        {/* Overlay */}
        {showOverlay && <div className="overlay"></div>}

        {/* SideNav is wrapped in a Col */}
        <Sidenav onChildStateChange={handleChildStateChange} />

        {/* Left arrow */}
        <Col className="col-1">
          <Row className="h-100 flex-column">
            <div style={{ paddingLeft: 0, marginTop: '24.81%' }}></div>
            <Col
              className="d-flex flex-column justify-content-center align-items-center"
              style={{ paddingRight: 0 }}
            >
              <div onClick={back}>
                <ArrowLeft />
              </div>
            </Col>
          </Row>
        </Col>
        <Col
          className={
            isOpen
              ? 'd-flex flex-column align-items-stretch flex-shrink-2 col-9'
              : 'd-flex flex-column align-items-stretch flex-shrink-2 col-8'
          }
        >
          <Row>
            {/* Header returns two cols */}
            <Header pagination={pagination} />
          </Row>
          {/* SearchBar */}
          <Row>
            <Col>
              <SearchBar />
            </Col>
          </Row>

          {/* Errors Here */}
          <Row className="flex-grow-1 justify-content-center">
            <Col className="">
              <Row className="gap-1 justify-content-evenly">
                {data.slice(pagination[0], pagination[1]).map((item) => (
                  <CustomError
                    key={item.error_code}
                    item={item}
                    togglePopup={handleOpenPopup}
                  />
                ))}
              </Row>
              <Row className="gap-1 justify-content-evenly">
                {data.slice(pagination[1], pagination[2]).map((item) => (
                  <CustomError
                    key={item.error_code}
                    item={item}
                    togglePopup={handleOpenPopup}
                  />
                ))}
              </Row>
              <Row className="gap-1 justify-content-evenly">
                {data.slice(pagination[2], pagination[3]).map((item) => (
                  <CustomError
                    key={item.error_code}
                    item={item}
                    togglePopup={handleOpenPopup}
                  />
                ))}
              </Row>
              {/* <ImageMap /> */}
              {/* Render the pop-up conditionally */}
              {showPopup && (
                <>
                  <div className="overlay" onClick={handleClosePopup}></div>
                  <Popup onClose={handleClosePopup} />
                </>
              )}
              <Row>
                <Col>
                  <Row style={{ marginTop: '3%' }}>
                    <Col>
                      <span className="font">FREQUENT EVENTS</span>
                    </Col>
                    <Col
                      style={{ display: 'flex', justifyContent: 'flex-end' }}
                    >
                      <span className="pagination">
                        {pagination[0] === 0 ? '01 / 02' : '02 / 02'}
                      </span>
                    </Col>
                  </Row>
                  <Row className="d-flex align-items-center justify-content-center"></Row>
                  <Row className="d-flex align-items-center justify-content-center">
                    no items yet
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row
            className="gap-3 flex-grow-1 footer d-flex justify-content-center"
            style={{ marginLeft: 20, marginRight: 20, maxHeight: 120 }}
          >
            {/* Footer returns two columns */}
            <Footer />
          </Row>
        </Col>
        <Col className="col-1">
          <Row className="h-100 flex-column">
            <div
              style={{
                marginTop: 6,
                textAlign: 'right',
                paddingLeft: 0,
                paddingRight: 0,
              }}
            >
              <Clock />
            </div>
            <Col
              className="d-flex flex-column justify-content-center align-items-center"
              style={{ paddingRight: 0 }}
            >
              <div onClick={forward}>
                <ArrowRight />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
