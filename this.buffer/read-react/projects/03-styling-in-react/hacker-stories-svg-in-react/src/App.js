import { useState, useReducer, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import "./App.css";
import { ReactComponent as Check } from "./check.svg";

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

const REMOVE_STORY = "REMOVE_STORY";
const STORIES_FETCH_INIT = "STORIES_FETCH_INIT";
const STORIES_FETCH_SUCCESS = "STORIES_FETCH_SUCCESS";
const STORIES_FETCH_FAILURE = "STORIES_FETCH_FAILURE";

const storiesReducer = (state, action) => {
  switch (action.type) {
    case STORIES_FETCH_INIT:
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case STORIES_FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload
      };
    case STORIES_FETCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    case REMOVE_STORY:
      return {
        ...state,
        data: state.data.filter(
          (story) => action.payload.objectID !== story.objectID
        )
      };
    default:
      throw new Error();
  }
};

const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = useState(localStorage.getItem(key) ?? initialState);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

export const App = () => {
  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "React");
  const [url, setUrl] = useState(`${API_ENDPOINT}${searchTerm}`);
  const [stories, dispatchStories] = useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false
  });

  const handleFetchStories = useCallback(async () => {
    dispatchStories({ type: STORIES_FETCH_INIT });

    try {
      const result = await axios.get(url);

      dispatchStories({
        type: STORIES_FETCH_SUCCESS,
        payload: result.data.hits
      });
    } catch {
      dispatchStories({ type: STORIES_FETCH_FAILURE });
    }
  }, [url]);

  useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setUrl(`${API_ENDPOINT}${searchTerm}`);
  };

  const handleRemoveStory = (item) => {
    dispatchStories({
      type: REMOVE_STORY,
      payload: item
    });
  };

  return (
    <div className="container">
      <h1 className="headline-primary">My Hacker Stories</h1>

      <SearchForm
        searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
      />

      {stories.isError && <p>Something went wrong :(</p>}

      {stories.isLoading ? (
        <p>Loading...</p>
      ) : (
        <List list={stories.data} onRemoveItem={handleRemoveStory} />
      )}
    </div>
  );
};

const SearchForm = ({ searchTerm, onSearchInput, onSearchSubmit }) => (
  <form onSubmit={onSearchSubmit} className="search-form">
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
      className="button button_large"
    >
      Submit
    </button>
  </form>
);

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
      <label htmlFor={id} className="label">
        {children}
      </label>
      &nbsp;
      <input
        ref={inputRef}
        type={type}
        id={id}
        value={value}
        onChange={onInputChange}
        className="input"
        // autoFocus={isFocused}
      />
    </>
  );
};

const List = ({ list, onRemoveItem }) => (
  <ul>
    {list.map((item) => (
      <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
    ))}
  </ul>
);

const Item = ({ item, onRemoveItem }) => (
  <li className="item">
    <span style={{ width: "40%" }}>
      <a href={item.url}>{item.title}</a>
    </span>
    <span style={{ width: "30%" }}>{item.author}</span>
    <span style={{ width: "10%" }}>{item.numComments}</span>
    <span style={{ width: "10%" }}>{item.points}</span>
    <span style={{ width: "10%" }}>
      <button
        type="button"
        className="button button_small"
        onClick={() => onRemoveItem(item)}
      >
        <Check height="18px" width="18px" />
      </button>
    </span>
  </li>
);
