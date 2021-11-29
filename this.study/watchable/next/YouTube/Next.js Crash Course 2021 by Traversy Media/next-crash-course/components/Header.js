import headerStyles from "../styles/Header.module.css";

export default function Header() {
  return (
    <div>
      <h1 className={headerStyles.title}>
        <span>WebDev</span> News
      </h1>
      <p className={headerStyles.description}>
        Keep up to date with the latest web development news.
      </p>
    </div>
  );
}
