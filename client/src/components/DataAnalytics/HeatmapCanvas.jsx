import React, { useEffect, useRef } from 'react';


const HeatmapCanvas = ({ imageSrc, coordinates }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const image = new Image();

        image.onload = () => {
            canvas.width = image.width;
            canvas.height = image.height;

            ctx.drawImage(image, 0, 0);

            coordinates.forEach(({ x, y }) => {
                const imageData = ctx.getImageData(x, y, 1, 1);
                const data = imageData.data;
                const intensity = (data[0] + data[1] + data[2]) / 3;

                const red = Math.round((255 - intensity) / 255 * 255);
                const green = Math.round(intensity / 255 * 255);
                const blue = 0;

                ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
                ctx.fillRect(x, y, 1, 1);
            });
        };

        image.src = imageSrc;
    }, [imageSrc, coordinates]);

    return <canvas ref={canvasRef} />;
};

export default HeatmapCanvas;