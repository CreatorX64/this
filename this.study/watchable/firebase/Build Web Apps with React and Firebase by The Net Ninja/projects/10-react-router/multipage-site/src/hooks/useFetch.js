import { useState, useEffect } from "react";

const useFetch = (url) => {
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

        setData(resObj);
        setError(null);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch was aborted");
        } else {
          setError("Could not fetch the data");
        }
      } finally {
        setIsPending(false);
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
