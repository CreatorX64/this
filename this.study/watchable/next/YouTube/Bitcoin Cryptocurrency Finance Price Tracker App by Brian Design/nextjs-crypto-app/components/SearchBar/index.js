import styles from "./SearchBar.module.css";

export default function SearchBar({ ...restProps }) {
  return (
    <div className={styles.coinSearch}>
      <input className={styles.coinInput} {...restProps} />
    </div>
  );
}
