import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";

import { fbFirestore } from "lib/firebase";
import useAuthContext from "hooks/useAuthContext";

const BookForm = () => {
  const [newBook, setNewBook] = useState("");
  const { user } = useAuthContext();

  const handleSubmit = async (event) => {
    event.preventDefault();

    await addDoc(collection(fbFirestore, "books"), {
      title: newBook,
      uid: user.uid
    });

    setNewBook("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span>Add a new book title:</span>
        <input
          type="text"
          value={newBook}
          onChange={(e) => setNewBook(e.target.value)}
          required
        />
      </label>
      <button>Add</button>
    </form>
  );
};

export default BookForm;
