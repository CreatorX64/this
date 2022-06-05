import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

import Card from "components/Card";
import styles from "styles/App.module.css";

const cardImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false }
];

const App = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: uuid() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setIsDisabled(false);
  };

  // Start a new game automatically
  useEffect(() => {
    shuffleCards();
  }, []);

  // Compare 2 choices
  useEffect(() => {
    if (!choiceOne || !choiceTwo) return;

    setIsDisabled(true);

    if (choiceOne.src === choiceTwo.src) {
      setCards((prevCards) =>
        prevCards.map((card) =>
          card.src === choiceOne.src ? { ...card, matched: true } : card
        )
      );
      resetTurn();
    } else {
      setTimeout(resetTurn, 1000);
    }
  }, [choiceOne, choiceTwo]);

  return (
    <div className={styles.app}>
      <h1>Magic Match</h1>

      <button className={styles.button} onClick={shuffleCards}>
        New Game
      </button>

      <div className={styles.grid}>
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onChoice={handleChoice}
            isFlipped={card === choiceOne || card === choiceTwo || card.matched}
            isDisabled={isDisabled}
          />
        ))}
      </div>

      <p>Turns: {turns}</p>
    </div>
  );
};

export default App;
