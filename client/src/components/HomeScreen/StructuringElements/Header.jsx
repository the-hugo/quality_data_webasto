// import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Stack } from "react-bootstrap";
import styles from "./header.module.css"

export default function Header() {
    return (
        <>
            <Col>
                <Stack className={styles.stack}>
                    {/* To be replaced by a function that calls the backend and returns the curren product */}
                    <span className={styles.font}><h2>CC RC Roof Panel Rem Lid 3d</h2></span>
                    {/* Product Serial Number; same as above */}
                    <span><h6 className={styles.font}>092390998</h6></span>
                </Stack>
            </Col>
            <Col>
                <Stack className={styles.stack}>
                    {/* Station Name; same as above */}
                    <span className={styles.font}><b>Station: CCRC050</b></span>
                    <span>___</span>
                    {/* Number of pages */}
                    <span style={{ color: "#f5be7c" }}>01 / 02</span>
                </Stack>
            </Col>
        </>
    )
}