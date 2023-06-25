import React, { useState, useRef, useEffect } from 'react';
import roof from "../../../images/roof.png";

const ImageGrid = () => {
  const [selectedLocations, setSelectedLocations] = useState([]);
  const imageRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const gridSize = 4; // Number of grid cells per row/column

  useEffect(() => {
    if (imageRef.current) {
      const { clientWidth, clientHeight } = imageRef.current.parentElement;
      setContainerSize({ width: clientWidth, height: clientHeight });
    }
  }, [imageRef.current]);

  const calculateGridCellStyle = (row, col) => {
    if (!imageRef.current) return {}; // Return empty object if imageRef.current is null

    const containerAspectRatio = containerSize.width / containerSize.height;
    const imageAspectRatio = imageRef.current.naturalWidth / imageRef.current.naturalHeight;

    let cellWidth, cellHeight;
    if (containerAspectRatio > imageAspectRatio) {
      cellWidth = containerSize.height * imageAspectRatio / gridSize;
      cellHeight = containerSize.height / gridSize;
    } else {
      cellWidth = containerSize.width / gridSize;
      cellHeight = containerSize.width / imageAspectRatio / gridSize;
    }

    const imageOffsetX = (containerSize.width - imageRef.current.offsetWidth) / 2;
    const imageOffsetY = (containerSize.height - imageRef.current.offsetHeight) / 2;

    const gridOffsetX = (containerSize.width - cellWidth * gridSize) / 2;
    const gridOffsetY = (containerSize.height - cellHeight * gridSize) / 2;

    return {
      position: 'absolute',
      border: '1px solid red',
      top: `${row * cellHeight + gridOffsetY + imageOffsetY}px`,
      left: `${col * cellWidth + gridOffsetX + imageOffsetX}px`,
      width: `${cellWidth}px`,
      height: `${cellHeight}px`,
      backgroundColor: selectedLocations.some(
          location => location.row === row + 1 && location.col === col + 1
      )
          ? 'yellow'
          : 'transparent',
    };
  };

  const pushGridLocations = async () => {
    if (selectedLocations.length > 0) {
      const errorNum = 2; // Replace with your custom error number

      try {
        for (const location of selectedLocations) {
          const data = {
            error_num: errorNum,
            dropLocation: [ location.row, location.col ],
            type: "Grid",
          };

          const response = await fetch('http://localhost:8080/home/locations', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });

          if (response.ok) {
            console.log('Location created successfully:', location);
          } else {
            console.error('Failed to create location:', location);
          }
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        // Clear the selected locations after all locations are submitted
        setSelectedLocations([]);
      }
    }
  };

  const handleGridClick = (row, col) => {
    const location = { row, col };
    const isSelected = selectedLocations.some(
        loc => loc.row === location.row && loc.col === location.col
    );

    if (isSelected) {
      setSelectedLocations(selectedLocations.filter(
          loc => loc.row !== location.row || loc.col !== location.col
      ));
    } else {
      setSelectedLocations([...selectedLocations, location]);
    }
  };

  // Log currently selected locations to the console
  useEffect(() => {
    console.log('Selected Locations:', selectedLocations);
  }, [selectedLocations]);

  return (
      <div className="gridMap-render" style={{ marginLeft: '15%' }}>
        <div className="imgBackground-grid">
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <img
                  className="gridImg"
                  ref={imageRef}
                  src={roof}
                  alt="Your Image"
              />
              <div className="grid-render">
                {Array.from({ length: gridSize }, (_, row) =>
                    Array.from({ length: gridSize }, (_, col) => {
                      const gridId = row * gridSize + col + 1;
                      return (
                          <div
                              key={gridId}
                              style={calculateGridCellStyle(row, col)}
                              onClick={() => handleGridClick(row + 1, col + 1)}
                          ></div>
                      );
                    })
                )}
              </div>
            </div>
          </div>
        </div>
        <button className="pushGridLoc-btn" onClick={pushGridLocations}>
          Save Locations
        </button>
      </div>
  );
};

export default ImageGrid;
