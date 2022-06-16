import styles from "./EventList.module.css";

const EventList = ({ events, onDelete }) => {
  return (
    <div>
      {events.map((event, index) => (
        <div key={event.id} className={styles.card}>
          <h2>
            {index} - {event.title}
          </h2>
          <button onClick={() => onDelete(event.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default EventList;
