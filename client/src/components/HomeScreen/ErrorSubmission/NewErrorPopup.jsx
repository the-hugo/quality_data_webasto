import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa'; // Import close icon

// Creating Category Options
const categoryOptions = ['Dimension & Fit', 'Material & Documentation', 'Seal and Adhesion', 'Surface Quality']; // The array is outsourced

const errorDropdownOptions = ['Dent', 'Bubbles', 'Scratch', 'Crack']; // Dummy data for the error dropdown options

const handleButtonClick = async (actionType, selectedCategory, selectedError, textField) => {
  try {
    const data = {
      serial_num: '123456',
      product_id: 'CC RC Roof Panel Rem Lid 3dr',
      error_code: '0',
      description: textField,
      category: selectedCategory,
      action_type: actionType,
      error_type: selectedError
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
    } else {
      console.error(`Failed to click Button ${actionType}`);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const NewErrorPopup = ({ onClose }) => {
  // State variables for popup open status, selected option, and text field input
  const [isOpen, setIsOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedError, setSelectedError] = useState('');
  const [textField, setTextField] = useState('');

  // Function to close the popup and notify the parent component
  const handleClosePopup = () => {
    setIsOpen(false);
    onClose();
  };

  // Effect hook to set popup open status when the component mounts
  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <div className="popup">
      <div className="popup-content">
        <div className="title-container">
          <h3 className="popup-title">Please select a new Error</h3>
        </div>
        {/* Container for the custom radio button group */}
        <div className="option-container" style={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Mapping through the categoryOptions array to create a custom radio button for each option */}
          {categoryOptions.map((option) => (
            <div
              key={option}
              onClick={() => setSelectedCategory(option)} // OnClick updates the selectedCategory state to the clicked option
              // Styling for the custom radio buttons, background color changes based on the selected option
              style={{
                padding: '10px',
                border: '1px solid #000',
                borderRadius: '4px',
                cursor: 'pointer',
                backgroundColor: selectedCategory === option ? '#aaa' : '#fff',
                flex: 1,
                textAlign: 'center',
                marginRight: categoryOptions.indexOf(option) === categoryOptions.length - 1 ? 0 : '10px'
              }}
            >
              {option}
            </div>
          ))}
        </div>
        {/* Dropdown for selecting different errors */}
        <div className="dropdown-container">
          <select
            value={selectedError} // Set the selected error
            onChange={(e) => setSelectedError(e.target.value)} // Handle error change
            style={{ margin: '10px 0', padding: '10px', width: '100%' }}
          >
            <option value="">Select Error</option>
            {/* Map through the errorDropdownOptions and create an option for each */}
            {errorDropdownOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        {/* Container for the text input field */}
        <div className="text-field-container">
          {/* Text input field, onChange updates the textField state with the input */}
          <textarea
            value={textField}
            onChange={(e) => setTextField(e.target.value)}
            placeholder="Description"
            style={{ margin: '10px 0', padding: '10px', width: '100%', height: '100px' }}
          />
        </div>
        {/* Container for the buttons */}
        <div className="button-container">
          {/* Each button has an onClick that fires the respective handleClick function */}
          <button className="anomaly-button" onClick={() => handleButtonClick('Anomaly', selectedCategory, selectedError, textField)}>
            Anomaly
          </button>
          <button className="rework-button" onClick={() => handleButtonClick('Rework', selectedCategory, selectedError, textField)}>
            Rework
          </button>
          <button className="scrap-button" onClick={() => handleButtonClick('Scrap', selectedCategory, selectedError, textField)}>
            Scrap
          </button>
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
