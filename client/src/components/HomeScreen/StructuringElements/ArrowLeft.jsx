import ChevronRightIcon from '@mui/icons-material/ChevronLeft';
import styles from "./arrow.module.css"

export default function ArrowLeft() {

    return (
        <div className={styles.arrowLeft}>
        <ChevronRightIcon style={{ color: "#333399"  }}></ChevronRightIcon>
        </div>
    )
}