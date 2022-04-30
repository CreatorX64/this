import styles from "./Card.module.css";

const Card = ({ card }) => {
  return (
    <div className={styles.card}>
      <div>
        <img src={card.src} className={styles.front} alt="Card front" />
        <img
          src="/img/cover.png"
          className={styles.back}
          alt="Card back cover"
        />
      </div>
    </div>
  );
};

export default Card;
