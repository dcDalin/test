import React, { useState } from "react";

function AddTransactionForm(props) {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(0);

  const handleSaveTransaction = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8001/transactions", {
        method: "POST",
        body: JSON.stringify({
          date,
          description,
          category,
          amount,
        }),
      });

      if (response.ok) {
        // refetch
        setLoading(false);

        props.getTransactions();
      }
      setLoading(false);
    } catch (error) {
      console.log("Error saving transaction ", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="ui segment">
      <form className="ui form" onSubmit={handleSaveTransaction}>
        <div className="inline fields">
          <input
            type="date"
            name="date"
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            onChange={(e) => setCategory(e.target.value)}
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            step="0.01"
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button className="ui button" type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransactionForm;
