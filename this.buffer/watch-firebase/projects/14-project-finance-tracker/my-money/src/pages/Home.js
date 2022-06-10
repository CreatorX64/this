import useAuthContext from "hooks/useAuthContext";
import TransactionForm from "components/TransactionForm";
import styles from "styles/Home.module.css";

const Home = () => {
  const { user } = useAuthContext();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p>transaction list</p>
      </div>

      <div className={styles.sidebar}>
        <TransactionForm uid={user.uid} />
      </div>
    </div>
  );
};

export default Home;
