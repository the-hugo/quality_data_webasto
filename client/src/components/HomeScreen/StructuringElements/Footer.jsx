import { Col } from "react-bootstrap";
import styles from './footer.module.css';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import SearchIcon from '@mui/icons-material/Search';

export default function Footer() {
    const clickable = {
        // width: "90%",
        padding: "6%",
        // padding: "6%",
        borderWidth: "1px",
        borderRadius: "10px",
        borderColor: "#333399",
        backgroundColor: "#d0e4ff7a",
    }
    return (
        <>
            <Col className="col-5 d-flex align-self-center justify-content-center">
                <div className={`${styles.switch} ${styles.pointer} d-flex w-100 d-flex align-self-center justify-content-center`} style={clickable}>
                    <ContentPasteSearchIcon></ContentPasteSearchIcon>
                    <span title="PRODUCT PROFILE" style={{ paddingLeft: 6, fontSize: 14 }}>PRODUCT PROFILE</span>
                </div>
            </Col>
            <Col className="col-5 d-flex align-self-center justify-content-center">
                <div className={`${styles.switch} ${styles.pointer} d-flex w-100 d-flex align-self-center justify-content-center`} style={clickable}>
                    <AddCircleOutlineIcon></AddCircleOutlineIcon>
                    <span title="NEW EVENT" style={{ paddingLeft: 6, fontSize: 14 }}>NEW EVENT</span>
                </div>
            </Col>
            <Col className="col-1 d-flex align-self-center justify-content-center">
                <SearchIcon className={styles.icon} style={clickable}></SearchIcon>
            </Col>
        </>
    )
}