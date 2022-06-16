import { useState } from "react";
import "./App.css";
import TripList from "./components/TripList";

const App = () => {
  const [showTrips, setShowTrips] = useState(true);

  return (
    <div className="App">
      <div>
        <button onClick={() => setShowTrips(false)}>Hide trips</button>
      </div>
      {showTrips && <TripList />}
    </div>
  );
};

export default App;
