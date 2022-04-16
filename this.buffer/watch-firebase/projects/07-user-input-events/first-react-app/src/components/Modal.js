import { createPortal } from "react-dom";
import "./Modal.css";

const Modal = ({ children, isOpen, isSalesModal = false }) => {
  return isOpen
    ? createPortal(
        <div className="modal-backdrop">
          <div
            className="modal"
            style={{
              border: "4px solid",
              borderColor: isSalesModal ? "#ff4500" : "#555",
              textAlign: "center"
            }}
          >
            <div>{children}</div>
          </div>
        </div>,
        document.body
      )
    : null;
};

export default Modal;
