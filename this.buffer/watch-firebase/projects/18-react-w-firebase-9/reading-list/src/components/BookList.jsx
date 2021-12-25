import { doc, deleteDoc } from "firebase/firestore";
import { firebaseFirestore } from "../firebase/config";

export function BookList({ books }) {
  async function handleClick(id) {
    await deleteDoc(doc(firebaseFirestore, "books", id));
  }

  return (
    <div className="book-list">
      <ul>
        {books.map((book) => (
          <li key={book.id} onClick={() => handleClick(book.id)}>
            {book.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
