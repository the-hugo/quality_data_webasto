import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa'; // Import close icon


const NewErrorPopup = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedOption, setSelectedOption] = useState('');
  const [textField, setTextField] = useState('');

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

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleTextFieldChange = (e) => {
    setTextField(e.target.value);
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <div className="title-container">
          <h3 className="popup-title">Please select a new Error</h3>
        </div>
        <div className="option-container">
          {['Dimension', 'Material', 'Seal', 'Surface', 'Engineering'].map(option => (
            <label key={option} style={{ marginRight: '10px', cursor: 'pointer' }}>
              <input type="radio" value={option} checked={selectedOption === option} onChange={handleOptionChange} />
              {option}
            </label>
          ))}
        </div>
        <div className="title-container">
          <h4 className="popup-title">Description:</h4>
        </div>
        <div className="text-field-container">
          <input type="text" value={textField} onChange={handleTextFieldChange} placeholder="Enter text here..." style={{ margin: '10px 0', padding: '10px' }} />
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
