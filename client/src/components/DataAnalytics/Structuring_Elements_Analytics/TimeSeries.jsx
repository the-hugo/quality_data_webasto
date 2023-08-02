import React, { useState, useEffect, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Card from 'antd/es/card/Card';

const TimeSeries = ({ filteredData }) => {
  const [keys, setValues] = useState([]);
  const [trendLine, setTrendLine] = useState([]);
  const [mergedData, setMergedData] = useState([]);
  // Generate random colors for each data set (graph) using useMemo.
  const colors = useMemo(() => {
    const randomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    return keys.reduce((result, graph) => {
      result[graph] = randomColor();
      return result;
    }, {});
  }, [keys]);

  useEffect(() => {
    // Function to calculate the trendline of the data using linear regression.
    const calculateTrendLine = (data) => {
      // Prepare x and y data arrays for the linear regression calculation.
      const xData = data.map((item, index) => index);
      const yData = data.map((item) => item.Total);

      // Utility functions for calculations.
      const sum = (arr) => arr.reduce((a, b) => a + b, 0);
      const mean = (arr) => sum(arr) / arr.length;
      const subtractMean = (arr) => arr.map((val) => val - mean(arr));
      const multiplyArrays = (arr1, arr2) => arr1.map((val, index) => val * arr2[index]);
      const square = (num) => num * num;

      // Calculate linear regression coefficients (b0 and b1).
      const xMean = mean(xData);
      const yMean = mean(yData);
      const xMinusMean = subtractMean(xData);
      const yMinusMean = subtractMean(yData);
      const b1 =
        sum(multiplyArrays(xMinusMean, yMinusMean)) / sum(xMinusMean.map((val) => square(val)));
      const b0 = yMean - b1 * xMean;

      // Generate trendline data based on the linear regression model.
      const trendLineData = xData.map((val) => ({
        date: data[val].date,
        Trend: b0 + b1 * val,
      }));

      // Set the trendline data and merge it with the original data.
      setTrendLine(trendLineData);
      const merged = data.map((item, index) => ({
        ...item,
        Trend: trendLineData[index].Trend,
      }));
      setMergedData(merged);
    };

    // Function to fetch and process the defect data.
    const fetchDefectData = async () => {
      try {
        // Format the date and convert it to a string (YYYY-MM-DD).
        const data = filteredData.map((item) => {
          const fullDate = new Date(item.date);
          const formattedDate = fullDate.toISOString().substring(0, 10);
          return {
            ...item,
            date: formattedDate,
          };
        });

        // Group defect counts by date and error type using reduce.
        const dailyCounts = data.reduce((counts, item) => {
          const { date, error_type, category } = item;

          if (!counts[date]) {
            counts[date] = {
              Total: 0,
              Damage: 0,
              Surface: 0,
              Dimension: 0,
              Assembly: 0,
            };
          }

          counts[date][error_type] = (counts[date][error_type] || 0) + 1;

          switch (category) {
            case 'Damage':
              counts[date].Damage++;
              counts[date].Total++;
              break;
            case 'Surface/Finish':
              counts[date].Surface++;
              counts[date].Total++;
              break;
            case 'Dimension':
              counts[date].Dimension++;
              counts[date].Total++;
              break;
            case 'Assembly/Fitting':
              counts[date].Assembly++;
              counts[date].Total++;
              break;
            default:
              break;
          }

          return counts;
        }, {});

        // Convert the grouped data back to an array of objects with date and counts.
        const dailyCountsArray = Object.entries(dailyCounts).map(([date, counts]) => ({
          date,
          ...counts,
        }));

        // Extract the keys (error types) from the data for rendering the lines in the chart.
        const keys = Object.keys(dailyCountsArray[1]);
        const index = keys.indexOf('date');
        keys.splice(index, 1);
        setValues(keys);

        // Calculate and set the trendline for the data.
        calculateTrendLine(dailyCountsArray);
      } catch (error) {
        console.error('Error fetching defect data:', error);
      }
    };

    // Fetch and process defect data when the filteredData prop changes.
    if (filteredData.length > 0) {
      fetchDefectData();
    }
  }, [filteredData]);

  return (
    // Return a card containing the line chart with the merged data and trendline.
    <Card title="Defects Over Time" bordered>
      <LineChart width={620} height={380} data={mergedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" type="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        {trendLine.length > 0 && (
          // Render the trendline as a line in the chart.
          <Line type="linear" data={mergedData} dataKey="Trend" stroke="#000000" strokeWidth={2} dot={false} />
        )}
        {keys.map((graph) => (
          // Render each line for the error types (graphs) using the corresponding color.
          <Line key={graph} type="monotone" dataKey={graph} stroke={colors[graph]} />
        ))}
      </LineChart>
    </Card>
  );
};

export default TimeSeries;