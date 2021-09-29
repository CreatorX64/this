import { useQuery } from "@apollo/client";
import { useState } from "react";
import { BookDetails } from "./BookDetails";
import { GET_BOOKS } from "../queries/queries";

export const BookList = () => {
  const [selected, setSelected] = useState(null);
  const { loading, error, data } = useQuery(GET_BOOKS);

  const renderBooks = () => {
    if (loading) {
      return <div>Loading books...</div>;
    } else if (error) {
      return <div>Error :/</div>;
    } else {
      return data.books.map((book) => (
        <li key={book.id} onClick={(e) => setSelected(book.id)}>
          {book.name}
        </li>
      ));
    }
  };

  return (
    <div>
      <ul className="book-list">{renderBooks()}</ul>
      {selected !== null ? (
        <BookDetails bookId={selected} />
      ) : (
        <div>No book selected.</div>
      )}
    </div>
  );
};
