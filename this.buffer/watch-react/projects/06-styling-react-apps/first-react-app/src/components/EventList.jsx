import styles from "./EventList.module.css";

export default function EventList({ events, onDelete }) {
  return (
    <div>
      {events.map((event, idx) => (
        <div key={event.id} className={styles.card}>
          <h2>
            {idx} - {event.title}
          </h2>
          <button onClick={() => onDelete(event.id)}>Delete event</button>
        </div>
      ))}
    </div>
  );
}
