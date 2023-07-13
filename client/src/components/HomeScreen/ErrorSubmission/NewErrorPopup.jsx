// Necessary imports for the component
import React, { useState } from 'react';
import { FaTimes, FaMapMarkerAlt } from 'react-icons/fa'; // Icons used in the component
import './NewErrorPopup.css'; // Import the CSS file for styling
import { GridView as GridViewIcon } from '@mui/icons-material'; // Icon used in the component

// Arrays holding constant options for dropdowns
const categoryOptions = [
  'Dimension & Fit',
  'Material & Documentation',
  'Seal and Adhesion',
  'Surface Quality',
];

const errorDropdownOptions = ['Dent', 'Bubbles', 'Scratch', 'Crack'];

// The main component starts here
const NewErrorPopup = ({ onClose }) => {
  // Local states to hold current state of popup, selected category, selected error, text field input and popup style
  const [currentPopup, setCurrentPopup] = useState('first');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedError, setSelectedError] = useState('');
  const [textField, setTextField] = useState('');
  const [popupStyle, setPopupStyle] = useState("");

  // Function to validate the input fields
  const checkInput = (selectedCategory, selectedError, textField) => {
    if (!selectedCategory || !selectedError || textField.trim() === '') {
      alert('All fields are required!');
      return false;
    }
    return true;
  };

  // Function to handle button click
  const buttonClick = async (actionType) => {
    // Check if the inputs are valid
    if (!checkInput(selectedCategory, selectedError, textField)) return;
    // Prepare the data to be sent to the server
    const data = {
      serial_num: '123456',
      product_id: 'CC RC Roof Panel Rem Lid 3dr',
      error_code: '0',
      description: textField,
      category: selectedCategory,
      action_type: actionType,
      error_type: selectedError,
    };
    // Make the API request
    try {
      const response = await fetch('http://localhost:8080/home/defects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // If the request is successful
      if (response.ok) {
        let actionStyle = "";
        // Determine the popup style based on the action type
        switch (actionType.toLowerCase()) {
          case "anomaly":
            actionStyle = "popup1";
            break;
          case "rework":
            actionStyle = "popup2";
            break;
          case "scrap":
            actionStyle = "popup3";
            break;
          default:
            console.log("popup error")
        }
        setPopupStyle(actionStyle);
        // Show the confirmation popup
        setCurrentPopup('confirmation');

        // After one second, reset the currentPopup state and close the entire popup
        setTimeout(() => {
          setCurrentPopup('');
          onClose();
        }, 1000);
      } else {
        console.error(`Failed to click Button ${actionType}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Function to close the popup
  const handleClosePopup = () => {
    setCurrentPopup('');
    onClose();
  };

  // Button component used multiple times in the return statement
  const ButtonComponent = ({ className, onClick, children }) => (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );

  // Message popup component
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

  // Component render

  return (
    <>
      {currentPopup === 'first' && (
        <div className="popup">
          <div className="popup-content" style={{ padding: '4%' }}>
            <div className="title-container">
              <h3 className="popup-title">Please select a new Error</h3>
            </div>
            <div className="option-container">
              {categoryOptions.map((option) => (
                <div
                  key={option}
                  onClick={() => setSelectedCategory(option)}
                  className={`category-option ${selectedCategory === option ? 'selected' : ''}`}
                >
                  {option}
                </div>
              ))}
            </div>
            <div className="dropdown-container">
              <select
                value={selectedError}
                onChange={(e) => setSelectedError(e.target.value)}
                className="error-dropdown"
              >
                <option value="">Select Error</option>
                {errorDropdownOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-plus-location-area" style={{ display: 'flex' }}>
              <div className="text-field-container" style={{ display: 'flex', width: '80%', height: '100px' }}>
                <textarea
                  value={textField}
                  onChange={(e) => setTextField(e.target.value)}
                  placeholder="Description"
                  className="description-textarea"
                />
              </div>
              <div className='loc-btns' style={{ justifyItems: 'right', marginLeft: '10%' }}>
                <button className="pinpoint-loc-btn" style={{ marginTop: '20px', border: '1px solid', borderRadius: '30px', padding: '8px' }}>
                  <FaMapMarkerAlt style={{ fontSize: '1.3em' }} />
                </button>
                <br />
                <button className="grid-loc-btn" style={{ marginTop: '20px', border: '1px solid', borderRadius: '30px', padding: '8px' }}>
                  <GridViewIcon style={{ color: "#333399", fontSize: '1.3em' }} />
                </button>
              </div>
            </div>
            <div className="button-container">
              <ButtonComponent
                className="anomaly-button"
                onClick={() => buttonClick('Anomaly')}
              >
                Anomaly
              </ButtonComponent>
              <ButtonComponent
                className="rework-button"
                onClick={() => buttonClick('Rework')}
              >
                Rework
              </ButtonComponent>
              <ButtonComponent
                className="scrap-button"
                onClick={() => buttonClick('Scrap')}
              >
                Scrap
              </ButtonComponent>
            </div>
          </div>
          <button className="close-button" onClick={handleClosePopup}>
            <FaTimes style={{ fontSize: '1.3em' }} />
          </button>
        </div>
      )}
      {currentPopup === 'confirmation' && (
        <div className={`popup ${popupStyle}`}>
          <PopupComponent className={popupStyle} message="Successfully Submitted" />
        </div>
      )}
    </>
  );
};

export default NewErrorPopup;
