import Link from "next/link";
import articleStyles from "../styles/Article.module.css";

export default function ArticleListItem({ article }) {
  return (
    <Link href="/article/[id]" as={`/article/${article.id}`}>
      <a className={articleStyles.card}>
        <h2>{article.title}</h2>
        <p>{article.excerpt}</p>
      </a>
    </Link>
  );
}
