import { useEffect, useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";

export const TransactionForm = ({ uid }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const { response, addDocument } = useFirestore("transactions");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    addDocument({ uid, name, amount });
  };

  // Reset the form fields
  useEffect(() => {
    if (response.success) {
      setName("");
      setAmount("");
    }
  }, [response.success]);

  return (
    <>
      <h3>Add a Transaction</h3>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Transaction name</span>
          <input
            type="text"
            onChange={(evt) => setName(evt.target.value)}
            value={name}
            required
          />
        </label>
        <label>
          <span>Amount ($)</span>
          <input
            type="number"
            onChange={(evt) => setAmount(evt.target.value)}
            value={amount}
            required
          />
        </label>
        <button>Add transaction</button>
      </form>
    </>
  );
};
