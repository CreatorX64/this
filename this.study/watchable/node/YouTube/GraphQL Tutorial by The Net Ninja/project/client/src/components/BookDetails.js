import { useQuery } from "@apollo/client";
import { GET_BOOK } from "../queries/queries";

export const BookDetails = ({ bookId }) => {
  const { data, loading, error } = useQuery(GET_BOOK, {
    variables: { id: bookId }
  });

  const renderBookDetails = () => {
    if (loading) {
      return <div>Loading...</div>;
    } else if (error) {
      return <div>There was an error.</div>;
    } else {
      const { book } = data;
      return (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All books by this author:</p>
          <ul className="other-books">
            {book.author.books.map((book) => (
              <li key={book.id}>{book.name}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return <div className="book-details">{renderBookDetails()}</div>;
};
