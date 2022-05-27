import { useRef, useEffect } from "react";
import styles from "./InputWithLabel.module.css";

const InputWithLabel = ({
  children,
  id,
  value,
  type = "text",
  onInputChange,
  isFocused
}) => {
  const inputRef = useRef();

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
      <label htmlFor={id} className={styles.label}>
        {children}
      </label>
      &nbsp;
      <input
        ref={inputRef}
        type={type}
        id={id}
        value={value}
        onChange={onInputChange}
        className={styles.input}
        // autoFocus={isFocused}
      />
    </>
  );
};

export default InputWithLabel;
