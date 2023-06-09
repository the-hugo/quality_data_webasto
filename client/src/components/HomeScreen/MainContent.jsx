import React from 'react';

// CODE FOR THE TOP PORTION OF THE MAIN SCREEN.
// INCLUDING THE TITLES, DATE & TIME

const MainContent = () => {
    return (
        <div className="main-content">
            <h1>Heading 1</h1>
            <h2>Subheading</h2>
            <div className="right-content">
                <h3>Title</h3>
                <p>01/02</p>
            </div>
            <div className="date-time">Date and Time</div>
        </div>
    );
};

export default MainContent;
