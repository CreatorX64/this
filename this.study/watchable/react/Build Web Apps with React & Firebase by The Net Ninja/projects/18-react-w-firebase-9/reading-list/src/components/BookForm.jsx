import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { firebaseFirestore } from "../firebase/config";
import { useAuthContext } from "../hooks/useAuthContext";

export function BookForm() {
  const [newBook, setNewBook] = useState("");
  const { user } = useAuthContext();

  async function handleSubmit(event) {
    event.preventDefault();

    await addDoc(collection(firebaseFirestore, "books"), {
      title: newBook,
      uid: user.uid
    });

    setNewBook("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span>Add a new book title</span>
        <input
          required
          type="text"
          onChange={(event) => setNewBook(event.target.value)}
          value={newBook}
        />
      </label>
      <button>Add</button>
    </form>
  );
}
