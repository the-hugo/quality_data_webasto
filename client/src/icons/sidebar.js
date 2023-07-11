import HomeIcon from '@mui/icons-material/Home';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import BarChartIcon from '@mui/icons-material/BarChart';
 
export const navData = [
    {
        id: 0,
        icon: <HomeIcon/>,
        text: "Home",
        link: "/"
    },
    {
        id: 1,
        icon: <TravelExploreIcon/>,
        text: "Explore",
        link: "/explore"
    },
    {
        id: 2,
        icon: <BarChartIcon/>,
        text: "Statistics",
        link: "/statistics"
    }
]
export default navData;