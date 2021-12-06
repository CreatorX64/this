import { useContext } from "react";
import FavoritesContext from "../store/favoritesContext";
import MeetupList from "../components/meetups/MeetupList";

export default function Favorites() {
  const context = useContext(FavoritesContext);
  let content = null;

  if (context.totalFavorites === 0) {
    content = <p>You got no favorites yet. Start adding some?</p>;
  } else {
    content = <MeetupList meetups={context.favorites} />;
  }

  return (
    <section>
      <h1>My Favorites</h1>
      {content}
    </section>
  );
}
