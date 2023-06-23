import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './MasterBar.css';

const MasterBar = () => {
  const [product, setProduct] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [category, setCategory] = useState('');
  const [errorType, setErrorType] = useState('');
  const [categories, setCategories] = useState([]);
  const [errorTypes, setErrorTypes] = useState([]);
  const [productNames, setProductNames] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const fetchDefectData = async () => {
    try {
      // Fetch all data
      const response = await axios.get('http://localhost:8080/home/defects');

      // Extract product names, categories, and error types from the data
      const productNames = [
        ...new Set(response.data.map((defect) => defect.product_id)),
      ];
      const categories = [
        ...new Set(response.data.map((defect) => defect.category)),
      ];
      const errorTypes = [
        ...new Set(response.data.map((defect) => defect.error_type)),
      ];

      // Update the state variables with the fetched data
      setProductNames(productNames);
      setCategories(categories);
      setErrorTypes(errorTypes);

      // Filter data based on selected filters
      const filteredDefectData = response.data.filter(defect =>
        (!startDate || new Date(defect.date) >= new Date(startDate)) &&
        (!endDate || new Date(defect.date) <= new Date(endDate)) &&
        (!product || defect.product_id === product)
      );

      // Filter data further based on category
      const categoryFilteredData = filteredDefectData.filter(
        (defect) => !category || defect.category === category
      );

      // Filter data further based on error type
      const finalFilteredData = categoryFilteredData.filter(
        (defect) => !errorType || defect.error_type === errorType
      );

      // Update the filtered data state
      setFilteredData(finalFilteredData);
    } catch (error) {
      console.error('Error fetching defect data:', error);
    }
  };

  useEffect(() => {
    fetchDefectData();
  }, [startDate, endDate, product, category, errorType]);

  return (
    <div className="filter-bar">
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        placeholderText="Start Date"
      />
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        placeholderText="End Date"
      />

      <select value={product} onChange={(e) => setProduct(e.target.value)}>
        <option value="">All Products</option>
        {productNames.map((productName, index) => (
          <option key={index} value={productName}>
            {productName}
          </option>
        ))}
      </select>

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select value={errorType} onChange={(e) => setErrorType(e.target.value)}>
        <option value="">All Error Types</option>
        {errorTypes.map((errorType, index) => (
          <option key={index} value={errorType}>
            {errorType}
          </option>
        ))}
      </select>

      {/* Render your filtered data here */}

      
    </div>
  );
};

export default MasterBar;
