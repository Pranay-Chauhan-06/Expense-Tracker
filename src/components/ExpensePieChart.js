import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

// Register the required components for the chart
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const ExpensePieChart = ({ expenses, isDarkMode }) => {
  // Calculate the expense categories and their amounts
  const categoryTotals = expenses.reduce((acc, expense) => {
    const { category, amount } = expense;
    acc[category] = acc[category] ? acc[category] + amount : amount;
    return acc;
  }, {});

  // Prepare data for Pie chart
  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: "Expense",
        data: Object.values(categoryTotals),
        backgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"
        ], // Colors for each segment
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Expense Distribution by Category",
        font: {
          size: 16,
          weight: "bold",
        },
        color: isDarkMode ? "#ffffff" : "#000000", // Change title color based on mode
      },
      legend: {
        labels: {
          color: isDarkMode ? "#ffffff" : "#000000", // Adjust legend label color
        },
      },
    },
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default ExpensePieChart;
