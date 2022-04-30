import styles from "./Card.module.css";

const Card = ({ card, onChoice, isFlipped, isDisabled }) => {
  const handleClick = () => {
    if (!isDisabled) onChoice(card);
  };

  return (
    <div className={styles.card}>
      <div className={isFlipped ? styles.flipped : ""}>
        <img src={card.src} className={styles.face} alt="Card face" />
        <img
          src="/img/cover.png"
          className={styles.cover}
          alt="Card cover"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default Card;
