import { useState, useEffect, useRef } from "react";

const useFetch = (url, _options) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  // Use the useRef hook to wrap an object/array which is a useEffect dependency
  const options = useRef(_options).current;

  useEffect(() => {
    console.log(options);
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
          console.dir(error);
          console.log("Fetch was aborted");
        } else {
          setIsPending(false);
          setError("Could not fetch the data");
          console.log({ error: error.message });
        }
      }
    };
    fetchData();

    return () => {
      abortController.abort();
    };
  }, [url, options]);

  return { data, isPending, error };
};

export default useFetch;
