// import { useState, useEffect, useMemo } from 'react';
// import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Line } from 'recharts';
// import Card from 'antd/es/card/Card';


// const BarChartComp = function({ filteredData }) {


//   return (
//     <Card title="Bar Chart 1" bordered={true}>
//       <div className="chart-container">
//         <BarChart width={400} height={280} data={timeseries} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           {keys.map((graph) => (
//             <Bar key={graph} dataKey={graph} fill={colors[graph]} />
//           ))}
//           {trendLine.length > 0 && (
//             <Line
//               key="Trend Line"
//               type="linear"
//               data={trendLine}
//               dataKey="y"
//               stroke="#000000"
//               strokeWidth={2}
//               dot={false}
//             />
//           )}
//         </BarChart>
//       </div>
//     </Card>
//   );
// };

// export default BarChartComp;
