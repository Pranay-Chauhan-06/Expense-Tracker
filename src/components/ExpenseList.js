import React from "react";

function ExpenseList({ expenses, onDeleteExpense, showDelete }) {
  return (
    <div className="expense-list">
      {expenses.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Category</th>
              <th>Amount</th>
              {showDelete && <th></th>}
            </tr>
          </thead>
          <tbody>
          {[...expenses].reverse().map((expense, index) => (
              <tr key={index} id="data">
                <td>{expense.date}</td>
                <td>{expense.name}</td>
                <td>{expense.category}</td>
                <td>₹{expense.amount.toFixed(2)}</td>
                {showDelete && (
                  <td>
                    <button id="delete" onClick={() => onDeleteExpense(index)}>
                      -
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ExpenseList;
