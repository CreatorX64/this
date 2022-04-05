import { Fragment } from "react";

export default function EventList({ events, onDelete }) {
  return (
    <div>
      {events.map((event, idx) => (
        <Fragment key={event.id}>
          <h2>
            {idx} - {event.title}
          </h2>
          <button onClick={() => onDelete(event.id)}>Delete event</button>
        </Fragment>
      ))}
    </div>
  );
}
