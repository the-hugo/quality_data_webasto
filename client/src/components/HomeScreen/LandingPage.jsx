import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidenav from './StructuringElements/SideBar';
import Popup from './ErrorSubmission/ErrorSubmision-popup';
import Header from './StructuringElements/Header';
import Footer from './StructuringElements/Footer';
import CustomError from './ErrorSelection/CustomErrors';
// import SearchBar from './StructuringElements/SearchBar.jsx';
import axios from 'axios';
import './styles.css';

function transformData(data) {
  const colors = {
    Assembly:
      'linear-gradient(to right, rgb(51, 51, 153, 1), rgb(51, 51, 153, 0))',
    Damage:
      'linear-gradient(to right, rgb(51, 51, 204, 1), rgb(51, 51, 204, 0))',
    Dimension:
      'linear-gradient(to right, rgb(51, 51, 255, 1), rgb(51, 51, 255, 0))',
    Surface:
      'linear-gradient(to right, rgb(51, 51, 102, 1), rgb(51, 51, 102, 0))',
  };

  return data.map((element) => {
    let str = element.defect_type;
    let [type] = str.split(' ');
    let [type2] = type.split('/');

    switch (type2) {
      case 'Assembly':
        element.color = colors.Assembly;
        break;
      case 'Damage':
        element.color = colors.Damage;
        break;
      case 'Dimension':
        element.color = colors.Dimension;
        break;
      case 'Surface':
        element.color = colors.Surface;
        break;
    }

    return element;
  });
}
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

export default function LandingPage() {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 9,
  });
  const [showOverlay, setShowOverlay] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupButtonClick, setPopupButtonClick] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [isOpen, setBool] = useState(false);
  const [popupData, setPopupData] = useState(null); // State variable to store the item data
  const [errorCounts, setErrorCounts] = useState({}); // State variable to store error counts
  const [combinedData, setCombinedData] = useState([]);

  // COMBINING DATA IN ORDER TO DISPLAY THE QUICK DEFECTS BASED ON THE COUNT OF DEFECTS OF A ERROR
  useEffect(() => {
    const combineData = () => {
      const combinedData = data
        .map((defect) => {
          const errorNumber = defect.error_code;
          const count = errorCounts[errorNumber] || 0;

          return {
            ...defect,
            count: count,
          };
        })
        .filter((defect) => defect.count !== 0)
        .sort((a, b) => b.count - a.count); // Sort by count in descending order

      setCombinedData(combinedData);
    };

    combineData();
  }, [data, errorCounts]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/home/defectlist'
        );
        const filteredData = response.data.filter(
          (item) => item.product_id === 'CC RC Roof Panel Rem Lid 3dr'
        );
        const transformedData = transformData(filteredData);
        setData(transformedData);
        console.log('Master List Data:', transformedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const countErrorCodes = (defectData) => {
      const counts = {};
      defectData.forEach((defect) => {
        const errorCode = defect.error_code;
        counts[errorCode] = (counts[errorCode] || 0) + 1;
      });

      return counts;
    };

    const fetchDefectData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/home/defects');
        const currentDate = new Date();
        const lastWeekDate = new Date();
        lastWeekDate.setDate(lastWeekDate.getDate() - 7);

        const filteredDefectData = response.data.filter(
          (defect) =>
            defect.product_id === 'CC RC Roof Panel Rem Lid 3dr' &&
            //Filter for week
            //new Date(defect.date) >= lastWeekDate &&
            //new Date(defect.date) <= currentDate

            //FIlter for date
            new Date(defect.date).toDateString() === currentDate.toDateString()
        );

        const counts = countErrorCodes(filteredDefectData);
        setErrorCounts(counts);
        console.log('Error Counts:', counts);
      } catch (error) {
        console.error('Error fetching defect data:', error);
      }
    };

    fetchDefectData();
  }, []);

  console.log('Combined Data:', combinedData);

  const handleOpenPopup = (isOpen, item) => {
    setShowPopup(isOpen);
    setShowOverlay(isOpen);
    setPopupData(item);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setShowOverlay(false);
    setPopupButtonClick(true);

  };

  const handleChildStateChange = (currentBool) => {
    setBool(currentBool);
  };

  const handlePageChange = (page) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      currentPage: page,
    }));
  };

  const itemsPerPage = pagination.itemsPerPage;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentPageData = data.slice(
    (pagination.currentPage - 1) * itemsPerPage,
    pagination.currentPage * itemsPerPage
  );

  return (
    <Container fluid>
      <Row className="d-flex w-100">
        {/* Overlay */}
        {showOverlay && <div className="overlay"></div>}

        {/* SideNav is wrapped in a Col */}
        <Sidenav onChildStateChange={handleChildStateChange} />
        <Col
          style={{ paddingLeft: 24 }}
          className={
            isOpen
              ? 'd-flex flex-column align-items-stretch flex-shrink-2 col-22 transition-col'
              : 'd-flex flex-column align-items-stretch flex-shrink-2 col-24 transition-col'
          }
        >
          <Row>
            {/* Header returns two cols */}
            <Header pagination={pagination} />
          </Row>
          <Row>
            <Col
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <span className="pagination">
                {pagination.currentPage} / {totalPages}
              </span>
            </Col>
          </Row>
          {/* SearchBar 
          <Row>
            <Col>
              <SearchBar />
            </Col>
          </Row>
        */}
          {/* Errors Here */}
          <Row className="flex-grow-1 justify-content-center">
            <Col className="">
              {currentPageData.length > 0 && (
                <Row className="gap-1 justify-content-evenly">
                  {currentPageData.map((item) => (
                    <CustomError
                      key={item.error_code}
                      item={item}
                      togglePopup={handleOpenPopup}
                    />
                  ))}
                </Row>
              )}

              {/* Render the pop-up conditionally */}
              {showPopup && (
                  <>
                    <div className="overlay" onClick={handleClosePopup}></div>
                    {popupButtonClick ? (
                        // Render the popup component with a conditional statement
                        <>
                          <Popup
                              onClose={handleClosePopup}
                              popupData={popupData}
                              setButtonClicked={setButtonClicked} // Make sure to pass the setButtonClicked prop
                          />
                          {setPopupButtonClick(false)}
                        </>
                    ) : (
                        <Popup
                            onClose={handleClosePopup}
                            popupData={popupData}
                            setButtonClicked={setButtonClicked} // Make sure to pass the setButtonClicked prop
                        />
                    )}
                  </>
              )}
              <Row>
                <Col>
                  <Row style={{ marginTop: '3%' }}>
                    <Col>
                      <span className="font">FREQUENT EVENTS</span>
                    </Col>
                    <Col
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                      }}
                    >
                      <span className="pagination">
                        {pagination.currentPage} / {totalPages}
                      </span>
                    </Col>
                  </Row>
                  {combinedData.length === 0 && (
                    <Row className="d-flex align-items-center justify-content-center">
                      no items yet
                    </Row>
                  )}
                  {combinedData.length > 0 && (
                    <Row className="gap-1 justify-content-evenly">
                      {combinedData.map((item) => (
                        <CustomError
                          key={item.error_code}
                          item={{ ...item, error_code: item.count }} // Replace error_code with count
                          togglePopup={handleOpenPopup}
                        />
                      ))}
                    </Row>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row
            className="flex-grow-1 footer d-flex justify-content-evenly align-items-center"
            style={{ marginLeft: 20, marginRight: 20 }}
          >
            <Footer />
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
