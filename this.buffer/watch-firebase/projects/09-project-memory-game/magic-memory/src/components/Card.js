import styles from "styles/Card.module.css";

const Card = ({ card, onChoice, isFlipped, isDisabled }) => {
  const handleClick = () => {
    if (!isDisabled) onChoice(card);
  };

  return (
    <div className={styles.card}>
      <div className={isFlipped ? styles.flipped : ""}>
        <img src={card.src} className={styles.face} alt="Card face" />
        <img
          src="/img/back.png"
          className={styles.back}
          alt="Card back"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default Card;
