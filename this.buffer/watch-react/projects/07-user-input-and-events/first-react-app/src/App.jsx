import { useState } from "react";
import styles from "./App.module.css";
import EventList from "./components/EventList";
import Modal from "./components/Modal";
import NewEventForm from "./components/NewEventForm";
import Title from "./components/Title";

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [showEvents, setShowEvents] = useState(true);
  const [events, setEvents] = useState([]);

  const subtitle = "All the latest events in Marioland";

  function addEvent(event) {
    setEvents((prevEvents) => [...prevEvents, event]);
    setShowModal(false);
  }

  function handleDelete(id) {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  }

  return (
    <div className={styles.app}>
      <Title title="Events in Your Area" subtitle={subtitle} />

      <div>
        {showEvents ? (
          <button onClick={() => setShowEvents(false)}>Hide events</button>
        ) : (
          <button onClick={() => setShowEvents(true)}>Show events</button>
        )}
      </div>

      {showEvents && <EventList events={events} onDelete={handleDelete} />}

      {showModal && (
        <Modal isSalesModal={true}>
          <NewEventForm addEvent={addEvent} />
        </Modal>
      )}

      <div>
        <br />
        <br />
        <button onClick={() => setShowModal(true)}>Add new event</button>
      </div>
    </div>
  );
}
