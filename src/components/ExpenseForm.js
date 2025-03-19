import React, { useState } from "react";

function ExpenseForm({ onAddExpense, onAddIncome }) {
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseDate, setExpenseDate] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("Others");

  const [showIncomeField, setShowIncomeField] = useState(false);
  const [incomeAmount, setIncomeAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (expenseName && expenseAmount) {
      onAddExpense({
        name: expenseName,
        amount: parseFloat(expenseAmount),
        date: expenseDate || null, // Pass null if no date is provided
        category: expenseCategory || "Others", // Default to "Others" if no category
      });

      // Reset form fields
      setExpenseName("");
      setExpenseAmount("");
      setExpenseDate("");
      setExpenseCategory("Others");
    }
  };

  const handleAddIncome = () => {
    if (incomeAmount.trim() !== "") {
      onAddIncome(parseFloat(incomeAmount)); // Pass the income amount
      setIncomeAmount("");
      setShowIncomeField(false);
    }
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Expense Name"
        value={expenseName}
        required
        onChange={(e) => setExpenseName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        required
        value={expenseAmount}
        onChange={(e) => setExpenseAmount(e.target.value)}
      />
      <input
        type="date"
        id="date"
        value={expenseDate}
        onChange={(e) => setExpenseDate(e.target.value)}
      />
      <select
        value={expenseCategory}
        onChange={(e) => setExpenseCategory(e.target.value)}
      >
        <option value="Others">Select Category</option>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Bills">Bills</option>
      </select>
      <div>
        <button type="submit">Add Expense</button>
        <button id="income"
        type="button"
        onClick={() => setShowIncomeField(!showIncomeField)}
      >
        {showIncomeField ? "Cancel" : "Add Income"}
      </button>
      </div>

      <div className="line-separator"></div>

      {showIncomeField && (
        <div>
          <input
            type="number"
            placeholder="Income Amount"
            value={incomeAmount}
            onChange={(e) => setIncomeAmount(e.target.value)}
          />
          <button type="button" onClick={handleAddIncome}>
            Save Income
          </button>
        </div>
      )}
    </form>
  );
}

export default ExpenseForm;
