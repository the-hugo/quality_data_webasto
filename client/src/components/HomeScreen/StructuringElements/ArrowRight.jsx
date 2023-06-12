import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function ArrowRight() {
    const buttonStyle = {
        width: "35px",
        borderWidth: "1px",
        borderRadius: "10px",
        paddingTop: "140px",
        paddingBottom: "140px",
        paddingLeft: "5%",
        // paddingRight: "4%",
        borderColor: "#333399",
        backgroundColor: "#90c0ff"
    }
    return (
        <div style={buttonStyle}>
            <ChevronRightIcon style={{ color: "#333399" }}></ChevronRightIcon>
        </div>
    )
}