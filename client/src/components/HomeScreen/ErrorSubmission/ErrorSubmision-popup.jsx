import React, { useState, useEffect } from 'react';
import { FaTimes, FaMapMarkerAlt } from 'react-icons/fa';
import ImageMap from './ImageMap';
import './popup.css';

const Popup = ({ onClose, popupData, setButtonClicked, /* setShowMainPopup */ }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupStyle, setPopupStyle] = useState('');
  const [showMapPopup, setShowMapPopup] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false); // Track whether any popup is currently visible
  const [isButtonsPopupShown, setIsButtonsPopupShown] = useState(true); // Track whether the buttons popup has been shown



  const handleButtonClick = async (actionType) => {
    try {
      const data = {
        serial_num: '123456',
        product_id: 'CC RC Roof Panel Rem Lid 3dr',
        category: popupData.defect_type,
        description: "",
        action_type: actionType,
        error_code: popupData.error_code,
        error_type: popupData.error,
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
        setButtonClicked(true);
        setShowPopup(true);
        setIsPopupVisible(true); // Set isPopupVisible to true
        setIsButtonsPopupShown(false); // Set isButtonsPopupShown to false

        // Set the popup style based on the action type
        if (actionType === 'Anomaly') {
          setPopupStyle('popup1');
        } else if (actionType === 'Rework') {
          setPopupStyle('popup2');
        } else if (actionType === 'Scrap') {
          setPopupStyle('popup3');
        }
      }
      else {
        console.error(`Failed to click Button ${actionType}`);
      }


    } catch (error) {
      console.error('Error:', error);
    }
  };

  /*
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
*/

useEffect(() => {
  let timer;
  if (showPopup) {
    timer = setTimeout(() => {
      setShowPopup(false);
    }, 1000);
  }
  return () => {
    clearTimeout(timer);
  };
}, [showPopup]);



const handleClosePopup = () => {
  setShowPopup(false);
  setIsPopupVisible(false); // Set isPopupVisible to false
  onClose();
};


  const handleOpenMapPopup = () => {
    setShowMapPopup(true);
  };

  const handleCloseMapPopup = () => {
    setShowMapPopup(false);
  };

  const PopupComponent = ({ className, message }) => (
    <div className={className}>
      <div className={`${className}-content`}>
        <div className={`${className}-close`} onClick={handleClosePopup}>
          <FaTimes />
        </div>
        <div className={`${className}-message`}>{message}</div>
      </div>
    </div>
  );


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
          <button className={'anomaly-button'} onClick={() => handleButtonClick('Anomaly')}>Anomaly</button>
          <button className={'rework-button'} onClick={() => handleButtonClick('Rework')}>Rework</button>
          <button className={'scrap-button'} onClick={() => handleButtonClick('Scrap')}>Scrap</button>
        </div>
      </div>

      <button className="close-button" onClick={handleClosePopup}>
        <FaTimes style={{ fontSize: '1.3em' }} />
      </button>

      {showPopup && isPopupVisible ? (
    <PopupComponent className={popupStyle} message="Successfully Submitted" />
) : null}

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
