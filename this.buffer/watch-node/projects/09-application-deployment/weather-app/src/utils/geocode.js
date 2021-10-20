import request from "postman-request";

export function geocode(address, callback) {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=" +
    process.env.MAPBOX_ACCESS_TOKEN +
    "&limit=1";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services!", null);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search.", null);
    } else {
      callback(null, {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name
      });
    }
  });
}
