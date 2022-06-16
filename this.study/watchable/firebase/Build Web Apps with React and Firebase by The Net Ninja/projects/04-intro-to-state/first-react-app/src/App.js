import { useState } from "react";
import "./App.css";

const App = () => {
  const [showEvents, setShowEvents] = useState(true);
  const [events, setEvents] = useState([
    { title: "Mario's birthday bash", id: 1 },
    { title: "Bowser's live stream", id: 2 },
    { title: "Race on moo moo farm", id: 3 }
  ]);

  console.log(showEvents);

  const handleClick = (id) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  };

  return (
    <div className="App">
      <div>
        {showEvents && (
          <button onClick={() => setShowEvents(false)}>Hide events</button>
        )}
        {!showEvents && (
          <button onClick={() => setShowEvents(true)}>Show events</button>
        )}
      </div>

      {showEvents &&
        events.map((event, index) => (
          <div key={event.id}>
            <h2>
              {index} - {event.title}
            </h2>
            <button onClick={() => handleClick(event.id)}>Delete</button>
          </div>
        ))}
    </div>
  );
};

export default App;
