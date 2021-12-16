import { useNavigate } from "react-router-dom";
import NewMeetupForm from "../components/meetups/NewMeetupForm";

export default function NewMeetup() {
  const navigate = useNavigate();

  function addMeetupHandler(meetup) {
    fetch(
      "https://react-meetup-67ff0-default-rtdb.firebaseio.com/meetups.json",
      {
        method: "POST",
        body: JSON.stringify(meetup),
        headers: {
          "Content-Type": "application/json"
        }
      }
    ).then(() => navigate("/", { replace: true }));
  }

  return (
    <section>
      <h1>Add New Meetup</h1>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </section>
  );
}
