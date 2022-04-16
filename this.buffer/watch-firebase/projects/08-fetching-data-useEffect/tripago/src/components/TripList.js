import { useState } from "react";
import "./TripList.css";
import useFetch from "../hooks/useFetch";

const TripList = () => {
  const [url, setUrl] = useState(`${process.env.REACT_APP_API_URL}`);
  const { data: trips, isPending, error } = useFetch(url, { type: "GET" });

  return (
    <div className="trip-list">
      <h2>Trip List</h2>

      <div className="filters">
        <button
          className={url.endsWith("europe") ? "active" : null}
          onClick={() => setUrl(`${process.env.REACT_APP_API_URL}?loc=europe`)}
        >
          European Trips
        </button>
        <button
          className={url.endsWith("america") ? "active" : null}
          onClick={() => setUrl(`${process.env.REACT_APP_API_URL}?loc=america`)}
        >
          American Trips
        </button>
        <button
          className={url.endsWith("trips") ? "active" : null}
          onClick={() => setUrl(process.env.REACT_APP_API_URL)}
        >
          All Trips
        </button>
      </div>

      {isPending && (
        <div>
          <p>Loading trips...</p>
        </div>
      )}

      {!isPending && error && (
        <div>
          <p>{error}</p>
        </div>
      )}

      <ul>
        {!isPending &&
          trips &&
          trips.map((trip) => (
            <li key={trip.id}>
              <h3>{trip.title}</h3>
              <p>{trip.price}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TripList;
