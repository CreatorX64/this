import React from "react";
import Modal from "react-modal";
import { APP_ELEM_SELECTOR } from "../static";

Modal.setAppElement(APP_ELEM_SELECTOR);

export const OptionModal = (props) => (
  <Modal
    className="modal"
    closeTimeoutMS={200}
    contentLabel="Selected Option"
    isOpen={!!props.selectedOption}
    onRequestClose={props.handleClearSelectedOption}
  >
    <h3 className="modal__title">Selected Option</h3>
    {props.selectedOption && (
      <p className="modal__body">{props.selectedOption}</p>
    )}
    <button className="button" onClick={props.handleClearSelectedOption}>
      Okay
    </button>
  </Modal>
);
