import { useState } from "react";

const App = () => {
  const stories = [
    {
      title: "React",
      url: "https://reactjs.org",
      author: "Jordan Walke",
      numComments: 3,
      points: 4,
      objectId: 0
    },
    {
      title: "Redux",
      url: "https://redux.js.org",
      author: "Dan Abramov, Andrew Clark",
      numComments: 2,
      points: 5,
      objectId: 1
    }
  ];

  return (
    <div>
      <h1>My Hacker Stories</h1>
      <Search />
      <hr />
      <List list={stories} />
    </div>
  );
};

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input type="text" id="search" onChange={handleChange} />

      <p>
        Searching for <strong>{searchTerm}</strong>
      </p>
    </div>
  );
};

const List = (props) => (
  <ul>
    {props.list.map((item) => (
      <Item key={item.objectId} item={item} />
    ))}
  </ul>
);

const Item = (props) => (
  <li key={props.item.objectId}>
    <span>
      <a href={props.item.url}>{props.item.title}</a>
    </span>{" "}
    <span>{props.item.author}</span> <span>{props.item.numComments}</span>{" "}
    <span>{props.item.points}</span>
  </li>
);

export default App;
