import styles from "./custom.module.css";
import { Col, Row } from "react-bootstrap";
import { useState } from "react";

export default function CustomError({ togglePopup, item }) {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup2 = () => {
    setIsOpen((prevState) => !prevState);
    togglePopup(!isOpen, item);
  };
  
  
  return (
    <Col className={`${styles.grow} col-5`} onClick={togglePopup2} style={{ cursor: "pointer" }}>
      <div className={`${styles.decorator} align-self-center}`} style={{ fontSize: 10 }}>{item.error_code}</div>
      <Row className={`${styles.outer} d-flex align-items-end`}>
        <Col>
          <Row className="" style={{ marginTop: -35 }}>
            <div style={{ fontSize: 12 }} className="text-center">
              <b>{item.error}</b>
            </div>
          </Row>
          <Row>
            <div style={{ fontSize: 8, color: "#333399" }} className="text-end">
              {item.defect_type}
            </div>
          </Row>
        </Col>
      </Row>
    </Col>
  );
}
