import React, { useEffect, useRef } from 'react';
import Heatmap from './Heatmap';
import HeatmapCanvas from './HeatmapCanvas';
import Roof from '../../images/roof.png';

const Dashboard = () => {
    const coordinates = [
        { x: 100, y: 100 },
        { x: 200, y: 200 },
      ];
    return (
        <>
            <Heatmap />
            {/*<HeatmapCanvas coordinates={coordinates} imageSrc={Roof} />*/}
        </>
    )
};

export default Dashboard;
