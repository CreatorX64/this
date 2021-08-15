import jsonPlaceholder from "../apis/jsonPlaceholder";

export function fetchPosts() {
  return async function (dispatch) {
    const response = await jsonPlaceholder.get("/posts");
    dispatch({
      type: "FETCH_POSTS",
      payload: response.data
    });
  };
}

export function fetchUser(id) {
  return async function (dispatch) {
    const response = await jsonPlaceholder.get(`/users/${id}`);
    dispatch({
      type: "FETCH_USER",
      payload: response.data
    });
  };
}