import jsonPlaceholder from "../apis/jsonPlaceholder";

export function fetchPosts() {
  return async function(dispatch) {
    const response = await jsonPlaceholder.get("/posts");
    dispatch({
      type: "FETCH_POSTS",
      payload: response
    });
  };
}

// Some people prefer to implement the above function this way
// export const fetchPosts = () => async dispatch => {
//   const response = await jsonPlaceholder.get("/posts");
//   dispatch({
//     type: "FETCH_POSTS",
//     payload: response
//   });
// };