import ChevronRightIcon from '@mui/icons-material/ChevronLeft';

export default function ArrowLeft() {
    const buttonStyle = {
        width: "35px",
        borderWidth: "1px",
        borderRadius: "10px",
        paddingTop: "140px",
        paddingBottom: "140px",
        paddingLeft: "4%",
        // paddingRight: "4%",
        borderColor: "#333399",
        backgroundColor: "#9ec8ff"
    }
    return (
        <div style={buttonStyle} className=''>
        <ChevronRightIcon style={{ color: "#333399"  }}></ChevronRightIcon>
        </div>
    )
}