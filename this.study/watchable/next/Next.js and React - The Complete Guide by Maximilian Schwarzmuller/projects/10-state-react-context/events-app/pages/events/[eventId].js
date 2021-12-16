import { Fragment } from "react";
import Head from "next/head";
import { getEventById, getFeaturedEvents } from "../../helpers/apiUtils";
import Comments from "../../components/input/Comments";
import EventSummary from "../../components/event-detail/EventSummary";
import EventLogistics from "../../components/event-detail/EventLogistics";
import EventContent from "../../components/event-detail/EventContent";

export default function EventDetailPage(props) {
  const event = props.selectedEvent;

  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);

  return {
    props: {
      selectedEvent: event
    },
    revalidate: 30
  };
}

export async function getStaticPaths() {
  // Instead of statically generating all event pages, we only generate featured
  // event pages because those will be the most visited.
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({
    params: { eventId: event.id }
  }));

  return {
    paths,
    // If static page not found, generate page on server & send
    fallback: "blocking"
  };
}
