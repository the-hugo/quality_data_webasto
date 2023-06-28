import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

import roof from '../../images/roof.png';

const Heatmap = ({ locationIds }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const margin = { top: 10, right: 30, bottom: 30, left: 40 };
    const containerWidth = 460;
    const containerHeight = 400;
    const width = containerWidth - margin.left - margin.right;
    const height = containerHeight - margin.top - margin.bottom;

    const svg = d3
      .select(chartRef.current)
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

      // Define the scales for x and y axes based on the image size and coordinates
      const x = d3
        .scaleLinear()
        .domain([0, 1])
        .range([xOffset, xOffset + scaledWidth]);
      const y = d3
        .scaleLinear()
        .domain([0, 1])
        .range([yOffset + scaledHeight, yOffset]);

      // Render x-axis
      svg
        .append('g')
        .attr('transform', `translate(0, ${yOffset + scaledHeight})`)
        .call(d3.axisBottom(x));

      // Render y-axis
      svg.append('g').call(d3.axisLeft(y));

      const renderHeatmap = (data) => {
        // Generate density data for the heatmap
        const densityData = d3
          .contourDensity()
          .x((d) => x(d.x))
          .y((d) => y(d.y))
          .size([scaledWidth, scaledHeight])
          .bandwidth(1)(data);

        // Calculate the maximum density value
        const maxDensity = d3.max(densityData, (d) => d.value);

        // Define the color scale for the heatmap
        const color = d3
          .scaleLinear()
          .domain([0, maxDensity])
          .range(['yellow', 'darkred']);

        // Select the heatmap paths
        const paths = svg.selectAll('path').data(densityData);

        // Update existing paths
        paths.attr('d', d3.geoPath()).attr('fill', (d) => color(d.value));

        // Append new paths
        paths
          .enter()
          .append('path')
          .attr('d', d3.geoPath())
          .attr('fill', (d) => color(d.value));

        // Remove unnecessary paths
        paths.exit().remove();
      };

      // Fetch location data from the server using location IDs
      const fetchData = async () => {
        const promises = locationIds.map(async (id) => {
          const response = await fetch(
            `http://localhost:8080/home/locations/${id}`
          );
          const data = await response.json();

          // Handle non-array response
          const dataArray = Array.isArray(data) ? data : [data];

          const filteredData = dataArray.filter(
            (d) => d.type === 'Exact Location'
          );
          if (filteredData.length === 0) {
            return null;
          }

          return {
            x: filteredData[0].dropLocation[0],
            y: filteredData[0].dropLocation[1],
          };
        });

        Promise.all(promises)
          .then((data) => {
            const validData = data.filter((d) => d !== null); // Filter out null values
            console.log(validData); // Here we can see the data for each location
            renderHeatmap(validData);
          })
          .catch((error) => {
            console.error('Error fetching locations:', error);
          });
      };

      fetchData();
    };
  }, [locationIds]); // Include locationIds in the dependency array to refetch when it changes

  return <svg ref={chartRef}></svg>;
};

export default Heatmap;
