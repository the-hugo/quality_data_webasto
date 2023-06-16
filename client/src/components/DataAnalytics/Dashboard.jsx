import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

import roof from '../../images/roof.png'; // Replace with the path to your roof image

const Dashboard = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        const margin = { top: 10, right: 30, bottom: 30, left: 40 };
        const width = 460 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        const svg = d3
            .select(chartRef.current)
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // Add the roof image
        svg
            .append('image')
            .attr('xlink:href', roof)
            .attr('width', width)
            .attr('height', height);

        // Sample data
        const data = [
            { x: 0.5, y: 0.5 },
            { x: 0.45, y: 0.55 },
            { x: 0.55, y: 0.45 },
            { x: 0.48, y: 0.52 },
            { x: 0.52, y: 0.48 },
            { x: 0.47, y: 0.5 },
            { x: 0.53, y: 0.5 },
            { x: 0.5, y: 0.47 },
            { x: 0.5, y: 0.53 },
            { x: 0.48, y: 0.48 },
            { x: 0.52, y: 0.52 },
            { x: 0.49, y: 0.51 },
            { x: 0.51, y: 0.49 },
            { x: 0.48, y: 0.5 },
            { x: 0.52, y: 0.5 },
            { x: 0.5, y: 0.48 },
            { x: 0.5, y: 0.52 },
            { x: 0.48, y: 0.47 },
            { x: 0.52, y: 0.53 },
            { x: 0.47, y: 0.48 },
            { x: 0.53, y: 0.52 },
            { x: 0.49, y: 0.5 },
            { x: 0.51, y: 0.5 },
            { x: 0.5, y: 0.49 },
            { x: 0.96, y: 0.96 },
            { x: 0.95, y: 0.95 },
            { x: 0.97, y: 0.95 },
            { x: 0.98, y: 0.97 },
            { x: 0.95, y: 0.98 },
            { x: 0.97, y: 0.98 },
            { x: 0.96, y: 0.94 },
            { x: 0.97, y: 0.94 },
            { x: 0.98, y: 0.96 },
            { x: 0.94, y: 0.97 },
            { x: 0.96, y: 0.99 },
            { x: 0.95, y: 0.99 },
            { x: 0.97, y: 0.99 },
            { x: 0.99, y: 0.97 },
            { x: 0.95, y: 0.96 },
            { x: 0.99, y: 0.95 },
            { x: 0.94, y: 0.98 },
            { x: 0.96, y: 0.98 },
            { x: 0.95, y: 0.94 },
            { x: 0.98, y: 0.94 },
            { x: 0.07027392739273924, y: 0.17833333333333334}
        ];

        // Add more data points from your MongoDB array

        const x = d3
            .scaleLinear()
            .domain([0, 1])
            .range([margin.left, width - margin.right]);
        svg
            .append('g')
            .attr('transform', `translate(0, ${height})`)
            .call(d3.axisBottom(x));

        const y = d3
            .scaleLinear()
            .domain([0, 1])
            .range([height - margin.bottom, margin.top]);
        svg.append('g').call(d3.axisLeft(y));

        const densityData = d3
            .contourDensity()
            .x(function (d) {
                return x(d.x);
            })
            .y(function (d) {
                return y(d.y);
            })
            .size([width, height])
            .bandwidth(1)(data);

// Calculate the maximum density value
        const maxDensity = d3.max(densityData, function (d) {
            return d.value;
        });

        const color = d3.scaleLinear().domain([0, maxDensity]).range(['green', 'red']);

        svg
            .insert('g', 'g')
            .selectAll('path')
            .data(densityData)
            .enter()
            .append('path')
            .attr('d', d3.geoPath())
            .attr('fill', function (d) {
                return color(d.value);
            });

    }, []);

    return <div ref={chartRef}></div>;
};

export default Dashboard;
