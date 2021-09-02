import React from "react";
import ReactDOM from "react-dom";

export const Modal = ({ title, body, actions, onDismiss }) => {
  return ReactDOM.createPortal(
    <div onClick={onDismiss} className="ui dimmer modals visible active">
      <div
        onClick={(e) => e.stopPropagation()}
        className="ui standard modal visible active"
      >
        <i onClick={onDismiss} className="close icon"></i>
        <div className="header">{title}</div>
        <div className="content">{body}</div>
        <div className="actions">{actions}</div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
};
