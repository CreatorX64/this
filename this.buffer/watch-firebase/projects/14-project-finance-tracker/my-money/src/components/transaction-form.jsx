import { useState } from "react";
import styles from "@/components/transaction-form.module.css";

const TransactionForm = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, amount });
  };

  return (
    <>
      <h3>Add Transaction</h3>

      <form className={styles.transactionForm} onSubmit={handleSubmit}>
        <label>
          <span>Transaction Name:</span>
          <input
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          <span>Amount ($):</span>
          <input
            required
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>

        <button type="submit">Add Transaction</button>
      </form>
    </>
  );
};

export default TransactionForm;
