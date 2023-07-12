import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts';
import Card from 'antd/es/card/Card';
import { useState, useEffect } from 'react';
import axios from 'axios';

const BarChart = function BarChart() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchDefectData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/home/defects');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching defect data:', error);
            }
        };

        fetchDefectData();
    }, []);
    return (
        <Card title="Line Chart 2" bordered={true}>
            <div className="chart-container">
                <LineChart
                    width={400}
                    height={280}
                    data={data}
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


export default BarChart;