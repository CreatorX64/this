import Image from "next/image";
import Layout from "../../components/Layout";
import styles from "./coin.module.css";

export async function getServerSideProps(context) {
  const { id } = context.query;
  const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
  const data = await res.json();
  return {
    props: {
      coin: data
    }
  };
}

export default function CoinDetail({ coin }) {
  return (
    <Layout>
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.image}>
            <Image
              src={coin.image.large}
              alt={coin.name}
              width={200}
              height={200}
            />
          </div>
          <h1 className={styles.title}>{coin.name}</h1>
          <p className={styles.ticker}>{coin.symbol}</p>
          <p className={styles.current}>
            ${coin.market_data.current_price.usd.toLocaleString()}
          </p>
        </div>
      </div>
    </Layout>
  );
}
