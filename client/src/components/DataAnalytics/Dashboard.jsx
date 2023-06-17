import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

import roof from '../../images/roof.png'; // Replace with the path to your roof image

const Dashboard = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        const margin = { top: 10, right: 30, bottom: 30, left: 40 };
        const containerWidth = 460;
        const containerHeight = 400;
        const width = containerWidth - margin.left - margin.right;
        const height = containerHeight - margin.top - margin.bottom;

        const svg = d3
            .select(chartRef.current)
            .append('svg')
            .attr('width', containerWidth)
            .attr('height', containerHeight)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const image = new Image();
        image.src = roof;
        image.onload = function () {
            const imageWidth = image.width;
            const imageHeight = image.height;

            const scale = Math.min(width / imageWidth, height / imageHeight);
            const scaledWidth = imageWidth * scale;
            const scaledHeight = imageHeight * scale;
            const xOffset = (width - scaledWidth) / 2;
            const yOffset = (height - scaledHeight) / 2;

            svg
                .append('image')
                .attr('xlink:href', roof)
                .attr('x', xOffset)
                .attr('y', yOffset)
                .attr('width', scaledWidth)
                .attr('height', scaledHeight);

            // Rest of the code for heatmap generation
            // Sample data
            const data = [
                { x: 0.07027392739273924, y: 0.17833333333333334},
                { x: 0.9297260726072608, y: 0.9216666666666666},
                { x: 0.7297260726072608, y: 0.8216666666666666}
                // Add more data points as needed
            ];


            const x = d3.scaleLinear().domain([0, 1]).range([xOffset, xOffset + scaledWidth]);
            svg.append('g').attr('transform', `translate(0, ${yOffset + scaledHeight})`).call(d3.axisBottom(x));

            const y = d3.scaleLinear().domain([0, 1]).range([yOffset + scaledHeight, yOffset]);
            svg.append('g').call(d3.axisLeft(y));

            const densityData = d3
                .contourDensity()
                .x(function (d) {
                    return x(d.x);
                })
                .y(function (d) {
                    return y(d.y);
                })
                .size([scaledWidth, scaledHeight])
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
        };
    }, []);

    return <div ref={chartRef}></div>;
};

export default Dashboard;
