import styles from "./custom.module.css"
import { Col } from "react-bootstrap"
import { Row } from "react-bootstrap"

export default function CustomError() {
    return (
        <Row>
            <Col className="col-4">
                <div className={`${styles.decorator} align-self-center}`} style={{ fontSize: 10 }}>Class A Surface</div>
                <Row className={`${styles.outer} d-flex align-items-end`}>
                    <Col>
                        <Row className="" style={{ marginTop: -35 }}>
                            <div style={{ fontSize: 12 }} className="text-center"><b>Delamination</b></div>
                        </Row>
                        <Row>
                            <div style={{ fontSize: 8, color: "#333399" }} className="text-end">Damage</div>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}