// import { Row } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import { Stack } from "react-bootstrap";
import styles from "./header.module.css"

export default function Header({ pagination}) {
    return (
        <>
            <Col>
                <Row>
                    <Col>
                        <Stack style={{ marginTop: "6%" }}>
                            {/* To be replaced by a function that calls the backend and returns the curren product */}
                            <span className={styles.font}><h4 style={{ marginBottom: "0%" }}><b>CC RC Roof Panel Rem Lid 3d</b></h4></span>
                        </Stack>
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
                <Row>
                    <Col></Col>
                    <Col style={{ display: 'flex', justifyContent: 'flex-end' }}>                            
                    {/* Number of pages */}
                    <span className={styles.pagination}>{ pagination[0] === 0 ? "01 / 02" : "02 / 02"}</span></Col>
                </Row>
            </Col>
        </>
    )
}