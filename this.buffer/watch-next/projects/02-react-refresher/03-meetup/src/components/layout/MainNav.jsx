import { useContext } from "react";
import { Link } from "react-router-dom";
import FavoritesContext from "../../store/favoritesContext";
import classes from "./MainNav.module.css";

export default function MainNav() {
  const context = useContext(FavoritesContext);

  return (
    <header className={classes.header}>
      <div className={classes.logo}>React Meetups</div>
      <nav>
        <ul>
          <li>
            <Link to="/">All Meetups</Link>
          </li>
          <li>
            <Link to="new-meetup">Add New Meetup</Link>
          </li>
          <li>
            <Link to="favorites">
              My Favorites
              <span className={classes.badge}>{context.totalFavorites}</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
