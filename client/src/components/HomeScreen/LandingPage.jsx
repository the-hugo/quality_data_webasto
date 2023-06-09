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

        const [showPopup, setShowPopup] = useState(false);

        const handleOpenPopup = () => {
            setShowPopup(true);
        };

        const handleClosePopup = () => {
            setShowPopup(false);
        };


    return (
        <Container style={{ marginLeft: 0, paddingLeft: 0 }}>

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
                        {/* Render the pop-up conditionally */}
                        {showPopup && <Popup onClose={handleClosePopup} />}

                        {/* Button to open the pop-up */}
                        <Button onClick={handleOpenPopup}>Open Popup</Button>
                    </BrowserRouter>
                </Col>
            </Row>



        </Container>
    )
}