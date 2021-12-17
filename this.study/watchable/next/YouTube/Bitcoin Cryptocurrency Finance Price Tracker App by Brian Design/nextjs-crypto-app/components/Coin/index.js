import Image from "next/image";
import Link from "next/link";
import styles from "./Coin.module.css";

export default function Coin({
  id,
  name,
  price,
  symbol,
  marketCap,
  volume,
  image,
  priceChange
}) {
  return (
    <Link href={`/coin/${id}`}>
      <a>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.coin}>
              <div className={styles.img}>
                <Image src={image} alt={name} width={30} height={30} />
              </div>
              <h2 className={styles.title}>{name}</h2>
              <p className={styles.symbol}>{symbol}</p>
            </div>
            <div className={styles.data}>
              <p className={styles.price}>${price.toLocaleString()}</p>
              <p className={styles.volume}>${volume.toLocaleString()}</p>
              {priceChange < 0 ? (
                <p className={(styles.percent, styles.red)}>
                  {priceChange.toFixed(2)}%
                </p>
              ) : (
                <p className={(styles.percent, styles.green)}>
                  {priceChange.toFixed(2)}%
                </p>
              )}

              <p className={styles.marketCap}>
                Mkt Cap: ${marketCap.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}
