import useAuthContext from "hooks/useAuthContext";
import useCollection from "hooks/useCollection";
import BookList from "components/BookList";
import BookForm from "components/BookForm";

const Home = () => {
  const { user } = useAuthContext();
  const { documents: books } = useCollection("books", ["uid", "==", user.uid]);

  return (
    <div>
      {books && <BookList books={books} />}
      <BookForm />
    </div>
  );
};

export default Home;
