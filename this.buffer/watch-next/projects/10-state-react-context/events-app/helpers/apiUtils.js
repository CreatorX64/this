export async function getAllEvents() {
  const response = await fetch(
    "https://nextjs-events-5f868-default-rtdb.firebaseio.com/events.json"
  );
  const data = await response.json();
  const events = Object.entries(data).map(([key, val]) => ({
    id: key,
    ...val
  }));

  return events;
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;
  const allEvents = await getAllEvents();

  const filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}
