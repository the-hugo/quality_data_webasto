import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import styles from "./arrow.module.css"

export default function ArrowRight() {

    return (
        <div className={styles.arrowRight} style={{cursor: "pointer"}}>
            <ChevronRightIcon style={{ color: "#333399" }}></ChevronRightIcon>
        </div>
    )
}