import { useState } from "react";
import "./App.css";
import EventList from "./components/EventList";
import Modal from "./components/Modal";
import Title from "./components/Title";

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [showEvents, setShowEvents] = useState(true);
  const [events, setEvents] = useState([
    { id: 1, title: "Mario's birthday bash" },
    { id: 2, title: "Bowser's live stream" },
    { id: 3, title: "Race on moo moo farm" }
  ]);

  const subtitle = "All the latest events in Marioland";

  function handleDelete(id) {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  return (
    <div className="App">
      <Title title="Events in Your Area" subtitle={subtitle} />

      <div>
        {showEvents ? (
          <button onClick={() => setShowEvents(false)}>Hide events</button>
        ) : (
          <button onClick={() => setShowEvents(true)}>Show events</button>
        )}
      </div>

      {showEvents && <EventList events={events} onDelete={handleDelete} />}

      {/* <Modal>
        <h2>10% Off Coupon Code!!</h2>
        <p>use the code NINJA10 at the checkout.</p>
      </Modal> */}

      {showModal && (
        <Modal onClose={handleCloseModal}>
          <h2>Terms and Conditions</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
            rerum dicta maiores voluptates ex aliquam optio tenetur. Sunt illo
            aliquam, nihil sapiente eum atque recusandae consequatur incidunt
            corrupti nobis sequi.
          </p>
        </Modal>
      )}

      <div>
        <br />
        <br />
        <button onClick={() => setShowModal(true)}>Show modal</button>
      </div>
    </div>
  );
}
