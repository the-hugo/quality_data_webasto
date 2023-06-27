import React, {
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import roof from '../../../images/roof.png';
import './maps.css';

const ImageMap = forwardRef((props, ref) => {
const { error_num, onLocationObjectIds } = props;
  const containerRef = useRef(null);
  const pinRef = useRef(null);
  const imgRef = useRef(null);
  const [locations, setLocations] = useState([]);

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
          1 - this.diY / this.diHeight,
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

  useImperativeHandle(ref, () => ({
    sendLocationsToBackend, // Update the function name
  }));


  const handleAddLocation = (error_num) => {
    console.log(window.pinner)
    if (window.pinner) {
      const { dropLocation } = window.pinner;
      const errorNum = 1; // Replace with your custom error number

      const newLocation = {
        error_num: errorNum,
        dropLocation,
        type: 'Exact Location',
      };

      window.pinner.setPinLocation(dropLocation); // Set the pin location
      window.pinner.renderPin(); // Render the pin

      setLocations((prevLocations) => [...prevLocations, newLocation]); // Move this line here
      console.log(locations)
    }
  };

  

  const sendLocationsToBackend = async (props) => {
    console.log(props);
    try {
      const objectIds = [];
  
      const updatedLocations = locations.map((location) => {
        return { ...location, error_num: props };
      });
  
      for (const location of updatedLocations) {
        const response = await fetch('http://localhost:8080/home/locations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(location),
        });
  
        if (response.ok) {
          const responseData = await response.json(); // Parse the response data as JSON
          console.log("This is the response:");
          console.log(responseData);
          objectIds.push(responseData._id); // Store the ObjectId
        } else {
          console.error('Failed to create location');
        }
      }
  
      onLocationObjectIds(objectIds); // Pass the ObjectIds back to the parent component
      console.log(objectIds);
  
      const defectData = {
        spots: objectIds,
      };
  
      const defectResponse = await fetch(`http://localhost:8080/home/defects/${props}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(defectData),
      });
  
      if (defectResponse.ok) {
        console.log('Defect updated successfully');
      } else {
        console.error('Failed to update defect');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  
  
  return (
    <>
      <div style={{ alignItems: 'center' }}>
        <p>
          Click anywhere in the map area below to see the red square move to the
          position of your click.
        </p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div className="container-map" ref={containerRef}>
          <img className="img-map" ref={imgRef} alt="" />
          <div className="pin" ref={pinRef}></div>
        </div>
        <div style={{ marginLeft: '16px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '10%',
            }}
          >
            <button className="add-location-btn" onClick={handleAddLocation}>
              Save your Location
            </button>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '10%',
            }}
          ></div>
        </div>
      </div>
    </>
  );
});

export default ImageMap;
