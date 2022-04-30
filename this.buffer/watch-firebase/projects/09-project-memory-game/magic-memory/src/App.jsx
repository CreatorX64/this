import { useState } from "react";
import { v4 as uuid } from "uuid";
import styles from "./App.module.css";
import Card from "./components/Card";

const cardImages = [
  { src: "/img/helmet-1.png" },
  { src: "/img/potion-1.png" },
  { src: "/img/ring-1.png" },
  { src: "/img/scroll-1.png" },
  { src: "/img/shield-1.png" },
  { src: "/img/sword-1.png" }
];

const App = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: uuid() }));

    setCards(shuffledCards);
    setTurns(0);
  };

  return (
    <div className={styles.app}>
      <h1>Magic Match</h1>
      <button className={styles.button} onClick={shuffleCards}>
        New Game
      </button>

      <div className={styles.grid}>
        {cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default App;
