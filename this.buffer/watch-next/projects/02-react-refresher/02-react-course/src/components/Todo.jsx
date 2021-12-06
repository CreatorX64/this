import { useState } from "react";
import Modal from "./Modal";
import Backdrop from "./Backdrop";

export default function Todo({ text }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function deleteHandler() {
    setIsModalOpen(true);
  }

  function closeModalHandler() {
    setIsModalOpen(false);
  }

  return (
    <div className="card">
      <h2>{text}</h2>
      <div className="actions">
        <button className="btn" onClick={deleteHandler}>
          Delete
        </button>
      </div>
      {isModalOpen && (
        <Modal onCancel={closeModalHandler} onConfirm={closeModalHandler} />
      )}
      {isModalOpen && <Backdrop onClick={closeModalHandler} />}
    </div>
  );
}
