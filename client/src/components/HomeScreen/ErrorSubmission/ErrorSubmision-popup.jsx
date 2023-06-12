import React, { useState } from 'react';
import { FaTimes, FaMapMarkerAlt } from 'react-icons/fa';
import ImageMap from './ImageMap';

const Popup = ({ onClose }) => {
  const [showPopup1, setShowPopup1] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const [showPopup3, setShowPopup3] = useState(false);
  const [showMapPopup, setShowMapPopup] = useState(false);

  const handleButton1Click = async () => {
    try {
        // Create a data object with the attribute values
        const data = {
            serial_num:'123456',
            personal_id: '6661',
            description: 'Das Teil ist Banane',
            action_type: 'Anomaly',
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
        console.log('Button 1 clicked successfully');
        // Show the success popup
        setShowPopup1(true);
      } else {
        console.error('Failed to click Button 1');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  


  const handleButton2Click = async () => {
    try {
       // Create a data object with the attribute values
       const data = {
        serial_num:'123456',
        personal_id: '6661',
        description: 'Das Teil ist Banane',
        action_type: 'Anomaly',
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
        console.log('Button 1 clicked successfully');
        // Show the success popup
        setShowPopup1(true);
      } else {
        console.error('Failed to click Button 1');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  


  const handleButton3Click = async () => {
    try {
       // Create a data object with the attribute values
       const data = {
        serial_num:'123456',
        personal_id: '6661',
        description: 'Das Teil ist Banane',
        action_type: 'Anomaly',
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
        console.log('Button 1 clicked successfully');
        // Show the success popup
        setShowPopup1(true);
      } else {
        console.error('Failed to click Button 1');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  


  const handleClosePopup = () => {
    setShowPopup1(false);
    setShowPopup2(false);
    setShowPopup3(false);
    onClose();
  };

  const handleClosePopup1 = () => {
    setShowPopup1(false);
  };
  const handleClosePopup2 = () => {
    setShowPopup2(false);
  };

  const handleClosePopup3 = () => {
    setShowPopup3(false);
  };

  const handleOpenMapPopup = () => {
    setShowMapPopup(true);
  };

  const handleCloseMapPopup = () => {
    setShowMapPopup(false);
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <div className={'title-container'}>
          <h3 className="popup-title">SELECTED</h3>
          <div className="circle-button" onClick={handleOpenMapPopup}>
            <FaMapMarkerAlt style={{ color: 'azure' }} />
          </div>
        </div>
        {/*<input type="text" placeholder="Enter text" />*/}
        <div className={'issue-element-display'}>
          <p className={'issue-location'}>Class A Surface</p>
          <div className={'issue-definition-area'}>
            <p className={'issue-name'}>Delamination</p>
            <p className={'issue-type'}>Surface / Finish</p>
          </div>
        </div>
        <div className="button-container">
          <button onClick={handleButton1Click}>Anomaly</button>
          <button onClick={handleButton2Click}>Rework</button>
          <button onClick={handleButton3Click}>Scrap</button>
        </div>
      </div>

      <button className="close-button" onClick={handleClosePopup}>
        <FaTimes style={{ fontSize: '1.3em' }} />
      </button>

      {/* Render additional pop-ups conditionally */}
      {showPopup1 && (
        <div className="popup1">
          <div className="popup1-content">
            <div className="popup1-close" onClick={handleClosePopup1}>
              <FaTimes />
            </div>
            <div className="popup1-message">Successfully Submitted</div>
          </div>
        </div>
      )}
      {showPopup2 && (
        <div className="popup2">
          <div className="popup2-content">
            <div className="popup2-close" onClick={handleClosePopup2}>
              <FaTimes />
            </div>
            <div className="popup2-message">Successfully Submitted</div>
          </div>
        </div>
      )}
      {showPopup3 && (
        <div className="popup3">
          <div className="popup3-content">
            <div className="popup3-close" onClick={handleClosePopup3}>
              <FaTimes />
            </div>
            <div className="popup3-message">Successfully Submitted</div>
          </div>
        </div>
      )}
      {showMapPopup && (
        <div className="map-popup">
          <div className="map-popup-content">
            {/* Image map content */}
            <div className="image-map">
              {/* Add your image map component here */}
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
