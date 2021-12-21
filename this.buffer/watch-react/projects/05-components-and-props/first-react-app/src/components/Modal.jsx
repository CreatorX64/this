import ReactDOM from "react-dom";
import "./Modal.css";

export default function Modal({ children, onClose }) {
  return ReactDOM.createPortal(
    <div className="modal-backdrop">
      <div className="modal">
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.getElementById("modal")
  );
}
