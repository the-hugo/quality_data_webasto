import React, { useState, useEffect } from 'react';

function newErrorPopup() {
    return (
        <div className={"newIssuePopup"}>
            <div className={"newIssuePopup-inner"}>
                <button className={"newCloseBtn"}>Close</button>
            </div>

        </div>
    )
}


export default newErrorPopup()