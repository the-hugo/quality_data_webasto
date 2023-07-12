import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import './MasterBar.css';
import { DatePicker, Select } from 'antd';
const { Option } = Select;
const { RangePicker } = DatePicker;

const MasterBar = ({ setLocationIds, passFilteredData }) => {
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


  // Filter data based on selected product, category, and error type
  useEffect(() => {
    fetchDefectData();
  }, []);

  console.log("MasterBar filtered Data", filteredData)
  console.log("MasterBar:", setLocationIds)

  useEffect(() => {
    const productNames = [...new Set(allData.map((defect) => defect.product_id))];
    setProductNames(productNames);

    const filteredDataForProduct = allData.filter((defect) => !product || defect.product_id === product);

    const categories = [...new Set(filteredDataForProduct.map((defect) => defect.category))];
    setCategories(categories);

    const filteredDataForCategory = filteredDataForProduct.filter((defect) => !category || defect.category === category);

    const errorTypes = [...new Set(filteredDataForCategory.map((defect) => defect.error_type))];
    setErrorTypes(errorTypes);

    const filteredDataForErrorType = filteredDataForCategory.filter((defect) => !errorType || defect.error_type === errorType);

    const finalFilteredData = filteredDataForErrorType.filter((defect) => {
      if (startDate === null || endDate === null) {
        // If no date range is selected, include all defects
        return true;
      }
      const defectDate = new Date(defect.date);
      return defectDate >= startDate && defectDate <= endDate;
    });

    const locationIds = finalFilteredData.flatMap(defect => defect.spots);
    setLocationIds(locationIds); // Update location IDs here
    setFilteredData(finalFilteredData);
    passFilteredData(finalFilteredData)
  }, []);

  return (
    <div className="filter-bar">
      <RangePicker
        onChange={(dates) => {
          if (dates) {
            setStartDate(dates[0].toDate());
            setEndDate(dates[1].toDate());
          } else {
            setStartDate(null);
            setEndDate(null);
          }
        }}
      />

      <Select
        style={{ minWidth: 200 }}
        value={product}
        onChange={(value) => setProduct(value)}
        placeholder="All Products"
      >
        <Option key="all" value="">All Products</Option>
        {productNames.map((productName, index) => (
          <Option key={index} value={productName}>
            {productName}
          </Option>
        ))}
      </Select>

      <Select
        style={{ minWidth: 200 }}
        value={category}
        onChange={(value) => setCategory(value)}
        placeholder="All Categories"
      >
        <Option key="all" value="">All Categories</Option>
        {categories.map((category, index) => (
          <Option key={index} value={category}>
            {category}
          </Option>
        ))}
      </Select>

      <Select
        style={{ minWidth: 200 }}
        value={errorType}
        onChange={(value) => setErrorType(value)}
        placeholder="All Error Types"
      >
        <Option key="all" value="">All Error Types</Option>
        {errorTypes.map((errorType, index) => (
          <Option key={index} value={errorType}>
            {errorType}
          </Option>
        ))}
      </Select>

      {/* Render your filtered data here */}

    </div>
  );
}

export default MasterBar;
