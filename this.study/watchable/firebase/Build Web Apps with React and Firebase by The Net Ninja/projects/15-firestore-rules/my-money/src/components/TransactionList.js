import useFirestore from "hooks/useFirestore";
import styles from "styles/TransactionList.module.css";

const TransactionList = ({ transactions }) => {
  const { deleteDocument } = useFirestore("transactions");

  return (
    <ul className={styles.transactions}>
      {transactions.map((transaction) => (
        <li key={transaction.id}>
          <p className={styles.name}>{transaction.name}</p>

          <p className={styles.amount}>${transaction.amount}</p>

          <button onClick={() => deleteDocument(transaction.id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TransactionList;
