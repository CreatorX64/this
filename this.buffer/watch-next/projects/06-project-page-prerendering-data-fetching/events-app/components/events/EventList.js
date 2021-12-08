import EventItem from "./EventItem";
import classes from "./EventList.module.css";

export default function EventList(props) {
  const { events } = props;

  return (
    <ul className={classes.list}>
      {events.map((event) => (
        <EventItem
          key={event.id}
          id={event.id}
          title={event.title}
          location={event.location}
          date={event.date}
          image={event.image}
        />
      ))}
    </ul>
  );
}
