import axios from "axios";

export const streams = axios.create({
  baseURL: "http://localhost:3001"
});
