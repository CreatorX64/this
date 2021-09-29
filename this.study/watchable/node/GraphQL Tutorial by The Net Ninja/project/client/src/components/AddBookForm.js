import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_BOOK_MUTATION, GET_AUTHORS, GET_BOOKS } from "../queries/queries";

export const AddBookForm = () => {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");

  const [addBook] = useMutation(ADD_BOOK_MUTATION);

  const {
    data: authorData,
    loading: authorLoading,
    error: authorError
  } = useQuery(GET_AUTHORS);

  const renderAuthors = () => {
    if (authorLoading) {
      return <option disabled>Loading authors...</option>;
    } else if (authorError) {
      return <option disabled>Error: Unable to fetch authors</option>;
    } else {
      return authorData.authors.map((author) => (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      ));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addBook({
      variables: { name, genre, authorId },
      refetchQueries: [{ query: GET_BOOKS }]
    });
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setGenre("");
    setAuthorId("");
  };

  return (
    <form id="add-book" onSubmit={handleFormSubmit}>
      <div className="field">
        <label>Book name:</label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input
          type="text"
          onChange={(e) => setGenre(e.target.value)}
          value={genre}
        />
      </div>
      <div className="field">
        <label>Author:</label>
        <select onChange={(e) => setAuthorId(e.target.value)} value={authorId}>
          <option>-- Select author --</option>
          {renderAuthors()}
        </select>
      </div>
      <button>+</button>
    </form>
  );
};
