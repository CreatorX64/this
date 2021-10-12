import { Component } from "react";
import axios from "axios";
import { Card } from "./Card";
import "./Deck.css";

export class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = { deck: null, drawnCards: [] };
    this.getCard = this.getCard.bind(this);
    this.createNewDeck = this.createNewDeck.bind(this);
    this.apiBaseUrl = "https://www.deckofcardsapi.com/api/deck";
  }

  async componentDidMount() {
    this.createNewDeck();
  }

  async getCard() {
    const deckId = this.state.deck.deck_id;

    try {
      const cardUrl = `${this.apiBaseUrl}/${deckId}/draw`;
      const res = await axios.get(cardUrl);

      if (!res.data.success) {
        throw new Error();
      }

      const card = res.data.cards[0];
      this.setState((state) => ({
        drawnCards: [
          ...state.drawnCards,
          {
            id: card.code,
            imageUrl: card.image,
            name: `${card.value} of ${card.suit}`
          }
        ]
      }));
    } catch (error) {
      this.setState({ isGameOver: true });
    }
  }

  async createNewDeck() {
    const res = await axios.get(`${this.apiBaseUrl}/new/shuffle`);
    this.setState({ deck: res.data, drawnCards: [], isGameOver: false });
  }

  render() {
    const cards = this.state.drawnCards.map((card) => (
      <Card key={card.id} name={card.name} imageUrl={card.imageUrl} />
    ));

    return (
      <div className="Deck">
        <h1 className="Deck__title">♦ Card Dealer ♦</h1>
        <h2 className="Deck__title Deck__title--sub">
          ♦ A little demo made with React ♦
        </h2>
        {this.state.isGameOver ? (
          <div>
            <h3 className="Deck__status">No cards left!</h3>
            <button className="Deck__button" onClick={this.createNewDeck}>
              Create new deck?
            </button>
          </div>
        ) : (
          <div>
            <button className="Deck__button" onClick={this.getCard}>
              Deal!
            </button>
          </div>
        )}
        <div className="Deck__cards">{cards}</div>
      </div>
    );
  }
}
