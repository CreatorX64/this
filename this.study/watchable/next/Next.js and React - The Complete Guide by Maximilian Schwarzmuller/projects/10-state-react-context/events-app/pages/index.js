import Head from "next/head";
import EventList from "../components/events/EventList";
import NewsLetterRegistration from "../components/input/NewsletterRegistration";
import { getFeaturedEvents } from "../helpers/apiUtils";

export default function HomePage(props) {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to grow..."
        />
      </Head>
      <NewsLetterRegistration />
      <EventList events={props.events} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents
    },
    revalidate: 1800
  };
}
