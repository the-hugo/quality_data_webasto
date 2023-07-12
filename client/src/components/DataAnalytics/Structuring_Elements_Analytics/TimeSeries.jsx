import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts';
import { useState, useEffect } from 'react';
import Card from 'antd/es/card/Card';


const TimeSeries = function Timeseries({ filteredData }) {
    const [timeseries, setSeries] = useState([])

    useEffect(() => {
        const fetchDefectData = () => {
            try {
                const data = filteredData
                const dailyCounts = {};
                console.log("DATA", data)
                for (let i = 0; i < data.length; i++) {
                    const fullDate = new Date(data[i].date);
                    const formattedDate = fullDate.toISOString().substring(0, 10);
                    data[i].date = formattedDate;

                    const currentDate = formattedDate;
                    const errorCategory = data[i].category;

                    if (!dailyCounts[currentDate]) {
                        dailyCounts[currentDate] = {
                            totalCount: 0,
                            damageCount: 0,
                            surfaceCount: 0,
                            dimensionCount: 0,
                            assemblyCount: 0,
                        };
                    }
                    if (dailyCounts[currentDate][data[i].error_type]) {
                        dailyCounts[currentDate][data[i].error_type]++;
                    } else {
                        dailyCounts[currentDate][data[i].error_type] = 0
                    }
                    switch (errorCategory) {
                        case 'Damage':
                            dailyCounts[currentDate].damageCount++;
                            dailyCounts[currentDate].totalCount++;
                            break;
                        case 'Surface/Finish':
                            dailyCounts[currentDate].surfaceCount++;
                            dailyCounts[currentDate].totalCount++;
                            break;
                        case 'Dimension':
                            dailyCounts[currentDate].dimensionCount++;
                            dailyCounts[currentDate].totalCount++;
                            break;
                        case 'Assembly/Fitting':
                            dailyCounts[currentDate].assemblyCount++;
                            dailyCounts[currentDate].totalCount++;
                            break;
                        default:
                            break;
                    }
                }

                console.log('counts', dailyCounts);
                setSeries(timeseries.concat(dailyCounts));
            } catch (error) {
                console.error('Error fetching defect data:', error);
            }
        };

        fetchDefectData();
    }, [filteredData]);



    return (
        <Card title="Line Chart 1" bordered={true}>
            <div className="chart-container">
                <LineChart
                    width={400}
                    height={280}
                    data={timeseries}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="pv"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                    />
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
            </div>
        </Card>
    )
}

export default TimeSeries;