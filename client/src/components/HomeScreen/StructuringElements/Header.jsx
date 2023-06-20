import { Col, Row } from "react-bootstrap";
import { Stack } from "react-bootstrap";
import styles from "./header.module.css";
import Clock from "./Clock.jsx";

export default function Header() {
    return (
        <>
            <Col>
                <Row style={{ marginTop: "4%" }}>
                    <Col className="col-22">
                        <Stack>
                            {/* To be replaced by a function that calls the backend and returns the current product */}
                            <span className={styles.font}><h4 style={{ marginBottom: "0%" }}><b>CC RC Roof Panel Rem Lid 3d</b></h4></span>
                        </Stack>
                    </Col>
                    <Col className="col-4 d-flex justify-content-end">
                        <Clock></Clock>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {/* Product Serial Number; same as above */}
                        <span className={styles.font}>092390998</span>
                    </Col>
                    <Col style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        {/* Station Name; same as above */}
                        <span className={styles.font}>STATION: CCRC050</span>
                    </Col>
                </Row>
            </Col>
        </>
    );
}
