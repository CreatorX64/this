const list = [
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

const App = () => (
  <div>
    <h1>My Hacker Stories</h1>
    <Search />
    <hr />
    <List />
  </div>
);

const List = () => (
  <ul>
    {list.map((item) => (
      <li key={item.objectId}>
        <span>
          <a href={item.url}>{item.title}</a>
        </span>{" "}
        <span>{item.author}</span> <span>{item.numComments}</span>{" "}
        <span>{item.points}</span>
      </li>
    ))}
  </ul>
);

const Search = () => {
  const handleChange = (event) => {
    console.log(event.target.value);
  };

  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input type="text" id="search" onChange={handleChange} />
    </div>
  );
};

export default App;
