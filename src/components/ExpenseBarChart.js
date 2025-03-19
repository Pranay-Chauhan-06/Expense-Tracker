import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register the required components for the chart
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ExpenseBarChart = ({ income, expenses, isDarkMode }) => {
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  const remainingIncome = income - totalExpenses;
  const remainingIncomePercentage = (remainingIncome / income) * 100;

  // Prepare data for Bar chart
  const data = {
    labels: ['Income', 'Expenses', 'Remaining Income'],
    datasets: [
      {
        label: 'Financial Overview',
        data: [income, totalExpenses, remainingIncome],
        backgroundColor: ['#4caf50', '#f44336', '#2196f3'], // Green for income, Red for expenses, Blue for remaining income
        borderColor: ['#4caf50', '#f44336', '#2196f3'],
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
        text: `Remaining Income: ₹${remainingIncome.toFixed(2)} (${remainingIncomePercentage.toFixed(2)}%)`,
        font: {
          size: 16,
          weight: "bold",
        },
        color: isDarkMode ? "#ffffff" : "#000000", // White text for dark mode, black for light mode
      },
      legend: {
        labels: {
          color: isDarkMode ? "#ffffff" : "#000000", // Adjust legend label color based on mode
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: isDarkMode ? "#ffffff" : "#000000", // Adjust x-axis tick color
        },
      },
      y: {
        ticks: {
          color: isDarkMode ? "#ffffff" : "#000000", // Adjust y-axis tick color
        },
      },
    },
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ExpenseBarChart;
