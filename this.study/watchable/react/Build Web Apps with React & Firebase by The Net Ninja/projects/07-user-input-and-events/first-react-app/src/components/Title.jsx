import styles from "./Title.module.css";

export default function Title({ title, subtitle }) {
  return (
    <div>
      <h1 className={styles.title}>{title}</h1>
      <br />
      <h2 className={styles.subtitle}>{subtitle}</h2>
    </div>
  );
}
