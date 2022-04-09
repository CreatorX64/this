import { useState } from "react";
import "./App.css";
import Title from "./components/Title";
import Modal from "./components/Modal";
import EventList from "./components/EventList";

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEvents, setShowEvents] = useState(true);
  const [events, setEvents] = useState([
    { title: "Mario's birthday bash", id: 1 },
    { title: "Bowser's live stream", id: 2 },
    { title: "Race on moo moo farm", id: 3 }
  ]);

  const handleDelete = (id) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const subtitle = "All the latest events in Marioland";

  return (
    <div className="App">
      <Title title="Events In Your Area" subtitle={subtitle} />

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

        <button onClick={() => setShowModal(true)}>Show modal</button>
      </div>

      {showEvents && <EventList events={events} onDelete={handleDelete} />}

      <Modal isOpen={showModal} onClose={handleClose} isSalesModal={true}>
        <h2>Terms and Conditions</h2>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. A quis eos
          eius, deserunt similique laborum quaerat numquam impedit commodi
          corrupti dolorum neque non dolor. Unde sunt recusandae optio magnam
          deleniti?
        </p>
      </Modal>
    </div>
  );
};

export default App;
