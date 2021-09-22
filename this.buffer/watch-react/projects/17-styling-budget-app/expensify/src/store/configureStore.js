import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "../reducers/auth";
import { expensesReducer } from "../reducers/expenses";
import { filtersReducer } from "../reducers/filters";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
  auth: authReducer,
  expenses: expensesReducer,
  filters: filtersReducer
});

export function configureStore() {
  return createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
}
