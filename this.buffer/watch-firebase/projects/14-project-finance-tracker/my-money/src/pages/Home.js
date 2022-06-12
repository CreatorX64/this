import useAuthContext from "hooks/useAuthContext";
import useCollection from "hooks/useCollection";
import TransactionForm from "components/TransactionForm";
import TransactionList from "components/TransactionList";
import styles from "styles/Home.module.css";

const Home = () => {
  const { user } = useAuthContext();
  const { documents, errorMessage } = useCollection(
    "transactions",
    ["uid", "==", user.uid],
    ["createdAt", "desc"]
  );

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {errorMessage && <p>{errorMessage}</p>}

        {documents && <TransactionList transactions={documents} />}
      </div>

      <div className={styles.sidebar}>
        <TransactionForm uid={user.uid} />
      </div>
    </div>
  );
};

export default Home;
