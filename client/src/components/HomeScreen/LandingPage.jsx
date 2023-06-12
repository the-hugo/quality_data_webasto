import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidenav from './StructuringElements/SideBar';
import ImageMap from "./ErrorSubmission/ImageMap";
import Popup from './ErrorSubmission/ErrorSubmision-popup';
import { Button } from 'react-bootstrap';
import Header from './StructuringElements/Header';
import Clock from './StructuringElements/Clock';
import Footer from './StructuringElements/Footer';
import ArrowRight from './StructuringElements/ArrowRight';
import ArrowLeft from './StructuringElements/ArrowLeft';
import CustomError from './ErrorSelection/CustomErrors';
import './styles.css'




export default function LandingPage() {
    const [showOverlay, setShowOverlay] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [isOpen, setBool] = useState(false)

    const handleOpenPopup = () => {
        setShowPopup(true);
        setShowOverlay(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setShowOverlay(false);
    };

    const handleChildStateChange = (currentBool) => {
        setBool(currentBool)
    }

    return (
        <Container fluid>
            <Row className='d-flex w-100'>
                {/* Overlay */}
                {showOverlay && <div className="overlay"></div>}

                {/* SideNav is wrapped in a Col */}
                <Sidenav onChildStateChange={handleChildStateChange} />

                {/* Left arrow */}
                <Col className='col-1'>
                    <Row className='h-100 flex-column'>
                        <div style={{ paddingLeft: 0, marginTop: "24.81%" }}>
                        </div>
                        <Col className="d-flex flex-column justify-content-center align-items-center" style={{ paddingRight: 0 }}>
                            <ArrowLeft />
                        </Col>
                    </Row>
                </Col>
                <Col className={isOpen ? "d-flex flex-column align-items-stretch flex-shrink-2 col-9" : "d-flex flex-column align-items-stretch flex-shrink-2 col-8"}>
                    <Row className='flex-grow-1'>
                        {/* Header returns two cols */}
                        <Header />
                    </Row>
                    {/* Errors Here */}
                    <Row className='flex-grow-1 justify-content-center'>
                        <Col className=''>
                            <div onClick={handleOpenPopup}>
                                <CustomError />
                            </div>
                            {/* <ImageMap /> */}
                            {/* Button to open the pop-up */}
                            {/* Render the pop-up conditionally */}
                            {showPopup && (
                                <>
                                    <div className="overlay" onClick={handleClosePopup}></div>
                                    <Popup onClose={handleClosePopup} />
                                </>
                            )}</Col>
                    </Row>
                    <Row className='gap-3 flex-grow-1 footer d-flex justify-content-center' style={{ marginLeft: 20, marginRight: 20, maxHeight: 120 }}>
                        {/* Footer returns two columns */}
                        <Footer />
                    </Row>
                </Col>
                <Col className='col-1'>
                    <Row className='h-100 flex-column'>
                        <div style={{ marginTop: 6, textAlign: "right", paddingLeft: 0, paddingRight: 0 }}>
                            <Clock />
                        </div>
                        <Col className="d-flex flex-column justify-content-center align-items-center" style={{ paddingRight: 0 }}>
                            <ArrowRight />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}