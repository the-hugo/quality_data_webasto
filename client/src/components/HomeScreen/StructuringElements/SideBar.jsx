import styles from "./sidebar.module.css"
import { navData } from "../../../icons/sidebar";
import { useState } from "react";
import logo from "../../../images/logo.png";
import Col from "react-bootstrap/esm/Col";
import { Link } from "react-router-dom";
import { useEffect } from "react";

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
            className={`col-${open ? '3' : '2'} transition-col`}
            style={{ paddingLeft: 0, transition: 'width 0.3s ease-in' }}
        >
            <div className={open ? styles.sidenav : styles.sidenavClosed}>
                <img src={logo} alt="webasto" className={styles.logo} onClick={toggleOpen} />
                {navData.map(item => {
                    if (item.text === 'Statistics') {
                        return (
                            <Link to="/dashboard" key={item.id}>
                                <div className={styles.sideitem}>
                                    {item.icon}
                                    <span className={open ? styles.linkText : styles.linkTextClosed}>{item.text}</span>
                                </div>
                            </Link>
                        );
                    } else if (item.text === 'Home') {
                        return (
                            <Link to="/" key={item.id}>
                                <div className={styles.sideitem}>
                                    {item.icon}
                                    <span className={open ? styles.linkText : styles.linkTextClosed}>{item.text}</span>
                                </div>
                            </Link>
                        );
                    } else {
                        return (
                            <div key={item.id} className={styles.sideitem} to={item.link}>
                                {item.icon}
                                <span className={open ? styles.linkText : styles.linkTextClosed}>{item.text}</span>
                            </div>
                        );
                    }
                })}
            </div>
        </Col>
    );
}