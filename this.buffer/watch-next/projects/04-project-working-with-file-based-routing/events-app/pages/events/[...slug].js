import { useRouter } from "next/router";
import { Fragment } from "react";
import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/events/ResultsTitle";
import Button from "../../components/ui/Button";
import ErrorAlert from "../../components/ui/ErrorAlert";
import { getFilteredEvents } from "../../dummy-data";

export default function FilteredEventsPage() {
  const router = useRouter();
  const filterData = router.query.slug;

  if (!filterData) {
    return <p className="center">Loading...</p>;
  }

  const filterYear = Number(filterData[0]);
  const filterMonth = Number(filterData[1]);

  if (
    Number.isNaN(filterYear) ||
    Number.isNaN(filterMonth) ||
    filterYear > 2030 ||
    filterYear < 2021 ||
    filterMonth < 1 ||
    filterMonth > 12
  ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter! Please adjust your values.</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = getFilteredEvents({
    year: filterYear,
    month: filterMonth
  });

  const date = new Date(filterYear, filterMonth - 1);

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList events={filteredEvents} />
    </Fragment>
  );
}
