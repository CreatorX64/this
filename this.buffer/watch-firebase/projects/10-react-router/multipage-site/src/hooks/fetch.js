import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      setIsPending(true);

      try {
        const res = await fetch(url, {
          signal: abortController.signal
        });

        if (!res.ok) {
          throw new Error(res.statusText);
        }

        const resObj = await res.json();

        setIsPending(false);
        setData(resObj);
        setError(null);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch was aborted");
        } else {
          setIsPending(false);
          setError("Could not fetch the data");
        }
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [url]);

  return { data, isPending, error };
};
