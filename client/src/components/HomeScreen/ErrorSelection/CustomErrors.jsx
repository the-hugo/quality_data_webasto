import styles from "./custom.module.css";
import { Col, Row } from "react-bootstrap";
import { useState } from "react";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';

export default function CustomError({ togglePopup, item }) {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup2 = () => {
    setIsOpen((prevState) => !prevState);
    togglePopup(!isOpen, item);
  };
  
  console.log(item.need_location)
  if (item.need_location === "1") {
    return (
      <Col className={`${styles.grow} col-7`} onClick={togglePopup2} style={{ cursor: "pointer" }}>
        <Row className={`${styles.decorator} align-self-center}`} style={{ fontSize: 10, background: item.color }}>
          <Col>
            {item.error_code}
          </Col>
          <Col className={styles.location2}>
            <AddLocationAltIcon style={{ color: "#333399" }}></AddLocationAltIcon>
          </Col>
        </Row>
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
      </Col>)
  } else {
    return (<Col className={`${styles.grow} col-7`} onClick={togglePopup2} style={{ cursor: "pointer" }}>
      <Row className={`${styles.decorator} align-self-center}`} style={{ fontSize: 10, background: item.color }}>
        <Col>
          {item.error_code}
        </Col>
      </Row>
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
    </Col>)
  }

}
