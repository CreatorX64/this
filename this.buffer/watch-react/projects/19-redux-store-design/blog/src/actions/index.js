import _ from "lodash";
import { jsonPlaceholder } from "../apis/jsonPlaceholder";

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  // Dispatching the func returned by fetchPosts(). Whenever we call an action
  // created from inside another action creator, we need to make sure that we
  // dispatch the result of calling the action creator
  await dispatch(fetchPosts());

  // const userIds = _.uniq(_.map(getState().posts, "userId"));
  // userIds.forEach((id) => dispatch(fetchUser(id)));

  // Using method chaining as an alternative to the above two lines
  _.chain(getState().posts)
    .map("userId")
    .uniq()
    .forEach((id) => dispatch(fetchUser(id)))
    .value();
};

export const fetchPosts = () => async (dispatch) => {
  const response = await jsonPlaceholder.get("/posts");
  dispatch({
    type: "FETCH_POSTS",
    payload: response.data
  });
};

export const fetchUser = (id) => async (dispatch) => {
  const response = await jsonPlaceholder.get(`/users/${id}`);
  dispatch({
    type: "FETCH_USER",
    payload: response.data
  });
};

// Memoized Solution to Overfetching Problem
// Lookup what's "memoization" if you don't remember. Note that with this
// solution to the "one user getting downoaded on each render of UserHeader
// component" problem, or the "overfetching" problem, you won't be able to
// re-fetch the same user if for instance you've made changes to it and you
// want to fetch it again
// export function fetchUser(id) {
//   return function (dispatch) {
//     _fetchUser(id, dispatch);
//   };
// }
// const _fetchUser = _.memoize(async function (id, dispatch) {
//   const response = await jsonPlaceholder.get(`/users/${id}`);
//   dispatch({
//     type: "FETCH_USER",
//     payload: response.data
//   });
// });