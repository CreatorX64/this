import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { increment, decrement, incrementByAmount } from "./redux/counter";

export const App = () => {
  const { count } = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <h1>The count is {count}</h1>
      <button onClick={() => dispatch(increment())}>increment</button>
      <button onClick={() => dispatch(decrement())}>decrement</button>
      <button onClick={() => dispatch(incrementByAmount(32))}>
        increment by 32
      </button>
    </div>
  );
};
