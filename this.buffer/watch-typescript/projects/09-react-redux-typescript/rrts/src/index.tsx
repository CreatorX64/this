import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { App } from "./components/App";
import { reducers } from "./reducers";

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);

// By initializing the property outside of the constructor, we are
// effectively overriding the "state" property defined in the Component class
// which has a default type of Readonly<{}>. That's why when we use this
// approach, we don't need to pass a generic type parameter that describes
// the state object into the Component class. Note that in pure JavaScript,
// both approaches of initializing state as a class property vs. initializing
// state using "this.state = something" in the constructor are equilavant.
// But not in TypeScript, because TypeScript has a concept of class properties
// and those class properties can be overriden by child classes.

// Note that if you do both of the approaches at the same time, meaning if you
// pass a generic type parameter AND override that state property, then your
// override will be chosen over the passed in generic type parameter. That makes
// sense, because you're basically overriding what's defined in the parent class.

// class App extends Component<AppProps> {
//   state = { counter: 0 };
//   ...
// }

// interface AppState {
//   counter: number;
// }
// class App extends Component<AppProps, AppState> {
//   constructor(props: AppProps) {
//     super(props);
//     this.state = { counter: 0 }
//   }
//   ...
// }
