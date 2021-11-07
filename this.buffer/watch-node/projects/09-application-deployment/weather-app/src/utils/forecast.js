import request from "postman-request";

export function forecast(latitude, longitude, callback) {
  const url =
    "http://api.weatherstack.com/current?access_key=" +
    process.env.WEATHERSTACK_API_KEY +
    "&query=" +
    encodeURIComponent(latitude) +
    "," +
    encodeURIComponent(longitude);

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services!", null);
    } else if (body.error) {
      callback("Unable to find location.", null);
    } else {
      callback(
        null,
        body.current.weather_descriptions[0] +
          ". It is currently " +
          body.current.temperature +
          " degrees out. It feels like " +
          body.current.feelslike +
          " degrees out. The humidity is " +
          body.current.humidity +
          "%."
      );
    }
  });
}
