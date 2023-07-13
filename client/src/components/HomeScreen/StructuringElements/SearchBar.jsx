import "./SearchBar.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

// THE SEARCHBAR FUNCTION IS USED TO SEARCH FOR A PRODUCT BY ITS SERIAL NUMBER
// It currently is not used for the MVP, but it is a feature that can be implemented in the future
function SearchBar({ placeholder }) {
  const [filteredData, setFilteredData] = useState([]);
  const [serialNumber, setSerialNumber] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/home/products/${serialNumber}`
        );
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setFilteredData([]);
      }
    };

    if (serialNumber !== "") {
      fetchData();
    } else {
      setFilteredData([]);
    }
  }, [serialNumber]);

  const handleFilter = (event) => {
    const searchSerialNumber = event.target.value;
    setSerialNumber(searchSerialNumber);
  };

  const clearInput = () => {
    setFilteredData([]);
    setSerialNumber("");
  };

  const handleClickOutside = (event) => {
    if (event.target.className !== "dataItem") {
      setFilteredData([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="search">
      <input
        type="text"
        placeholder={placeholder}
        value={serialNumber}
        onChange={handleFilter}
      />
      <button onClick={clearInput}>Clear</button>
      {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.map((product) => (
            <div className="dataItem" key={product._id}>
              <p>{product.serial_num}</p>
              <p>{product.title}</p>
            </div>
          ))}
        </div>
      )}
      {filteredData.length === 0 && serialNumber !== "" && (
        <div className="noResults">No results found.</div>
      )}
    </div>
  );
}

export default SearchBar;
