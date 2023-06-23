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
  const [allData, setAllData] = useState([]); // new state to hold all data

  const fetchDefectData = async () => {
    try {
      // Fetch all data
      const response = await axios.get('http://localhost:8080/home/defects');
      setAllData(response.data); // store all data
    } catch (error) {
      console.error('Error fetching defect data:', error);
    }
  };

  useEffect(() => {
    fetchDefectData();
  }, []);

  useEffect(() => {
    const productNames = [
      ...new Set(allData.map((defect) => defect.product_id)),
    ];
    setProductNames(productNames);

    const filteredDataForProduct = allData.filter(
      (defect) => !product || defect.product_id === product
    );

    const categories = [
      ...new Set(filteredDataForProduct.map((defect) => defect.category)),
    ];
    setCategories(categories);

    const filteredDataForCategory = filteredDataForProduct.filter(
      (defect) => !category || defect.category === category
    );

    const errorTypes = [
      ...new Set(filteredDataForCategory.map((defect) => defect.error_type)),
    ];
    setErrorTypes(errorTypes);

    const finalFilteredData = filteredDataForCategory.filter(
      (defect) => !errorType || defect.error_type === errorType
    );

    setFilteredData(finalFilteredData);
  }, [allData, product, category, errorType]);


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
