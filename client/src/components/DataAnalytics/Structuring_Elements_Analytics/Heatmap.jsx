import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

import roof from '../../../images/roof.png';

const Heatmap = ({ locationIds }) => {
  // Create a reference for the svg container
  const chartRef = useRef(null);

  // This function is called whenever the locationIds prop changes
  useEffect(() => {
    // Define the margins around the chart
    const margin = { top: 10, right: 30, bottom: 30, left: 40 };
    
    // Define the dimensions of the container and chart area
    const containerWidth = 460;
    const containerHeight = 400;
    const width = containerWidth - margin.left - margin.right;
    const height = containerHeight - margin.top - margin.bottom;

    // Select the container and set its dimensions
    const svg = d3
      .select(chartRef.current)
      .attr('width', containerWidth)
      .attr('height', containerHeight)
      .append('g')  // Append a group element to apply margins
      .attr('transform', `translate(${margin.left},${margin.top})`);  // apply the margins

    // Create a new Image object and set its source
    const image = new Image();
    image.src = roof;
    image.onload = function () {
      // Calculate the dimensions and position of the image to maintain its aspect ratio
      const imageWidth = image.width;
      const imageHeight = image.height;
      const scale = Math.min(width / imageWidth, height / imageHeight);
      const scaledWidth = imageWidth * scale;
      const scaledHeight = imageHeight * scale;
      const xOffset = (width - scaledWidth) / 2;
      const yOffset = (height - scaledHeight) / 2;

      // Append the image to the svg container
      svg
        .append('image')
        .attr('xlink:href', roof)
        .attr('x', xOffset)
        .attr('y', yOffset)
        .attr('width', scaledWidth)
        .attr('height', scaledHeight)
        .style('opacity', 1);  // Set the opacity of the image

      // Create scales for the x and y axes
      const x = d3
        .scaleLinear()
        .domain([0, 1])
        .range([xOffset, xOffset + scaledWidth]);
      const y = d3
        .scaleLinear()
        .domain([0, 1])
        .range([yOffset + scaledHeight, yOffset]);

      // Append the x and y axes to the svg container
      svg
        .append('g')
        .attr('transform', `translate(0, ${yOffset + scaledHeight})`)
        .call(d3.axisBottom(x));
      svg.append('g').call(d3.axisLeft(y));

      // Define a function to render the heatmap
      const renderHeatmap = (data) => {
        // Calculate the density data for the heatmap
        const densityData = d3
          .contourDensity()
          .x((d) => x(d.x))
          .y((d) => y(d.y))
          .size([scaledWidth, scaledHeight])
          .bandwidth(9)  // The size of the circles in the heatmap
          (data);

        // Define the color and opacity scales for the heatmap
        const maxDensity = d3.max(densityData, (d) => d.value);
        const color = d3
          .scaleSequentialSqrt(d3.interpolateYlOrRd) // The color scale for the heatmap
          .domain([0, maxDensity]); 
        const opacity = d3.scaleLinear() // The opacity scale for the heatmap
          .domain([0, maxDensity])
          .range([0.3, 0.65]);  // The opacity scale for the heatmap

        // Bind the density data to the path elements
        const paths = svg.selectAll('path').data(densityData);

        // Update the existing path elements
        paths
          .attr('d', d3.geoPath())
          .attr('fill', (d) => color(d.value))
          .style('opacity', (d) => opacity(d.value))
          .attr('stroke', 'none'); //REMOVE BLACK LINES

        // Append new path elements for the new data points
        paths
          .enter()
          .append('path')
          .attr('d', d3.geoPath())
          .attr('fill', (d) => color(d.value))
          .style('opacity', (d) => opacity(d.value))
          .attr('stroke', 'none');

        // Remove the old path elements
        paths.exit().remove();
      };

      // Define a function to fetch the location data
      const fetchData = async () => {
        // Map over the locationIds and fetch the corresponding location data
        const promises = locationIds.map(async (id) => {
          const response = await fetch(`http://localhost:8080/home/locations/${id}`);
          const data = await response.json();
          const dataArray = Array.isArray(data) ? data : [data];

          // Filter the location data
          const filteredData = dataArray.filter((d) => d.type === 'Exact Location');
          if (filteredData.length === 0) {
            return null;
          }

          // Return the x and y coordinates of the location
          return {
            x: filteredData[0].dropLocation[0],
            y: filteredData[0].dropLocation[1],
          };
        });

        // Wait for all the fetch requests to complete
        Promise.all(promises)
          .then((data) => {
            // Filter out any null values from the location data
            const validData = data.filter((d) => d !== null);
            console.log(validData);
            // Render the heatmap with the location data
            renderHeatmap(validData);
          })
          .catch((error) => {
            console.error('Error fetching locations:', error);
          });
      };

      // Fetch the location data
      fetchData();
    };
  }, [locationIds]);  // Depend on the locationIds prop to refetch when it changes

  // Return the svg container
  return <svg ref={chartRef}></svg>;
};

export default Heatmap;