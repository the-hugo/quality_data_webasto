import styles from "./sidebar.module.css"
import { navData } from "../../../icons/sidebar";
import { useState } from "react";
import logo from "../../../images/logo.png";
import Col from "react-bootstrap/esm/Col";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Row from "react-bootstrap/esm/Row";

export default function Sidenav({ onChildStateChange }) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        onChildStateChange(open);
    }, [open, onChildStateChange]);

    const toggleOpen = () => {
        setOpen(!open);
    };

    return (
        <Col
            className={`${open ? 'col-4 ' + styles.sidenav : 'col-2 ' + styles.sidenavClosed} transition-col`}
            style={{ transition: 'width 0.3s ease-in' }}
        >
            <Row className="d-flex justify-content-center" style={{ paddingBottom: "40%" }}>
                <Col className="col d-flex justify-content-center">
                    {/* <svg onClick={toggleOpen} src={logo} width="100%" height="100%" viewBox="0 0 24 24">
                    </svg> */}
                    <img onClick={toggleOpen} src={logo} alt="webasto" className={styles.logo} />
                </Col>
            </Row>
            {navData.map(item => {
                if (item.text === 'Statistics') {
                    return (
                        <Row key={item.id} className={`${styles.sideitem}`} style={{ paddingBottom: "12%", paddingTop: "12%" }}>
                            <Col className={`d-flex transition-col ${open ? 'justify-content-start' : 'justify-content-center'}`}>
                                <Link to="/dashboard" key={item.id} style={{ backgroundColor: "transparent" }}>
                                    <div className="d-flex align-items-center">
                                        {item.icon}
                                        <span className={`${open ? styles.linkText : styles.linkTextClosed} align-self-end`} style={{ paddingLeft: "15%" }}>
                                            {item.text}
                                        </span>
                                    </div>
                                </Link>
                            </Col>
                        </Row>

                    );
                } else if (item.text === 'Home') {
                    return (
                        <Row  key={item.id} className={`${styles.sideitem}`} style={{ paddingBottom: "12%", paddingTop: "12%" }}>
                            <Link to="/" style={{ backgroundColor: "transparent" }}>
                                <Col className={`d-flex transition-col ${open ? 'justify-content-start' : 'justify-content-center'}`}>
                                    <div className="d-flex align-items-center">
                                        {item.icon}
                                        <span className={`${open ? styles.linkText : styles.linkTextClosed} align-self-end`} style={{ paddingLeft: "15%" }}>
                                            {item.text}
                                        </span>
                                    </div>
                                </Col>
                            </Link>
                        </Row>
                    );
                } else {
                    return (
                        <Row key={item.id}  className={`${styles.sideitem}`} style={{ paddingBottom: "12%", paddingTop: "12%" }}>
                            <Col className={`d-flex transition-col ${open ? 'justify-content-start' : 'justify-content-center'}`}>
                                <div className="d-flex align-items-center">
                                    {item.icon}
                                    <span className={`${open ? styles.linkText : styles.linkTextClosed} align-self-end`} style={{ paddingLeft: "15%" }}>
                                        {item.text}
                                    </span>
                                </div>
                            </Col>
                        </Row>

                    );
                }
            })}
        </Col>
    );
}