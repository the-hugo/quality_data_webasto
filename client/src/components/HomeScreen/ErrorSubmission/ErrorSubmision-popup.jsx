import React, { useState, useEffect } from 'react';
import { FaTimes, FaMapMarkerAlt } from 'react-icons/fa';
import ImageMap from './ImageMap';

const Popup = ({ onClose, popupData }) => {
  const [showPopup1, setShowPopup1] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const [showPopup3, setShowPopup3] = useState(false);
  const [showMapPopup, setShowMapPopup] = useState(false);


  const handleButtonClick = async (actionType) => {
    try {
      const data = {
        serial_num: '123456',
        personal_id: '6661',
        description: 'Das Teil ist Banane',
        action_type: actionType,
        category: 'Scratch',
      };

      const response = await fetch('http://localhost:8080/home/defects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log(`Button ${actionType} clicked successfully`);
        // Show the success popup based on the action type
        if (actionType === 'Anomaly') {
          setShowPopup1(true);
        } else if (actionType === 'Rework') {
          setShowPopup2(true);
        } else if (actionType === 'Scrap') {
          setShowPopup3(true);
        }
      } else {
        console.error(`Failed to click Button ${actionType}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleClosePopup = (popupNumber) => {
    if (popupNumber === 1) {
      setShowPopup1(false);
    } else if (popupNumber === 2) {
      setShowPopup2(false);
    } else if (popupNumber === 3) {
      setShowPopup3(false);
    }
    onClose();
  };

  const handleOpenMapPopup = () => {
    setShowMapPopup(true);
  };

  const handleCloseMapPopup = () => {
    setShowMapPopup(false);
  };

  const PopupComponent = ({ popupNumber, message }) => (
    <div className={`popup${popupNumber}`}>
      <div className={`popup${popupNumber}-content`}>
        <div className={`popup${popupNumber}-close`} onClick={() => handleClosePopup(popupNumber)}>
          <FaTimes />
        </div>
        <div className={`popup${popupNumber}-message`}>{message}</div>
      </div>
    </div>
  );

  useEffect(() => {
    if (popupData) {
      console.log('Received popup data:', popupData);
      // Additional processing or checks can be performed here
    }
  }, [popupData]);

  return (
    <div className="popup">
      <div className="popup-content">
        <div className={'title-container'}>
          <h3 className="popup-title">SELECTED</h3>
          <div className="circle-button" onClick={handleOpenMapPopup}>
            <FaMapMarkerAlt style={{ color: 'azure' }} />
          </div>
        </div>
        <div className={'issue-element-display'}>
  <p className={'issue-location'}>{popupData.error_code}</p>
  <div className={'issue-definition-area'}>
    <p className={'issue-name'}>{popupData.error}</p>
    <p className={'issue-type'}>{popupData.defect_type}</p>
  </div>
</div>
        <div className="button-container">
          <button onClick={() => handleButtonClick('Anomaly')}>Anomaly</button>
          <button onClick={() => handleButtonClick('Rework')}>Rework</button>
          <button onClick={() => handleButtonClick('Scrap')}>Scrap</button>
        </div>
      </div>

      <button className="close-button" onClick={handleClosePopup}>
        <FaTimes style={{ fontSize: '1.3em' }} />
      </button>

      {showPopup1 && <PopupComponent popupNumber={1} message="Successfully Submitted" />}
      {showPopup2 && <PopupComponent popupNumber={2} message="Successfully Submitted" />}
      {showPopup3 && <PopupComponent popupNumber={3} message="Successfully Submitted" />}
      
      {showMapPopup && (
        <div className="map-popup">
          <div className="map-popup-content">
            <div className="image-map">
              <ImageMap />
            </div>
            <button className="map-close" onClick={handleCloseMapPopup}>
              <FaTimes />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;
