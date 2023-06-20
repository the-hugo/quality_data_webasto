import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import styles from "./arrow.module.css"

export default function ArrowLeft({ onClick }) {
    return (
        <div className={styles.arrowLeft} style={{ cursor: "pointer" }} onClick={onClick}>
            <ChevronLeftIcon style={{ color: "#333399" }} />
        </div>
    )
}
