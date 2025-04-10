/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Filter from "./components/Filter";
import ExpensePieChart from "./components/ExpensePieChart";
import ExpenseBarChart from "./components/ExpenseBarChart";
import "./index.css";

function App() {
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });
  const [income, setIncome] = useState(() => {
    const savedIncome = localStorage.getItem("income");
    return savedIncome ? parseFloat(savedIncome) : 0; // Default to 0 if no income exists
  });
  const [showPieChart, setShowPieChart] = useState(false); // State to control pie chart visibility
  const togglePieChart = () => {
    setShowPieChart((prev) => !prev);
  };

  const [showBarChart, setShowBarChart] = useState(false);  // State to toggle bar chart visibility
  const toggleBarChart = () => {  // Function to toggle bar chart
    setShowBarChart((prev) => !prev);
  };

  const [filteredExpenses, setFilteredExpenses] = useState(expenses);
  const [filterMonth, setFilterMonth] = useState("");  // Add this state to store selected month
  const [filterDate, setFilterDate] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [alertTriggered, setAlertTriggered] = useState(false);
  const [lastDeleted, setLastDeleted] = useState(null);
  const [deletedIndex, setDeletedIndex] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("isDarkMode");
    return savedTheme !== null ? JSON.parse(savedTheme) : true;
  });
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  const remainingIncome = income - totalExpenses;
  const remainingIncomePercentage = (remainingIncome / income) * 100;
  
  useEffect(() => {
    document.body.className = isDarkMode ? "dark" : "light";
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);
  
  useEffect(() => {
    localStorage.setItem("income", income.toString()); // Save income to localStorage
  }, [income]);

  useEffect(() => {
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    if (income > 0 && !alertTriggered && totalExpenses >= income * 0.9) {
      alert("Warning: You have spent 90% or more of your income!");
      setAlertTriggered(true);
    }
    // Reset alert if expenses go below 90%
    if (alertTriggered && totalExpenses < income * 0.9) {
      setAlertTriggered(false);
    }
  }, [totalExpenses, income, alertTriggered]);

  const formatDate = (date) => {
    const parsedDate = new Date(date);
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const day = String(parsedDate.getDate()).padStart(2, "0");
    return `${day}/${month}/${year}`;
  };

  const addExpense = (expense) => {
    const currentDate = new Date();
    const rawDate = expense.date || currentDate.toISOString().split("T")[0]; // Raw date in YYYY-MM-DD
    const formattedDate = formatDate(rawDate);
    const formattedExpense = { ...expense, date: formattedDate };

    if (lastDeleted && deletedIndex !== null) {
      // Restore the expense to the exact position it was deleted from
      const updatedExpenses = [...expenses];
      updatedExpenses[deletedIndex] = formattedExpense;
      setExpenses(updatedExpenses);
      setFilteredExpenses(updatedExpenses);
      setLastDeleted(null);
      setDeletedIndex(null);
    } else {
      // Add the new expense at the top of the list
      const updatedExpenses = [formattedExpense, ...expenses];
      setExpenses(updatedExpenses);
      setFilteredExpenses(updatedExpenses);
    }
  };

  const deleteExpense = (index) => {
    const deletedExpense = filteredExpenses[index];
    const updatedExpenses = filteredExpenses.filter((_, i) => i !== index);
    setLastDeleted(deletedExpense);
    setDeletedIndex(index); // Track the index of the deleted item
    setExpenses(updatedExpenses);
    setFilteredExpenses(updatedExpenses);
  };

  const undoDelete = () => {
    if (lastDeleted !== null && deletedIndex !== null) {
      // Restore the deleted item at its original index
      const updatedExpenses = [...expenses];
      updatedExpenses.splice(deletedIndex, 0, lastDeleted); // Insert at the original index
      setExpenses(updatedExpenses);
      setFilteredExpenses(updatedExpenses);
      setLastDeleted(null);
      setDeletedIndex(null);
    }
  };

  const filterByDate = (date) => {
    setFilterDate(date);
    const formattedDate = date ? formatDate(date) : "";
    const filtered = expenses.filter((expense) =>
      date ? expense.date === formattedDate : true
    );
    setFilteredExpenses(filtered);
  };

  const filterByMonth = (month) => {
    setFilterMonth(month);
    const filtered = expenses.filter((expense) => {
      const expenseMonth = new Date(expense.date).getMonth() + 1; // Get the month (1-12)
      return month ? expenseMonth === parseInt(month) : true;
    });
    setFilteredExpenses(filtered);
  };
  

  const filterByCategory = (category) => {
    setFilterCategory(category);
    const filtered = expenses.filter((expense) =>
      category ? expense.category === category : true
    );
    setFilteredExpenses(filtered);
  };

  const filterByBoth = (date, category) => {
    const formattedDate = date ? formatDate(date) : "";
    const filtered = expenses.filter((expense) => {
      const matchesDate = formattedDate ? expense.date === formattedDate : true;
      const matchesCategory = category ? expense.category === category : true;
      return matchesDate && matchesCategory;
    });
    setFilteredExpenses(filtered);
  };

  const clearFilters = () => {
    setFilterDate("");
    setFilterCategory("");
    setFilteredExpenses(expenses);
  };

  const calculateTotal = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  const calculateRemainingBalance = () => {
    if(income>0)
      return income - calculateTotal();
    else
      return 0; 
  };

  const toggleHistory = () => {
    setShowHistory((prev) => !prev);
    if (!showHistory) {
      setFilterDate("");
      setFilterCategory("");
      setFilteredExpenses(expenses);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const recentExpenses = useMemo(() => {
    return [...expenses].slice(0, 5).reverse();  // Display the latest 5 expenses
  }, [expenses]);

  const reversedFilteredExpenses = useMemo(() => {
    return [...filteredExpenses].reverse();
  }, [filteredExpenses]);

  const addIncome = (newIncome) => {
    setIncome(newIncome); // Add income
  };

  
  
  return (
    <div className="App">
      <div className="theme-toggle">
        <label className="switch">
          <input
            type="checkbox"
            checked={isDarkMode}
            onChange={toggleTheme}
          />
          <span className="slider"></span>
        </label>
      </div>
      <h1 align="center">Expense Tracker</h1>
      <h4 align="center">"Track expenses, grow financially"</h4>
      {!showHistory && <ExpenseForm onAddExpense={addExpense} onAddIncome={addIncome} />}
      <button onClick={toggleHistory}>
        {showHistory ? "Add new Expense" : "Show History"}
      </button>
      {showHistory ? (
        <div className="history">
          <Filter
            onFilterByDate={filterByDate}
            onFilterByMonth={filterByMonth}
            onFilterByCategory={filterByCategory}
            onFilterByBoth={filterByBoth}
          />
          <button onClick={clearFilters} style={{ margin: "10px 0" }}>
            Clear Filters
          </button>
          <h2>Expense History</h2>
          <ExpenseList
            expenses={reversedFilteredExpenses}
            onDeleteExpense={deleteExpense}
            showDelete={true}
          />
          {lastDeleted && (
            <div>
              <button onClick={undoDelete} style={{ marginTop: "10px" }}>
                Undo Delete
              </button>
            </div>
          )}
          
          <h3>Total Expenses: ₹{calculateTotal().toFixed(2)}</h3>
          {income > 0 && (
          <><h3>Total Income: ₹{income.toFixed(2)}</h3><h3>Remaining Balance: ₹{calculateRemainingBalance().toFixed(2)} ({income > 0 ? remainingIncomePercentage.toFixed(2) : '0.00'}%)</h3></>
          )}

          {/* Button to toggle Pie Chart visibility */}
          <div>
            <button id="pie" onClick={togglePieChart} style={{ marginTop: "20px" }}>
              {showPieChart ? "Hide Expense Chart" : "Show Expense Chart"}
            </button>
            {showPieChart && <ExpensePieChart expenses={filteredExpenses} isDarkMode={isDarkMode}/>}
          </div>
          {income > 0 && (
          <div style={{ marginTop: "15px" }}>
            <button id="bar" onClick={toggleBarChart}>
              {showBarChart ? "Hide Income Chart" : "Show Income Chart"}
            </button>  
            {/* Conditionally render the Bar Chart */}
            {showBarChart && <ExpenseBarChart income={income} expenses={filteredExpenses} isDarkMode={isDarkMode} />}
          </div>
          )}
        </div>
      ) : (
        <div>
          <h2>Recent Expenses</h2>
          <ExpenseList
            expenses={recentExpenses}
            onDeleteExpense={deleteExpense}
            showDelete={false}
          />
        </div>
      )}
    </div>
  );
}

export default App;
