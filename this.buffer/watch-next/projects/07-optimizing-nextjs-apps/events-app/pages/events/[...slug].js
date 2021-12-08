import { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";
import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/events/ResultsTitle";
import Button from "../../components/ui/Button";
import ErrorAlert from "../../components/ui/ErrorAlert";

export default function FilteredEventsPage(props) {
  const [loadedEvents, setLoadedEvents] = useState();
  const router = useRouter();
  const filterData = router.query.slug;
  const { data, error } = useSWR(
    "https://nextjs-course-acfbb-default-rtdb.firebaseio.com/events.json",
    (...args) => fetch(...args).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const events = Object.entries(data).map(([key, val]) => ({
        id: key,
        ...val
      }));
      setLoadedEvents(events);
    }
  }, [data]);

  let pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name="description" content={`A list of filtered events`} />
    </Head>
  );

  if (!loadedEvents) {
    return (
      <Fragment>
        {pageHeadData}
        <p className="center">Loading...</p>
      </Fragment>
    );
  }

  const filterYear = Number(filterData[0]);
  const filterMonth = Number(filterData[1]);

  pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name="description"
        content={`All events for ${filterYear}/${filterMonth}`}
      />
    </Head>
  );

  if (
    Number.isNaN(filterYear) ||
    Number.isNaN(filterMonth) ||
    filterYear > 2030 ||
    filterYear < 2021 ||
    filterMonth < 1 ||
    filterMonth > 12 ||
    error
  ) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid filter! Please adjust your values.</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === filterYear &&
      eventDate.getMonth() === filterMonth - 1
    );
  });

  const date = new Date(filterYear, filterMonth - 1);

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        {pageHeadData}
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
      {pageHeadData}
      <ResultsTitle date={date} />
      <EventList events={filteredEvents} />
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//   const filterData = context.params.slug;
//   const filterYear = Number(filterData[0]);
//   const filterMonth = Number(filterData[1]);

//   if (
//     Number.isNaN(filterYear) ||
//     Number.isNaN(filterMonth) ||
//     filterYear > 2030 ||
//     filterYear < 2021 ||
//     filterMonth < 1 ||
//     filterMonth > 12
//   ) {
//     return {
//       props: { hasError: true }
//       // notFound: true,
//       // redirect: { destination: "/error-page" }
//     };
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: filterYear,
//     month: filterMonth
//   });

//   return {
//     props: {
//       events: filteredEvents,
//       filterData: {
//         year: filterYear,
//         month: filterMonth
//       }
//     }
//   };
// }
