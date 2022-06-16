import { doc, deleteDoc } from "firebase/firestore";

import { fbFirestore } from "lib/firebase";

const BookList = ({ books }) => {
  const handleClick = async (id) => {
    const docRef = doc(fbFirestore, "books", id);
    await deleteDoc(docRef);
  };

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
};

export default BookList;
