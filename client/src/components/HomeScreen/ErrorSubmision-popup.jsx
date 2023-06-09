import React from 'react';

const Popup = ({ onClose }) => {
    return (
        <div className="popup">
            <div className="popup-content">
                <input type="text" placeholder="Enter text" />
                <div className="button-container">
                    <button>Button 1</button>
                    <button>Button 2</button>
                    <button>Button 3</button>
                </div>
                <button className="close-button" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Popup;
