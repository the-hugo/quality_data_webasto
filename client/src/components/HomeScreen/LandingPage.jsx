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
        <Container fluid>
            <Row>
                {/* Overlay */}
                {showOverlay && <div className="overlay"></div>}

                {/* SideNav is wrapped in a Col */}
                <Sidenav />
                {/* Left arrow */}
                <Col className="align-self-center"style={{ marginTop: "2%"  }}>
                    Left arrow
                </Col>
                <Col className="d-flex flex-column align-items-stretch">
                    <Row className='flex-grow-1'>
                        {/* Header returns two cols */}
                        <Header />
                    </Row>
                    {/* Errors Here */}
                    <Row className='flex-grow-1'>
                        <Col>
                            <ImageMap />
                            {/* Button to open the pop-up */}
                            <Button style={{ maxWidth: 150 }} onClick={handleOpenPopup}>
                                Open Popup
                            </Button>
                            {/* Render the pop-up conditionally */}
                            {showPopup && (
                                <>
                                    <div className="overlay" onClick={handleClosePopup}></div>
                                    <Popup onClose={handleClosePopup} />
                                </>
                            )}</Col>
                    </Row>
                    <Row className='flex-grow-1'>
                        <Col>
                            Footer
                        </Col>
                    </Row>
                </Col>
                <Col className="d-flex align-items-start justify-content-center">
                    <Row className='h-100'>
                        <Col className="text-center" style={{ marginTop: "5%"  }}>
                            <Clock />
                        </Col>
                        <Col className="">
                            <p>Right Arrow</p>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}