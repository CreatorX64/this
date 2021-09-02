import { useEffect, useState } from "react";
import { youtube } from "../apis/youtube";

export const useVideos = (defaultSearchTerm) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    search(defaultSearchTerm);
  }, [defaultSearchTerm]);

  const search = async (term) => {
    const response = await youtube.get("/search", { params: { q: term } });
    setVideos(response.data.items);
  };

  return [videos, search];
};
