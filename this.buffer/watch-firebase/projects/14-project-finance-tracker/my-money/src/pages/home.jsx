import TransactionForm from "@/components/transaction-form";
import styles from "@/pages/home.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}></div>
      <div className={styles.sidebar}>
        <TransactionForm />
      </div>
    </div>
  );
};

export default Home;
