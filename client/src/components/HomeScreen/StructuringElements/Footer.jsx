import { Col } from "react-bootstrap";
import styles from './footer.module.css';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowLeft from "./ArrowLeft.jsx"
import ArrowRight from "./ArrowRight.jsx"
import newErrorPopup from "../ErrorSubmission/NewError-popup";

export default function Footer() {
    const clickable = {
        width: "100%",
        padding: "3%",
        // padding: "6%",
        borderWidth: "1px",
        borderRadius: "10px",
        borderColor: "#333399",
        backgroundColor: "#d0e4ff7a",
    }
    return (
        <>
            <Col className="col-4 d-flex align-self-center justify-content-center" style={{}}>
                <ArrowLeft></ArrowLeft>
            </Col>
            <Col className="col-17 d-flex align-self-center justify-content-center" style={{}}>
                <div className={`${styles.switch} ${styles.pointer} d-flex align-self-center justify-content-center`} style={clickable}>
                    <AddCircleOutlineIcon></AddCircleOutlineIcon>
                    <span title="NEW EVENT" style={{ paddingLeft: 6, fontSize: 12, textAlign: "center" }}>NEW EVENT</span>
                </div>
            </Col>
            <Col className="col-4 d-flex align-self-center justify-content-center" style={{}}>
                <ArrowRight></ArrowRight>
            </Col>
        </>
    )
}