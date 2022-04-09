import { Fragment } from "react";

const EventList = ({ events, onDelete }) => {
  return (
    <div>
      {events.map((event, index) => (
        <Fragment key={event.id}>
          <h2>
            {index} - {event.title}
          </h2>
          <button onClick={() => onDelete(event.id)}>Delete</button>
        </Fragment>
      ))}
    </div>
  );
};

export default EventList;
