import styles from "./custom.module.css"
import { Col } from "react-bootstrap"
import { Row } from "react-bootstrap"
import { useState } from "react"

export default function CustomError({ togglePopup, error }) {
    const [isOpen, setIsOpen] = useState(false)
    const togglePopup2 = () => {
        setIsOpen(prevState => !prevState);
        togglePopup(!isOpen);
    }

    return (
            <Col className={`${styles.grow} col-3`} onClick={togglePopup2} style={{cursor: "pointer"}}>
                <div className={`${styles.decorator} align-self-center}`} style={{ fontSize: 10 }}>{ error.serial_num  }</div>
                <Row className={`${styles.outer} d-flex align-items-end`}>
                    <Col>
                        <Row className="" style={{ marginTop: -35 }}>
                            <div style={{ fontSize: 12 }} className="text-center"><b>{ error.description  }</b></div>
                        </Row>
                        <Row>
                            <div style={{ fontSize: 8, color: "#333399" }} className="text-end">{ error.action_type  }</div>
                        </Row>
                    </Col>
                </Row>
            </Col>
    )
}