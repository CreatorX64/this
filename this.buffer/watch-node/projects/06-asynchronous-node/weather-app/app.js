import request from "postman-request";

const weatherUrl = `http://api.weatherstack.com/current?access_key=${process.env.WEATHERSTACK_API_KEY}&query=37.8267,-122.4233`;

request({ url: weatherUrl, json: true }, (error, response) => {
  if (error) {
    console.log("Unable to connect to weather service!");
  } else if (response.body.error) {
    console.log("Unable to find location.");
  } else {
    console.log(
      response.body.current.weather_descriptions[0]
      + ". It is currently "
      + response.body.current.temperature
      + " degrees out. It feels like "
      + response.body.current.feelslike
      + " degrees out."
    );
  }
});

const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=${process.env.MAPBOX_ACCESS_TOKEN}&limit=1`;

request({ url: geocodeUrl, json: true }, (error, response) => {
  if (error) {
    console.log("Unable to connect to location service!");
  } else if (response.body.features.length === 0) {
    console.log("Unable to find location. Try another search.");
  } else {
    const [lng, lat] = response.body.features[0].center;
    console.log(`Lat: ${lat}, Lng: ${lng}`);
  }
});
