import { useEffect, useState } from "react";
import MeetupList from "../components/meetups/MeetupList";

export default function AllMeetupsPage() {
  const [meetups, setMeetups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://react-meetup-67ff0-default-rtdb.firebaseio.com/meetups.json")
      .then((res) => res.json())
      .then((data) => {
        const meetupsData = Object.entries(data).map(([key, val]) => ({
          id: key,
          ...val
        }));
        setMeetups(meetupsData);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section>
      <h1>All Meetups</h1>
      <MeetupList meetups={meetups} />
    </section>
  );
}
