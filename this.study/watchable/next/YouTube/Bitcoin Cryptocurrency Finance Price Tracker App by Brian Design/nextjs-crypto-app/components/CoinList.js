import { Fragment } from "react";
import Coin from "./Coin";

export default function CoinList({ filteredCoins }) {
  return (
    <Fragment>
      {filteredCoins.map((coin) => (
        <Coin
          key={coin.id}
          id={coin.id}
          name={coin.name}
          price={coin.current_price}
          symbol={coin.symbol}
          marketCap={coin.market_cap}
          volume={coin.total_volume}
          image={coin.image}
          priceChange={coin.price_change_percentage_24h}
        />
      ))}
    </Fragment>
  );
}
