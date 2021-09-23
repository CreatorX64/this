import { forecast } from "./utils/forecast.js";
import { geocode } from "./utils/geocode.js";

const address = process.argv[2];

if (!address) {
  console.log("Please provide a location.");
  process.exit(0);
}

geocode(address, (error, { latitude, longitude, location } = {}) => {
  if (error) {
    return console.log(error);
  }

  forecast(latitude, longitude, (error, forecastData) => {
    if (error) {
      return console.log(error);
    }

    console.log(location);
    console.log(forecastData);
  });
});
