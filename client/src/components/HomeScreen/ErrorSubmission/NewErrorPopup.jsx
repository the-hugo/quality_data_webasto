import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa'; // Import close icon


const NewErrorPopup = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClosePopup = () => {
    setIsOpen(false);
    onClose(); // Call the onClose function passed as prop to notify the parent component
  };

  const handleAnomalyClick = () => {
    console.log("Anomaly button clicked");
  };

  const handleReworkClick = () => {
    console.log("Rework button clicked");
  };

  const handleScrapClick = () => {
    console.log("Scrap button clicked");
  };

  useEffect(() => {
    setIsOpen(true); // Set isOpen to true when the component mounts
  }, []);

  return (
    <div className="popup">
      <div className="popup-content">
        <div className="title-container">
          <h3 className="popup-title">SELECTED</h3>
        </div>
        <div className="issue-element-display">
          <p className="issue-location">TEST</p>
          <div className="issue-definition-area">
            <p className="issue-name">TEST</p>
            <p className="issue-type">TEST</p>
          </div>
        </div>
        <div className="button-container">
          <button className="anomaly-button" onClick={handleAnomalyClick}>Anomaly</button>
          <button className="rework-button" onClick={handleReworkClick}>Rework</button>
          <button className="scrap-button" onClick={handleScrapClick}>Scrap</button>
        </div>
      </div>

      <button className="close-button" onClick={handleClosePopup}>
        <FaTimes style={{ fontSize: '1.3em' }} />
      </button>
    </div>
  );
};

export default NewErrorPopup;
