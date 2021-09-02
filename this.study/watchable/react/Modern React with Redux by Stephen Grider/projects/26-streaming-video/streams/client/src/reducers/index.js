import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { streamReducer } from "./streamReducer";

export const reducers = combineReducers({
  auth: authReducer,
  streams: streamReducer
});
