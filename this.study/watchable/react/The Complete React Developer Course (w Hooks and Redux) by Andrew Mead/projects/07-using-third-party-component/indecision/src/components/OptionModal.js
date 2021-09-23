import React from "react";
import Modal from "react-modal";
import { APP_ELEM_SELECTOR } from "../static";

Modal.setAppElement(APP_ELEM_SELECTOR);

export const OptionModal = (props) => (
  <Modal
    isOpen={!!props.selectedOption}
    contentLabel="Selected Option"
    onRequestClose={props.handleClearSelectedOption}
  >
    <h3>Selected Option</h3>
    {props.selectedOption && <p>{props.selectedOption}</p>}
    <button onClick={props.handleClearSelectedOption}>Okay</button>
  </Modal>
);
