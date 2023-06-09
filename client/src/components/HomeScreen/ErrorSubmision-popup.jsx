import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const Popup = ({ onClose }) => {
    const [showPopup1, setShowPopup1] = useState(false);
    const [showPopup2, setShowPopup2] = useState(false);
    const [showPopup3, setShowPopup3] = useState(false);

    const handleOpenPopup1 = () => {
        setShowPopup1(true);
    };

    const handleClosePopup1 = () => {
        setShowPopup1(false);
    };

    const handleOpenPopup2 = () => {
        setShowPopup2(true);
    };

    const handleOpenPopup3 = () => {
        setShowPopup3(true);
    };

    const handleClosePopup = () => {
        setShowPopup1(false);
        setShowPopup2(false);
        setShowPopup3(false);
        onClose();
    };

    const handleClosePopup2 = () => {
        setShowPopup2(false);
    };

    const handleClosePopup3 = () => {
        setShowPopup3(false);
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <input type="text" placeholder="Enter text" />
                <div className="button-container">
                    <button onClick={handleOpenPopup1}>Button 1</button>
                    <button onClick={handleOpenPopup2}>Button 2</button>
                    <button onClick={handleOpenPopup3}>Button 3</button>
                </div>
                <button className="close-button" onClick={handleClosePopup}>Close</button>
            </div>

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
        </div>
    );
};

export default Popup;
