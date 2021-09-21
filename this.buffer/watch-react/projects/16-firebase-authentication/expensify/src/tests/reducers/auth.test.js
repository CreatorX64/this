import { expect, test } from "@jest/globals";
import { LOGIN, LOGOUT } from "../../actions/types";
import { authReducer } from "../../reducers/auth";

test("should set uid for login", () => {
  const action = { type: LOGIN, uid: "abc123" };
  const state = authReducer({}, action);
  expect(state.uid).toEqual(action.uid);
});

test("should clear uid for logout", () => {
  const action = { type: LOGOUT };
  const state = authReducer({ uid: "abc123" }, action);
  expect(state).toEqual({});
});
