import ArticleListItem from "./ArticleListItem";
import articleStyles from "../styles/Article.module.css";

export default function ArticleList({ articles }) {
  return (
    <div className={articleStyles.grid}>
      {articles.map((article) => (
        <ArticleListItem key={article.id} article={article} />
      ))}
    </div>
  );
}
