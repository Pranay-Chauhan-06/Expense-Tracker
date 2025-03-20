import React, { useState } from "react";

function Filter({ onFilterByDate, onFilterByCategory, onFilterByBoth, onFilterByMonth }) {
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [month, setMonth] = useState(""); // State to store selected month

  const formatDate = (inputDate) => {
    if (!inputDate) return "";
    const [year, month, day] = inputDate.split("-");
    return `${day}/${month}/${year}`; // Convert to dd/mm/yyyy format
  };
  
  const handleDateChange = (e) => {
    const rawDate = e.target.value; // yyyy-mm-dd format from input
    setDate(rawDate); // Store in yyyy-mm-dd format for the input
  
    const formattedDate = formatDate(rawDate); // Convert to dd/mm/yyyy format
    onFilterByDate(formattedDate); // Pass formatted date for filtering
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    onFilterByCategory(e.target.value);
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
    onFilterByMonth(e.target.value); // Call the filter function passed from App.js
  };

  // function handleFilterByBoth() {
  //   if (!date) {
  //     onFilterByBoth("", category);
  //     return;
  //   }
  //   const formattedDate = formatDate(date); // Convert date to dd/mm/yyyy
  //   onFilterByBoth(formattedDate, category);
  // }

  return (
    <div className="filter">
    <div className="filter-container">
      <div className="filter-item">
        <label htmlFor="date">Filter by Date: </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={handleDateChange}
          className="filter-input"
        />
      </div>
      <br></br>
      <div className="filter-item">
        <label htmlFor="category">Filter by Category: </label>
        <select
          id="category"
          value={category}
          onChange={handleCategoryChange}
          className="filter-input"
        >
          <option value="">All Categories</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Bills">Bills</option>
          <option value="Others">Others</option>
        </select>
      </div>
      <br></br>
      <div className="filter-item">
        <label htmlFor="month">Filter by Month: </label>
        <select
          id="month"
          value={month}
          onChange={handleMonthChange}
          className="filter-input"
        >
          <option value="">All Months</option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>
    </div>
    </div>
  );
}

export default Filter;