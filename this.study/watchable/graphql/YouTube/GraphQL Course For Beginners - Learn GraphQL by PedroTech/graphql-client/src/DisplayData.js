import { useQuery, gql, useLazyQuery, useMutation } from "@apollo/client";
import { useState } from "react";

const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      name
      age
      username
      nationality
    }
  }
`;

const QUERY_ALL_MOVIES = gql`
  query GetAllMovies {
    movies {
      name
      yearOfPublication
    }
  }
`;

const GET_MOVIE_BY_NAME = gql`
  query GetMovieByName($movieName: String!) {
    movie(name: $movieName) {
      name
      yearOfPublication
    }
  }
`;

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      name
      id
    }
  }
`;

export const DisplayData = () => {
  // Movie search form state
  const [movieSearch, setMovieSearch] = useState("");

  // Create user form state
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [nationality, setNationality] = useState("");

  const { data: usersData, loading, refetch } = useQuery(QUERY_ALL_USERS);
  const { data: moviesData } = useQuery(QUERY_ALL_MOVIES);
  const [fetchMovie, { data: searchData, error: searchError }] =
    useLazyQuery(GET_MOVIE_BY_NAME);

  const [createUser] = useMutation(CREATE_USER_MUTATION);

  if (loading) {
    return <h1>Data is loading...</h1>;
  }

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Name..."
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="text"
          placeholder="Username..."
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type="number"
          placeholder="Age..."
          value={age}
          onChange={(event) => setAge(event.target.value)}
        />
        <input
          type="text"
          placeholder="Nationality..."
          value={nationality}
          onChange={(event) =>
            setNationality(event.target.value.trim().toUpperCase())
          }
        />
        <button
          onClick={async () => {
            await createUser({
              variables: {
                input: { name, age: Number(age), username, nationality }
              }
            });
            await refetch();
          }}
        >
          Create user
        </button>
      </div>

      {usersData &&
        usersData.users.map((user) => (
          <div key={user.id}>
            <h2>User Name: {user.name}</h2>
            <p>Username: {user.username}</p>
            <p>Age: {user.age}</p>
            <p>Nationality: {user.nationality}</p>
          </div>
        ))}

      {moviesData &&
        moviesData.movies.map((movie) => (
          <div key={movie.name}>
            <h2>Movie Name: {movie.name}</h2>
            <p>Year: {movie.yearOfPublication}</p>
          </div>
        ))}

      <div>
        <input
          type="text"
          placeholder="Interstellar..."
          onChange={(event) => setMovieSearch(event.target.value)}
          value={movieSearch}
        />
        <button
          onClick={() => {
            fetchMovie({
              variables: {
                movieName: movieSearch
              }
            });
          }}
        >
          Search movie
        </button>
        <div>
          {searchData && (
            <div>
              <h2>Movie Name: {searchData.movie.name}</h2>
              <p>Year: {searchData.movie.yearOfPublication}</p>
            </div>
          )}
          {searchError && <p>There was an error fetching data</p>}
        </div>
      </div>
    </div>
  );
};
