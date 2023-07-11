import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidenav from './StructuringElements/SideBar';
import Popup from './ErrorSubmission/ErrorSubmision-popup';
import Header from './StructuringElements/Header';
import Footer from './StructuringElements/Footer';
import CustomError from './ErrorSelection/CustomErrors';
import axios from 'axios';
import './styles.css';
import NewErrorPopup from "./ErrorSubmission/NewErrorPopup";

// Helper function to transform data and assign colors based on defect types
function transformData(data) {
  const colors = {
    Damage: 'linear-gradient(to right, rgb(255, 229, 43, 1), rgb(51, 51, 153, 0))',
    Assembly: 'linear-gradient(to right, rgb(208, 0, 230, 1), rgb(51, 51, 204, 0))',
    Surface: 'linear-gradient(to right, rgb(0, 176, 240, 1), rgb(51, 51, 255, 0))',
    Dimension: 'linear-gradient(to right, rgb(115, 178, 72, 1), rgb(51, 51, 102, 0))',
  };

  return data.map((element) => {
    let str = element.defect_type;
    let [type] = str.split(' ');
    let [type2] = type.split('/');

    // Assign color based on defect type
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
      default:
        console.log("Unknown Category")
    }

    return element;
  });
}

const productfilter = "CC RC Roof Panel Rem Lid 3dr";

const LandingPage = () => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 9,
  });
  const [showOverlay, setShowOverlay] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isOpen, setBool] = useState(false);
  const [popupData, setPopupData] = useState(null);
  const [errorCounts, setErrorCounts] = useState({});
  const [combinedData, setCombinedData] = useState([]);
  const [isNewErrorPopupOpen, setIsNewErrorPopupOpen] = useState(false);

  const secondSectionItemsPerPage = 6;

  // Open new error popup
  const openNewErrorPopup = () => {
    console.log(isNewErrorPopupOpen)
    setIsNewErrorPopupOpen(!isNewErrorPopupOpen);
    console.log(isNewErrorPopupOpen)
  };


  // Combine data to display frequent defects based on error counts
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

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/home/defectlist');
        const filteredData = response.data.filter((item) => item.product_id === productfilter);
        const transformedData = transformData(filteredData);
        setData(transformedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Fetch defect data and count error codes
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
            defect.product_id === productfilter &&
            new Date(defect.date) >= lastWeekDate &&
            new Date(defect.date) <= currentDate
        );

        const counts = countErrorCodes(filteredDefectData);
        setErrorCounts(counts);
      } catch (error) {
        console.error('Error fetching defect data:', error);
      }
    };

    fetchDefectData();
  }, []);

  // Handle opening the popup
  const handleOpenPopup = (isOpen, item) => {
    setShowPopup(isOpen);
    setShowOverlay(isOpen);
    setPopupData(item);
  };

  // Handle closing the popup
  const handleClosePopup = () => {
    setShowPopup(false);
    setShowOverlay(false);
  };

  // Handle child state change
  const handleChildStateChange = (currentBool) => {
    setBool(currentBool);
  };

  // Handle page change
  const handlePageChange = (page) => {
    let itemsPerPage = pagination.itemsPerPage; // Use the default itemsPerPage value
    if (combinedData.length > 0) {
      itemsPerPage = 6; // Set itemsPerPage to 6 for the second section
    }
    const totalPages = Math.ceil(combinedData.length / itemsPerPage);
    if (page < 1) {
      page = 1;
    } else if (page > totalPages) {
      page = totalPages;
    }
    setPagination((prevPagination) => ({
      ...prevPagination,
      currentPage: page,
    }));
  };

  const firstSectionItemsPerPage = 9;
  const firstSectionTotalPages = Math.ceil(data.length / firstSectionItemsPerPage);
  const firstSectionCurrentPageData = data.slice(
    (pagination.currentPage - 1) * firstSectionItemsPerPage,
    pagination.currentPage * firstSectionItemsPerPage
  );

  const secondSectionTotalPages = Math.ceil(combinedData.length / secondSectionItemsPerPage);
  const secondSectionCurrentPageData = combinedData.slice(
    (pagination.currentPage - 1) * secondSectionItemsPerPage,
    pagination.currentPage * secondSectionItemsPerPage
  );



  return (
    <Container fluid>
      <Row className="d-flex w-100">
        {/* Overlay */}
        {showOverlay && <div className="overlay"></div>}

        {/* SideNav */}
        <Sidenav onChildStateChange={handleChildStateChange} />

        <Col
          style={{ paddingLeft: 24 }}
          className={`d-flex flex-column align-items-stretch flex-shrink-2 col-${isOpen ? '22' : '24'} transition-col`}
        >
          <Row>
            {/* Header */}
            <Header />
          </Row>

          {/* Errors Section */}
          <Row className="flex-grow-1 justify-content-center">
            <Col className="">
              {/* Section 1 */}
              <Row style={{ marginTop: '3%' }}>
                <Col>
                  <span className="font">Defect List Items</span>
                </Col>
                <Col style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <span className="pagination">
                    {pagination.currentPage} / {firstSectionTotalPages}
                  </span>
                </Col>
              </Row>
              {firstSectionCurrentPageData.length === 0 ? (
                <Row className="d-flex align-items-center justify-content-center">
                  no items yet
                </Row>
              ) : (
                <Row className="gap-1 justify-content-evenly">
                  {firstSectionCurrentPageData.map((item) => (
                    <CustomError
                      key={item.error_code}
                      item={item}
                      togglePopup={handleOpenPopup}
                    />
                  ))}
                </Row>
              )}

              {/* Render the NEW error popup conditionally */}
              {isNewErrorPopupOpen && (
                <>
                  <div className="overlay" onClick={handleClosePopup}></div>
                  <>
                   <NewErrorPopup
                      onClose={openNewErrorPopup}
                   />
                  </>
                </>
              )}

              {/* Render the error popup conditionally */}
              {showPopup && (
                  <>
                    <div className="overlay" onClick={handleClosePopup}></div>
                        <>
                          <Popup
                              onClose={handleClosePopup}
                              popupData={popupData}
                          />
                        </>
                    )
                  </>
              )}

              {/* Section 2 */}
              <Row>
                <Col>
                  <Row style={{ marginTop: '3%' }}>
                    <Col>
                      <span className="font">Frequent Events</span>
                    </Col>
                    <Col style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <span className="pagination">
                        {pagination.currentPage} / {secondSectionTotalPages}
                      </span>
                    </Col>
                  </Row>
                  {secondSectionCurrentPageData.length === 0 ? (
                    <Row className="d-flex align-items-center justify-content-center">
                      no items yet
                    </Row>
                  ) : (
                    <Row className="gap-1 justify-content-evenly">
                      {secondSectionCurrentPageData.map((item) => (
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

          {/* Footer */}
          <Row className="flex-grow-1 footer d-flex justify-content-evenly align-items-center" style={{ marginLeft: 20, marginRight: 20 }}>
            <Footer
              handlePageChange={handlePageChange}
              pagination={pagination}
              totalPages={firstSectionTotalPages}
              openPopup={openNewErrorPopup}
            />
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default LandingPage;
