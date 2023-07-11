import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { scaleSequential } from 'd3-scale';
import { interpolateYlOrRd } from 'd3-scale-chromatic';



import roof from '../../../images/roof.png';

const HeatmapGrid = ({ locationIds }) => {
    const chartRef = useRef(null);
    const [gridSize, setGridSize] = useState(4); // Initial grid size
    const [fetchedData, setFetchedData] = useState([]); // Data fetched from the backend

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/home/locations');
                if (response.ok) {
                    const data = await response.json();
                    // Filter data based on type: 'Grid' and locationIds
                    const filteredData = data.filter(
                        (location) => location.type === 'Grid' && locationIds.includes(location._id)
                    );
                    // Extract coordinates from each location object
                    const locations = filteredData.map((location) => ({
                        row: location.dropLocation[0],
                        column: location.dropLocation[1],
                    }));
                    setFetchedData(locations);
                } else {
                    console.error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, [locationIds]);

    useEffect(() => {
        const renderGrid = () => {
            // Proceed with rendering only if fetchedData is not empty
            if (fetchedData.length > 0) {
                const margin = { top: 10, right: 30, bottom: 30, left: 40 };
                const containerWidth = 460;
                const containerHeight = 400;
                const width = containerWidth - margin.left - margin.right;
                const height = containerHeight - margin.top - margin.bottom;

                const svg = d3
                    .select(chartRef.current)
                    .selectAll('svg')
                    .data([null]) // Use data join to select existing SVG or create a new one
                    .join('svg')
                    .attr('width', containerWidth)
                    .attr('height', containerHeight)
                    .append('g')
                    .attr('transform', `translate(${margin.left},${margin.top})`);

                svg.selectAll('*').remove(); // Clear the SVG before rendering

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

                    const combinations = {}; // Object to store the count of combinations

                    fetchedData.forEach(({ row, column }) => {
                        const key = `${row}-${column}`;
                        combinations[key] = combinations[key] ? combinations[key] + 1 : 1;
                    });

                    const x = d3.scaleBand().range([xOffset, xOffset + scaledWidth]).domain(d3.range(1, gridSize + 1));

                    const y = d3.scaleBand().range([yOffset, yOffset + scaledHeight]).domain(d3.range(1, gridSize + 1));

                    const maxCount = d3.max(Object.values(combinations));
                    const colorScale = scaleSequential(interpolateYlOrRd).domain([0, maxCount]);
                    
                    svg
                        .selectAll('rect')
                        .data(fetchedData)
                        .enter()
                        .append('rect')
                        .attr('x', (d) => x(d.column))
                        .attr('y', (d) => y(d.row))
                        .attr('width', x.bandwidth())
                        .attr('height', y.bandwidth())
                        .attr('fill', (d) => {
                            const rgbColor = colorScale(combinations[`${d.row}-${d.column}`]);
                            const color = d3.color(rgbColor); // Convert the RGB color to a d3 color
                            color.opacity = 0.73; // Modify the color's opacity
                            return color; // d3 color objects are automatically converted to a string
                        });

                    // Render vertical grid lines
                    svg
                        .append('g')
                        .selectAll('line')
                        .data(x.domain())
                        .enter()
                        .append('line')
                        .attr('x1', (d) => x(d) + x.bandwidth())
                        .attr('y1', y.range()[0])
                        .attr('x2', (d) => x(d) + x.bandwidth())
                        .attr('y2', y.range()[1])
                        .attr('stroke', 'black')
                        .attr('stroke-width', 1);

                    // Render horizontal grid lines
                    svg
                        .append('g')
                        .selectAll('line')
                        .data(y.domain())
                        .enter()
                        .append('line')
                        .attr('x1', x.range()[0])
                        .attr('y1', (d) => y(d) + y.bandwidth())
                        .attr('x2', x.range()[1])
                        .attr('y2', (d) => y(d) + y.bandwidth())
                        .attr('stroke', 'black')
                        .attr('stroke-width', 1);

                    // Render x-axis
                    svg.append('g').attr('transform', `translate(0, ${yOffset + scaledHeight})`).call(d3.axisBottom(x));

                    // Render y-axis
                    svg.append('g').call(d3.axisLeft(y));
                };
            } else {
                // Remove the SVG element if fetchedData is empty
                d3.select(chartRef.current).selectAll('svg').remove();
            }
        };

        renderGrid();
    }, [gridSize, fetchedData]);

    return (
        <div>
            {fetchedData.length > 0 ? (
                <div ref={chartRef}></div>
            ) : (
                <div>No issues recorded for this filter setting.</div>
            )}
        </div>
    );
};

export default HeatmapGrid;
