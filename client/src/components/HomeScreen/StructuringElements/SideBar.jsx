import styles from "./sidebar.module.css"
import { navData } from "../../../icons/sidebar";
import { useState } from "react";
import logo from "../../../images/logo.png";
import Col from "react-bootstrap/esm/Col";

export default function Sidenav({ onChildStateChange }) {
    const [open, setopen] = useState(false)
    const toggleOpen = () => {
        setopen(!open);
        onChildStateChange(open);
    }
    return (
        <Col className={ open ? "col-2" : "col-1"}  style={{ paddingLeft: 0, transition: 'width 0.3s ease-in'}}>
            <div className={open ? styles.sidenav : styles.sidenavClosed}>
                <img src={logo} alt="webasto" className={styles.logo} onClick={toggleOpen} />
                {navData.map(item => {
                    return <div key={item.id} className={styles.sideitem} to={item.link}>
                        {item.icon}
                        <span className={open ? styles.linkText : styles.linkTextClosed}>{item.text}</span>
                    </div>
                })}
            </div>
        </Col>
    )
}