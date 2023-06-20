import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import styles from "./arrow.module.css"

export default function ArrowRight({ onClick }) {
    return (
        <div className={styles.arrowRight} style={{ cursor: "pointer" }} onClick={onClick}>
            <ChevronRightIcon style={{ color: "#333399" }} />
        </div>
    )
}
