import axios from "axios";

const KEY = "AIzaSyD6hVygj1rLd9945bUNVdIUlQuOnxZjVbQ";

export default axios.create(
  {
    baseURL: "https://www.googleapis.com/youtube/v3",
    params:
    {
      part: "snippet",
      type: "video",
      maxResults: 5,
      key: KEY
    }
  }
);