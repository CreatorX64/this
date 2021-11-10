import axios from "axios";

const GOOGLE_API_KEY = "GOOGLE_API_KEY";
const form = document.querySelector("form")!;
const addressInput = document.getElementById("address") as HTMLInputElement;

interface GeocodeResponse {
  results: {
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
  }[];
  status: "OK" | "ZERO_RESULTS";
}

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;
  axios
    .get<GeocodeResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        enteredAddress
      )}&key=${GOOGLE_API_KEY}`
    )
    .then((response) => {
      if (response.data.status !== "OK") {
        throw new Error("Could not fetch location");
      }
      const coordinates = response.data.results[0].geometry.location;
      const map = new google.maps.Map(document.getElementById("map")!, {
        center: coordinates,
        zoom: 16
      });
      new google.maps.Marker({
        position: coordinates,
        map
      });
    })
    .catch((error) => {
      console.log(error);
      alert(error);
    });
}

form.addEventListener("submit", searchAddressHandler);
