import InputWithLabel from "../InputWithLabel";
import styles from "./SearchForm.module.css";

const SearchForm = ({ searchTerm, onSearchInput, onSearchSubmit }) => {
  return (
    <form onSubmit={onSearchSubmit} className={styles.searchForm}>
      <InputWithLabel
        id="search"
        value={searchTerm}
        onInputChange={onSearchInput}
        isFocused
      >
        <strong>Search:</strong>
      </InputWithLabel>

      <button
        type="submit"
        disabled={!searchTerm || !searchTerm.trim()}
        className="button button-large"
      >
        Submit
      </button>
    </form>
  );
};

export default SearchForm;
