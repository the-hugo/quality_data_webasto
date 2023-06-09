import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidenav from './SideBar';
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import graph from '../DataAnalytics/Dashboard';
import ImageMap from "./ImageMap";
import Popup from './ErrorSubmision-popup';
import { Button } from 'react-bootstrap';
import './styles.css'



export default function LandingPage() {
    const [showOverlay, setShowOverlay] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

        const handleOpenPopup = () => {
            setShowPopup(true);
            setShowOverlay(true);
        };

        const handleClosePopup = () => {
            setShowPopup(false);
            setShowOverlay(false);
        };


    return (
        <Container style={{ marginLeft: 0, paddingLeft: 0 }}>
            {showOverlay && <div className="overlay"></div>}
            <Row>
                <Col>
                    <Sidenav />
                </Col>
                <Col>
                    <BrowserRouter>
                        <p>Home</p>
                        <Link to="/data-analytics">Data Analytics</Link> <p></p>
                        <Link to="/image-map">Image Map</Link>
                        <Switch>
                            <Route path="/data-analytics" exact component={graph} />
                            <Route path="/image-map" exact component={ImageMap} />
                        </Switch>
                        {/* Button to open the pop-up */}
                        <Button onClick={handleOpenPopup}>Open Popup</Button>

                        {/* Render the pop-up conditionally */}
                        {showPopup && (
                            <>
                                <div className="overlay" onClick={handleClosePopup}></div>
                                <Popup onClose={handleClosePopup} />
                            </>
                        )}
                    </BrowserRouter>
                </Col>
            </Row>



        </Container>
    )
}