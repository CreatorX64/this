import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

export default function Modal({ children, onClose, isSalesModal = false }) {
  return ReactDOM.createPortal(
    <div className={styles.modalBackdrop}>
      <div
        className={styles.modal}
        style={{
          borderColor: isSalesModal ? "#ff4500" : "#555"
        }}
      >
        {children}
        <button
          onClick={onClose}
          className={isSalesModal ? styles.salesBtn : null}
        >
          Close
        </button>
      </div>
    </div>,
    document.getElementById("modal")
  );
}
