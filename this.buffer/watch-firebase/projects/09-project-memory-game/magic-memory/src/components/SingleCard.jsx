import styles from "./SingleCard.module.css";

export const SingleCard = ({ card, onChoice, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      onChoice(card);
    }
  };

  return (
    <div className={styles.card}>
      <div className={flipped ? styles.flipped : null}>
        <img src={card.src} className={styles.front} alt="Card front" />
        <img
          src="/img/cover.png"
          className={styles.back}
          onClick={handleClick}
          alt="Card back"
        />
      </div>
    </div>
  );
};
