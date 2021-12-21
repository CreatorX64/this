import { useState } from "react";
import TripList from "./components/TripList";

export default function App() {
  const [showTrips, setShowTrips] = useState(true);

  return (
    <div>
      <button onClick={() => setShowTrips(false)}>Hide trips</button>
      {showTrips && <TripList />}
    </div>
  );
}
