import { useState } from "react";
import "./App.css";
import Title from "./components/Title";
import Modal from "./components/Modal";
import EventList from "./components/EventList";
import NewEventForm from "./components/NewEventForm";

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEvents, setShowEvents] = useState(true);
  const [events, setEvents] = useState([]);

  const handleEventAdd = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
    setShowModal(false);
  };

  const handleEventDelete = (id) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  };

  return (
    <div className="App">
      <Title
        title="Events In Your Area"
        subtitle="All the latest events in Marioland"
      />

      <div>
        {showEvents && (
          <button className="btn" onClick={() => setShowEvents(false)}>
            Hide events
          </button>
        )}
        {!showEvents && (
          <button className="btn" onClick={() => setShowEvents(true)}>
            Show events
          </button>
        )}

        <button onClick={() => setShowModal(true)}>Add New Event</button>
      </div>

      {showEvents && <EventList events={events} onDelete={handleEventDelete} />}

      <Modal isOpen={showModal} isSalesModal={true}>
        <NewEventForm onEventAdd={handleEventAdd} />
      </Modal>
    </div>
  );
};

export default App;
