import React, { useEffect, useRef } from 'react';
import roof from "../../../images/roof.png";
import {
    ArrowCircleDownOutlined,
    ArrowCircleLeftOutlined,
    ArrowCircleRightOutlined,
    ArrowCircleUpOutlined,
    DomainVerificationOutlined,
} from '@mui/icons-material';


const ImageMap = () => {
    const containerRef = useRef(null);
    const pinRef = useRef(null);
    const imgRef = useRef(null);

    const handleMoveUp = () => {
        const minY = window.pinner.y_lb;
        const newY = window.pinner.adjY - 5;

        if (newY >= minY) {
            window.pinner.movePointer(0, -5);
        } else {
            window.pinner.movePointer(0, minY - window.pinner.adjY);
        }
    };

    const handleMoveDown = () => {
        const maxY = window.pinner.y_ub;
        const newY = window.pinner.adjY + 5;

        if (newY <= maxY) {
            window.pinner.movePointer(0, 5);
        } else {
            window.pinner.movePointer(0, maxY - window.pinner.adjY);
        }
    };

    const handleMoveLeft = () => {
        const minX = window.pinner.x_lb;
        const newX = window.pinner.adjX - 5;

        if (newX >= minX) {
            window.pinner.movePointer(-5, 0);
        } else {
            window.pinner.movePointer(minX - window.pinner.adjX, 0);
        }
    };

    const handleMoveRight = () => {
        const maxX = window.pinner.x_ub;
        const newX = window.pinner.adjX + 5;

        if (newX <= maxX) {
            window.pinner.movePointer(5, 0);
        } else {
            window.pinner.movePointer(maxX - window.pinner.adjX, 0);
        }
    };


    useEffect(() => {
        class Pinner {
            constructor(config) {
                console.log('Initializing...');
                this.initRefs(config.refs);
                this.initImgSrc(config.imgSrc);
                this.initListeners();
                this.initProps(config.props);
            }

            initRefs(refs) {
                this.containerRef = refs.containerRef.current;
                this.pinRef = refs.pinRef.current;
                this.imgRef = refs.imgRef.current;
            }

            initImgSrc(src) {
                this.imgRef.src = src;
                // Example image sources:
                // this.imgRef.src = 'https://storage.googleapis.com/ifca-assets/london.png'; // normal
                // this.imgRef.src = 'https://storage.googleapis.com/ifca-assets/long.png'; // long
                // this.imgRef.src = 'https://storage.googleapis.com/ifca-assets/tall.png'; // tall
            }

            initListeners() {
                this.containerRef.addEventListener('click', this.onClick.bind(this));
            }

            initProps(props) {
                this.clientX = props.clientX || 0.0;
                this.clientY = props.clientY || 0.0;
                this.cTop = props.cTop || 0.0;
                this.cLeft = props.cLeft || 0.0;
                this.cWidth = props.cWidth || 0.0;
                this.cHeight = props.cHeight || 0.0;
                this.nRatio = props.nRatio || 0.0;
                this.cRatio = props.cRatio || 0.0;
                this.diWidth = props.diWidth || 0.0;
                this.diHeight = props.diHeight || 0.0;
                this.x_lb = props.x_lb || 0.0;
                this.x_ub = props.x_ub || 0.0;
                this.y_lb = props.y_lb || 0.0;
                this.y_ub = props.y_ub || 0.0;
                this.cX = props.cX || 0.0;
                this.cY = props.cY || 0.0;
                this.adjX = props.adjX || 0.0;
                this.adjY = props.adjY || 0.0;
                this.diX = props.diX || 0.0;
                this.diY = props.diY || 0.0;
                this.dropLocation = props.dropLocation || [0.0, 1.0];
            }

            log() {
                const result = {
                    clientX: this.clientX,
                    clientY: this.clientY,
                    cTop: this.cTop,
                    cLeft: this.cLeft,
                    cWidth: this.cWidth,
                    cHeight: this.cHeight,
                    diWidth: this.diWidth,
                    diHeight: this.diHeight,
                    nRatio: this.nRatio,
                    cRatio: this.cRatio,
                    x_lb: this.x_lb,
                    x_ub: this.x_ub,
                    y_lb: this.y_lb,
                    y_ub: this.y_ub,
                    cX: this.cX,
                    cY: this.cY,
                    adjX: this.adjX,
                    adjY: this.adjY,
                    diX: this.diX,
                    diY: this.diY,
                    dropLocation: this.dropLocation,
                };

                console.log(JSON.stringify(result, null, 2));
            }

            logDropLocation() {
                this.log();
            }

            setPinLocation(dropLocation) {
                this.adjX = dropLocation[0] + this.x_lb;
                this.adjY = dropLocation[1] + this.y_lb;
            }

            movePointer(dx, dy) {
                this.adjX += dx;
                this.adjY += dy;
                this.renderPin();
                this.diX = this.adjX - this.x_lb;
                this.diY = this.adjY - this.y_lb;
                this.dropLocation = [this.diX / this.diWidth, this.diY / this.diHeight];
                this.log();
            }

            renderPin() {
                this.pinRef.style.left = this.adjX + 'px';
                this.pinRef.style.top = this.adjY + 'px';
            }

            onClick(e) {
                this.clientX = e.clientX;
                this.clientY = e.clientY;

                const {
                    top: cTop,
                    left: cLeft,
                    width: cWidth,
                    height: cHeight,
                } = this.containerRef.getBoundingClientRect();

                this.cTop = cTop;
                this.cLeft = cLeft;
                this.cWidth = cWidth;
                this.cHeight = cHeight;

                this.cX = this.clientX - cLeft;
                this.cY = this.clientY - cTop;

                this.nRatio = this.imgRef.naturalWidth / this.imgRef.naturalHeight;
                this.cRatio = this.cWidth / this.cHeight;

                if (this.nRatio < 1) {
                    this.diHeight = this.cWidth / this.nRatio;
                    this.diWidth = this.nRatio * this.diHeight;
                } else {
                    this.diWidth = this.nRatio * this.cHeight;
                    this.diHeight = this.diWidth / this.nRatio;
                }

                this.x_lb = (this.cWidth - this.diWidth) / 2;
                this.x_ub = this.x_lb + this.diWidth;

                this.y_lb = (this.cHeight - this.diHeight) / 2;
                this.y_ub = this.y_lb + this.diHeight;

                this.adjX = (() => {
                    if (this.cX < this.x_lb) return this.x_lb;
                    if (this.cX > this.x_ub) return this.x_ub;
                    return this.cX;
                })();

                this.adjY = (() => {
                    if (this.cY < this.y_lb) return this.y_lb;
                    if (this.cY > this.y_ub) return this.y_ub;
                    return this.cY;
                })();

                this.renderPin();

                this.diX = this.adjX - this.x_lb;
                this.diY = this.adjY - this.y_lb;

                this.dropLocation = [
                    this.diX / this.diWidth,
                    1 - (this.diY / this.diHeight),
                ];

                this.log();
            }
        }

        window.pinner = new Pinner({
            refs: {
                containerRef,
                pinRef,
                imgRef,
            },
            // imgSrc: 'http://www.lonelyplanet.com/maps/north-america/usa/new-york-city/map_of_new-york-city.jpg',
            //imgSrc: 'https://storage.googleapis.com/ifca-assets/london.png', // normal
            // imgSrc: 'https://storage.googleapis.com/ifca-assets/long.png', // long
            imgSrc: roof, // Update the image path

            props: {},
        });
    }, []);

    const handleLogDropLocation = async () => {
        if (window.pinner) {
          const { dropLocation } = window.pinner;
      
          const errorNum = 1; // Replace with your custom error number
      
          const data = {
            error_num: errorNum,
            dropLocation,
            type: "Exact Location",
          };
      
          try {
            const response = await fetch('http://localhost:8080/home/locations', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });
      
            if (response.ok) {
              console.log('Location created successfully');
            } else {
              console.error('Failed to create location');
            }
          } catch (error) {
            console.error('Error:', error);
          }
        }
      };


    return (
        <>
            <p>
                Click anywhere in the map area below to see the red square move to the
                position of your click.
            </p>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div
                    id="container"
                    ref={containerRef}
                    style={{
                        position: 'relative',
                        width: '500px',
                        height: '300px',
                        border: '1px black solid',
                        overflow: 'hidden',
                        backgroundColor: '#eee',
                        cursor: 'pointer',
                    }}
                >
                    <img
                        id="img"
                        ref={imgRef}
                        alt=""
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                        }}
                    />
                    <div
                        id="pin"
                        ref={pinRef}
                        style={{
                            position: 'absolute',
                            width: '8px',
                            height: '8px',
                            backgroundColor: 'red',
                            transition: 'all 0.5s',
                            transform: 'translate(-50%, -50%)',
                        }}
                    ></div>
                </div>
                <div style={{ marginLeft: '16px' }}>
                    <div style={{ display: 'grid', gridTemplateRows: '1fr auto 1fr', gap: '8px' }}>
                        <button onClick={handleMoveUp}>
                            <ArrowCircleUpOutlined />
                        </button>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <button onClick={handleMoveLeft}>
                                <ArrowCircleLeftOutlined />
                            </button>
                            <button onClick={handleMoveRight}>
                                <ArrowCircleRightOutlined />
                            </button>
                        </div>
                        <button onClick={handleMoveDown}>
                            <ArrowCircleDownOutlined />
                        </button>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <button
                            style={{
                                background: '#0069eb',
                                borderRadius: '30px',
                                border: 'none',
                                color: '#fff',
                                fontSize: '16px',
                                padding: '15px 30px',
                                textDecoration: 'none',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                            onClick={handleLogDropLocation}
                        >
                            Submit
                            <span
                                style={{
                                    width: '1px',
                                    borderRight: '1px solid #fff',
                                    height: '16px',
                                    margin: '0 0 0 10px',
                                }}
                            ></span>
                            <DomainVerificationOutlined style={{ fontSize: '20px', marginLeft: '10px' }} />
                        </button>
                        
                    </div>
                </div>
            </div>
        </>
    );
};

export default ImageMap;
