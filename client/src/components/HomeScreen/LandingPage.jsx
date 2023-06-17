import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidenav from './StructuringElements/SideBar';
import Popup from './ErrorSubmission/ErrorSubmision-popup';
import Header from './StructuringElements/Header';
import Footer from './StructuringElements/Footer';
import CustomError from './ErrorSelection/CustomErrors';
import SearchBar from './StructuringElements/SearchBar.jsx';
import { useEffect } from 'react';
import axios from 'axios';
import './styles.css';

function transformData(data) {
  const colors = {
    Assembly: "linear-gradient(to right, rgb(51, 51, 153, 1), rgb(51, 51, 153, 0))",
    Damage: "linear-gradient(to right, rgb(51, 51, 204, 1), rgb(51, 51, 204, 0))",
    Dimension: "linear-gradient(to right, rgb(51, 51, 255, 1), rgb(51, 51, 255, 0))",
    Surface: "linear-gradient(to right, rgb(51, 51, 102, 1), rgb(51, 51, 102, 0))",
  };

  return data.map(element => {
    let str = element.defect_type;
    let [type] = str.split(" ");
    let [type2] = type.split("/");

    switch (type2) {
      case "Assembly":
        element.color = colors.Assembly;
        break;
      case "Damage":
        element.color = colors.Damage;
        break;
      case "Dimension":
        element.color = colors.Dimension;
        break;
      case "Surface":
        element.color = colors.Surface;
        break;
    }

    return element;
  });
}


export default function LandingPage() {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState([0, 3, 6, 9]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isOpen, setBool] = useState(false);
  const [popupData, setPopupData] = useState(null); // State variable to store the item data


  // const defectTypeColors = {};

  // const getRandomColor = () => {
  //   const r = Math.floor(Math.random() * 256);
  //   const g = Math.floor(Math.random() * 256);
  //   const b = Math.floor(Math.random() * 256);
  //   return `linear-gradient(to right, rgb(${r},${g},${b}, 1), rgb(${r}, ${g}, ${b}, 0))`
  // };


  // data.forEach((item) => {
  //   item["color"] = defectTypeColors[item.defect_type] || (defectTypeColors[item.defect_type] = getRandomColor());
  // });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/home/defectlist');
        const filteredData = response.data.filter(item => item.product_id === 'CC RC Roof Panel Rem Lid 3dr');
        const transformedData = transformData(filteredData);
        setData(transformedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  

  const handleOpenPopup = (isOpen, item) => {
    setShowPopup(isOpen);
    setShowOverlay(isOpen);
    setPopupData(item);
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
        <Col style={{ paddingLeft: 24 }}
          className={
            isOpen
              ? 'd-flex flex-column align-items-stretch flex-shrink-2 col-22 transition-col'
              : 'd-flex flex-column align-items-stretch flex-shrink-2 col-24 transition-col'
          }>
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
                  <Popup onClose={handleClosePopup} popupData={popupData} />
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
            className="flex-grow-1 footer d-flex justify-content-evenly align-items-center"
            style={{ marginLeft: 20, marginRight: 20, padding: "3%" }}
          >
            {/* Footer returns two columns */}
            <Footer />
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
