import ChevronRightIcon from '@mui/icons-material/ChevronLeft';
import styles from "./arrow.module.css"

export default function ArrowLeft() {
    return (
        <div className={styles.arrowLeft} style={{cursor: "pointer"}}>
        <ChevronRightIcon style={{ color: "#333399"  }}></ChevronRightIcon>
        </div>
    )
}