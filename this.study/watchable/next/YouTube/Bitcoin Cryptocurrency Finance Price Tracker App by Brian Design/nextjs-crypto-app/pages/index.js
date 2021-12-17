import { useState } from "react";
import Layout from "../components/Layout";
import CoinList from "../components/CoinList";
import SearchBar from "../components/SearchBar";

export async function getServerSideProps() {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
  );
  const filteredCoins = await res.json();
  return {
    props: {
      filteredCoins
    }
  };
}

export default function Home({ filteredCoins }) {
  const [search, setSearch] = useState("");

  const allCoins = filteredCoins.filter((coin) => {
    return coin.name.toLowerCase().includes(search.toLowerCase());
  });

  function handleChange(event) {
    setSearch(event.target.value.toLowerCase());
  }

  return (
    <Layout title="Crypto Tracker">
      <div className="app">
        <SearchBar type="text" placeholder="Search" onChange={handleChange} />
        <CoinList filteredCoins={allCoins} />
      </div>
    </Layout>
  );
}
