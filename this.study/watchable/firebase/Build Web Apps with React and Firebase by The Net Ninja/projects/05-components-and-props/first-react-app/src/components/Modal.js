import { createPortal } from "react-dom";
import "./Modal.css";

const Modal = ({ children, isOpen, onClose }) => {
  return isOpen
    ? createPortal(
        <div className="modal-backdrop">
          <div className="modal">
            <div>{children}</div>
            <button onClick={onClose}>Close</button>
          </div>
        </div>,
        document.body
      )
    : null;
};

export default Modal;
