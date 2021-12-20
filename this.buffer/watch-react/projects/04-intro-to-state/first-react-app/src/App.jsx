import { useState } from "react";
import "./App.css";

export default function App() {
  const [showEvents, setShowEvents] = useState(true);
  const [events, setEvents] = useState([
    { id: 1, title: "Mario's birthday bash" },
    { id: 2, title: "Bowser's live stream" },
    { id: 3, title: "Race on moo moo farm" }
  ]);

  function handleClick(id) {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  }

  return (
    <div className="App">
      <div>
        {showEvents ? (
          <button onClick={() => setShowEvents(false)}>Hide events</button>
        ) : (
          <button onClick={() => setShowEvents(true)}>Show events</button>
        )}
      </div>

      {showEvents &&
        events.map((event, idx) => (
          <div key={event.id}>
            <h2>
              {idx} - {event.title}
            </h2>
            <button onClick={() => handleClick(event.id)}>Delete event</button>
          </div>
        ))}
    </div>
  );
}
