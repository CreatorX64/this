import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

export default function Modal({ children, isSalesModal = false }) {
  return ReactDOM.createPortal(
    <div className={styles.modalBackdrop}>
      <div
        className={styles.modal}
        style={{
          borderColor: isSalesModal ? "#ff4500" : "#555"
        }}
      >
        {children}
      </div>
    </div>,
    document.getElementById("modal")
  );
}
