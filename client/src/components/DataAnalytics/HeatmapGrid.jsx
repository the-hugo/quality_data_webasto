import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

import roof from '../../images/roof.png';

const HeatmapGrid = () => {
    const chartRef = useRef(null);
    const [gridSize, setGridSize] = useState(4); // Initial grid size

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

            const data = [
                { row: 1, column: 1 },
                { row: 1, column: 2 },
                { row: 2, column: 1 },
                { row: 3, column: 3 },
                { row: 4, column: 2 },
                { row: 4, column: 2 },
                { row: 4, column: 2 },
                { row: 4, column: 2 },
                { row: 4, column: 2 },
                { row: 4, column: 2 },
                { row: 4, column: 4 },
            ];

            const combinations = {}; // Object to store the count of combinations

            data.forEach(({ row, column }) => {
                const key = `${row}-${column}`;
                combinations[key] = combinations[key] ? combinations[key] + 1 : 1;
            });



            const x = d3
                .scaleBand()
                .range([xOffset + scaledWidth, xOffset])
                .domain(d3.range(gridSize, 0, -1))


            const y = d3
                .scaleBand()
                .range([yOffset + scaledHeight, yOffset])
                .domain(d3.range(gridSize, 0, -1));




            const maxCount = d3.max(Object.values(combinations));
            const colorScale = d3
                .scaleLinear()
                .domain([0, maxCount])
                .range(['rgba(255, 255, 0, 0.2)', 'rgba(209, 209, 0, 0.8)']);

            svg
                .selectAll('rect')
                .data(data)
                .enter()
                .append('rect')
                .attr('x', (d) => x(d.column))
                .attr('y', (d) => y(d.row))
                .attr('width', x.bandwidth())
                .attr('height', y.bandwidth())
                .attr('fill', (d) => colorScale(combinations[`${d.row}-${d.column}`]));

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
    }, [gridSize]);

    return (
        <div>
            <div>
                Grid Size:
                <input
                    type="number"
                    min="1"
                    value={gridSize}
                    onChange={(e) => setGridSize(parseInt(e.target.value))}
                />
            </div>
            <div ref={chartRef}></div>
        </div>
    );
};

export default HeatmapGrid;
