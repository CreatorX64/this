import { combineReducers } from "redux";
import { postsReducer } from "./postsReducer";
import { usersReducer } from "./usersReducer";

export const reducers = combineReducers({
  posts: postsReducer,
  users: usersReducer
});
