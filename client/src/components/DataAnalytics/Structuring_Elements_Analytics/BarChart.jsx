import { useState, useEffect } from 'react';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import Card from 'antd/es/card/Card';

const BarChartComp = function ({ filteredData }) {
  const [data, setData] = useState([]);
  // Effect hook to calculate daily counts of defect action types when filteredData changes.
  useEffect(() => {
    // Function to calculate daily counts of defect action types.
    const calculateDailyCounts = () => {
      // Initialize an array of objects to hold the counts for each action type.
      const counts = [
        {
          name: 'Scrap',
          Sum: 0,
        },
        {
          name: 'Anomaly',
          Sum: 0,
        },
        {
          name: 'Rework',
          Sum: 0,
        },
        {
          name: 'Total',
          Sum: 0,
        }
      ];

      // Loop through each item in the filteredData and update the corresponding counts.
      for (const item of filteredData) {
        const { action_type } = item;
        counts.find(count => count.name === action_type).Sum += 1;
        counts.find(count => count.name === 'Total').Sum += 1;
      }

      // Set the data with the calculated daily counts.
      setData(counts);
    };

    // Call the calculateDailyCounts function to update the data.
    calculateDailyCounts();
  }, [filteredData]);

  // Render the Bar Chart component with the data and chart settings.
  return (
    <Card title="Defect Action Types" bordered={true}>
      <BarChart width={620} height={380} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {/* Render a Bar component for displaying the Sum of each action type. */}
        <Bar dataKey="Sum" fill='#333399' />
      </BarChart>
    </Card>
  );
};

// Export the BarChartComp component for use in other parts of the application.
export default BarChartComp;