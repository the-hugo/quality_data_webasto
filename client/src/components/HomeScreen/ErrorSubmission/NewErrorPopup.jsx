import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa'; // Import close icon

// Creating Category Options
const errorOptions = ['Dimension & Fit', 'Material & Documentation', 'Seal and Adheasion', 'Surface Quality']; // The array is outsourced

const NewErrorPopup = ({ onClose }) => {
  // State variables for popup open status, selected option, and text field input
  const [isOpen, setIsOpen] = useState(true);
  const [selectedOption, setSelectedOption] = useState('');
  const [textField, setTextField] = useState('');

  // Function to close the popup and notify parent component
  const handleClosePopup = () => {
    setIsOpen(false);
    onClose();
  };

  // Functions to handle the click of each respective button
  const handleAnomalyClick = () => { console.log("Anomaly button clicked"); };
  const handleReworkClick = () => { console.log("Rework button clicked"); };
  const handleScrapClick = () => { console.log("Scrap button clicked"); };

  // Effect hook to set popup open status when the component mounts
  useEffect(() => { setIsOpen(true); }, []);

  // Function to update the selected option state
  const handleOptionChange = (option) => { setSelectedOption(option); };

  // Function to update the text field input state
  const handleTextFieldChange = (e) => { setTextField(e.target.value); };

  return (
    <div className="popup">
      <div className="popup-content">
        <div className="title-container">
          <h3 className="popup-title">Please select a new Error</h3>
        </div>
        {/* Container for the custom radio button group */}
        <div className="option-container" style={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Mapping through the errorOptions array to create a custom radio button for each option */}
          {errorOptions.map(option => (
            <div 
              key={option} 
              onClick={() => handleOptionChange(option)} // OnClick updates the selectedOption state to the clicked option
              // Styling for the custom radio buttons, background color changes based on the selected option
              style={{
                padding: '10px',
                border: '1px solid #000',
                borderRadius: '4px',
                cursor: 'pointer',
                backgroundColor: selectedOption === option ? '#aaa' : '#fff',
                flex: 1,
                textAlign: 'center',
                marginRight: errorOptions.indexOf(option) === errorOptions.length - 1 ? 0 : '10px'
              }}>
              {option}
            </div>
          ))}
        </div>
        {/* Container for the text input field */}
        <div className="text-field-container">
          {/* Text input field, onChange updates the textField state with the input */}
          <textarea value={textField} onChange={handleTextFieldChange} placeholder="Enter text here..." style={{ margin: '10px 0', padding: '10px', width: '100%', height: '100px' }} />
        </div>
        {/* Container for the buttons */}
        <div className="button-container">
          {/* Each button has an onClick that fires the respective handleClick function */}
          <button className="anomaly-button" onClick={handleAnomalyClick}>Anomaly</button>
          <button className="rework-button" onClick={handleReworkClick}>Rework</button>
          <button className="scrap-button" onClick={handleScrapClick}>Scrap</button>
        </div>
      </div>
      {/* Close button, onClick fires the handleClosePopup function */}
      <button className="close-button" onClick={handleClosePopup}>
        <FaTimes style={{ fontSize: '1.3em' }} />
      </button>
    </div>
  );
};

export default NewErrorPopup;
