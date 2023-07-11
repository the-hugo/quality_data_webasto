import React, { useState, useEffect, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';
import ImageMap from './ImageMap';

import './popup.css';
import ImageGrid from './ImageGrid';

const Popup = ({ onClose, popupData }) => {
  const [showFirstPopup, setShowFirstPopup] = useState(true);
  const [showSecondPopup, setShowSecondPopup] = useState(false);
  const [popupStyle, setPopupStyle] = useState('');
  const transformedData = transformData([popupData]); // Transform the data
  const [locationObjectIds, setLocationObjectIds] = useState([]);
  

  const handleButtonClick = async (actionType) => {

    const data = {
      serial_num: '123456',
      product_id: 'CC RC Roof Panel Rem Lid 3dr',
      category: popupData.defect_type,
      description: '',
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
      const responseData = await response.json(); // Parse the response data as JSON
      const response_error = responseData.error_num;

      let actionStyle = '';
      switch (actionType.toLowerCase()) {
        case 'anomaly':
          actionStyle = 'popup1';
          break;
        case 'rework':
          actionStyle = 'popup2';
          break;
        case 'scrap':
          actionStyle = 'popup3';
          break;
        default:
          console.warn(`Unexpected actionType: ${actionType}`);
          break;
      }
      
      setPopupStyle(actionStyle);

      setShowFirstPopup(false); // Close the first popup immediately after successful POST request

      // Show the second popup immediately
      setShowSecondPopup(true);

      // Hide the second popup after one second
      setTimeout(() => {
        setShowSecondPopup(false);
        setPopupStyle(''); // reset the popupStyle state
      }, 1300);

      await callChildFunction(response_error); // Wait for the locations to be added and sent to the backend
    } else {
      console.error(`Failed to click Button ${actionType}`);
    }
  };

  useEffect(() => {
    console.log('locationObjectIds changed:', locationObjectIds);
  }, [locationObjectIds]);

  const handleLocationObjectIds = (objectIds) => {
    setLocationObjectIds(objectIds);
    // Do something with the ObjectIds in the parent component
  };

  // Helper function to transform data and assign colors based on defect types
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
          console.warn(`Unexpected defect type: ${type2}`);
          break;
      }

      return element;
    });
  }

  const imageMapRef = useRef();
  const imageGridRef = useRef();

  const callChildFunction = (responseError) => {
    if (imageMapRef.current) {
      imageMapRef.current.sendLocationsToBackend(responseError);
    } else if (imageGridRef.current) {
      imageGridRef.current.pushGridLocations(responseError);
    } else {
      console.log('Neither ImageMap nor ImageGrid exist');
    }
  };

  const handleClosePopup = () => {
    setShowFirstPopup(false);
    setShowSecondPopup(false);
    onClose();
  };

  useEffect(() => {
    if (!showFirstPopup && !showSecondPopup) {
      handleClosePopup();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showFirstPopup, showSecondPopup]);
  

  //Message Popups
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
    <>
      {showFirstPopup && (
        <div className="popup">
          <div className="popup-content">
            <div className="title-container">
              <h3
                className="popup-title"
                style={{ color: '#3e3ecf', paddingTop: '5%' }}
              >
                SELECTED
              </h3>
              {/*<div className="circle-button" onClick={handleOpenMapPopup}>
                {icon}
              </div> */}
            </div>
            <div className="issue-element-display">
              <p
                className="issue-location"
                style={{ background: transformedData[0].color }}
              >
                {popupData.error_code}
              </p>
              <div className="issue-definition-area">
                <p className="issue-name">{popupData.error}</p>
                <p className="issue-type">{popupData.defect_type}</p>
              </div>
            </div>
            <div className="map-area" style={{ alignContent: 'center' }}>
              {popupData.need_location === '1' ? (
                <ImageMap
                  ref={imageMapRef}
                  onLocationObjectIds={handleLocationObjectIds}
                />
              ) : null}
              {popupData.need_location === '2' ? (
                <ImageGrid
                  ref={imageGridRef}
                  onLocationObjectIds={handleLocationObjectIds}
                />
              ) : null}
            </div>
            <div className="button-container">
              <button
                className="anomaly-button"
                style={{ marginRight: '10%' }}
                onClick={() => handleButtonClick('Anomaly')}
              >
                Anomaly
              </button>
              <button
                className="rework-button"
                style={{ marginRight: '10%' }}
                onClick={() => handleButtonClick('Rework')}
              >
                Rework
              </button>
              <button
                className="scrap-button"
                onClick={() => handleButtonClick('Scrap')}
              >
                Scrap
              </button>
            </div>
          </div>
          <button className="close-button" onClick={handleClosePopup}>
            <FaTimes style={{ fontSize: '1.3em' }} />
          </button>
        </div>
      )}
      {showSecondPopup && (
        <div className={`popup ${popupStyle}`}>
          <PopupComponent
            className={popupStyle}
            message="Successfully Submitted"
          />
        </div>
      )}
    </>
  );
};

export default Popup;
