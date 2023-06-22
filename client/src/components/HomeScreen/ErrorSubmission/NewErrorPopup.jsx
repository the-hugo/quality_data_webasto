import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

// Category Options
const categoryOptions = [
  'Dimension & Fit',
  'Material & Documentation',
  'Seal and Adhesion',
  'Surface Quality',
];

const errorDropdownOptions = ['Dent', 'Bubbles', 'Scratch', 'Crack'];

const NewErrorPopup = ({ onClose }) => {
  const [currentPopup, setCurrentPopup] = useState('first');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedError, setSelectedError] = useState('');
  const [textField, setTextField] = useState('');
  const [popupStyle, setPopupStyle] = useState("");

  const checkInput = (selectedCategory, selectedError, textField) => {
    if (!selectedCategory || !selectedError || textField.trim() === '') {
      alert('All fields are required!');
      return false;
    }
    return true;
  };

  const buttonClick = async (actionType) => {
    if (!checkInput(selectedCategory, selectedError, textField)) return;
    const data = {
      serial_num: '123456',
      product_id: 'CC RC Roof Panel Rem Lid 3dr',
      error_code: '0',
      description: textField,
      category: selectedCategory,
      action_type: actionType,
      error_type: selectedError,
    };
    try {
      const response = await fetch('http://localhost:8080/home/defects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        let actionStyle = "";
      switch(actionType.toLowerCase()){
        case "anomaly":
          actionStyle = "popup1";
          break;
        case "rework":
          actionStyle = "popup2";
          break;
        case "scrap":
          actionStyle = "popup3";
          break;
      }
      setPopupStyle(actionStyle);
        setCurrentPopup('confirmation');

        setTimeout(() => {
          setCurrentPopup(''); // Reset currentPopup state after one second
          onClose(); // Close the entire popup
        }, 1000);
      } else {
        console.error(`Failed to click Button ${actionType}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleClosePopup = () => {
    setCurrentPopup('');
    onClose();
  };

  const ButtonComponent = ({ className, onClick, children }) => (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );

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
      {currentPopup === 'first' && (
        <div className="popup">
          <div className="popup-content">
            <div className="title-container">
              <h3 className="popup-title">Please select a new Error</h3>
            </div>
            <div
              className="option-container"
              style={{ display: 'flex', justifyContent: 'space-between' }}
            >
              {categoryOptions.map((option) => (
                <div
                  key={option}
                  onClick={() => setSelectedCategory(option)}
                  style={{
                    padding: '10px',
                    border: '1px solid #000',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    backgroundColor: selectedCategory === option ? '#aaa' : '#fff',
                    flex: 1,
                    textAlign: 'center',
                    marginRight:
                      categoryOptions.indexOf(option) === categoryOptions.length - 1
                        ? 0
                        : '10px',
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
            <div className="dropdown-container">
              <select
                value={selectedError}
                onChange={(e) => setSelectedError(e.target.value)}
                style={{ margin: '10px 0', padding: '10px', width: '100%' }}
              >
                <option value="">Select Error</option>
                {errorDropdownOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-field-container">
              <textarea
                value={textField}
                onChange={(e) => setTextField(e.target.value)}
                placeholder="Description"
                style={{
                  margin: '10px 0',
                  padding: '10px',
                  width: '100%',
                  height: '100px',
                }}
              />
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
