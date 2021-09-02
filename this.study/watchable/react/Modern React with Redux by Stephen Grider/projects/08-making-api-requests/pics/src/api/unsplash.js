import axios from "axios";

export const unsplash = axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    Authorization: "Client-ID iFLQ2Ft0-1jUktKFwhw4i8HtxsDtbBI8Ne7KPXK04Cg"
  }
});
