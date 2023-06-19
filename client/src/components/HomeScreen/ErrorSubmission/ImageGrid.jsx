import React, { useState, useRef, useEffect } from 'react';
import roof from "../../../images/roof.png";

const ImageGrid = () => {
    const [selectedGrid, setSelectedGrid] = useState([]);
    const imageRef = useRef(null);
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const gridSize = 3; // Number of grid cells per row/column

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
        };
    };


    const handleGridClick = (gridId) => {
        setSelectedGrid((prevSelectedGrid) => [...prevSelectedGrid, gridId]);
        console.log('Selected Grid:', gridId);
    };

    return (
        <div
            style={{
                position: 'relative',
                width: '500px',
                height: '300px',
                border: '1px black solid',
                overflow: 'hidden',
                backgroundColor: '#eee',
            }}
        >
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <img
                        ref={imageRef}
                        src={roof}
                        alt="Your Image"
                        style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                        {Array.from({ length: gridSize }, (_, row) =>
                            Array.from({ length: gridSize }, (_, col) => {
                                const gridId = row * gridSize + col + 1;
                                return (
                                    <div
                                        key={gridId}
                                        style={calculateGridCellStyle(row, col)}
                                        onClick={() => handleGridClick(gridId)}
                                    ></div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageGrid;
