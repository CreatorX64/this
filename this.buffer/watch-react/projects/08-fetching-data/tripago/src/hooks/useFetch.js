import { useState, useEffect, useRef } from "react";

export default function useFetch(url, _options) {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  // Use useRef to wrap an object/array argument which is a useEffect dependency
  const options = useRef(_options).current;

  useEffect(() => {
    console.log(options);
    const abortController = new AbortController();

    async function fetchData() {
      setIsPending(true);

      try {
        const res = await fetch(url, { signal: abortController.signal });

        if (!res.ok) {
          throw new Error(res.statusText);
        }

        const json = await res.json();

        setIsPending(false);
        setData(json);
        setError(null);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch was aborted");
        } else {
          setIsPending(false);
          setError("Could not fetch the data");
        }
      }
    }

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [url, options]);

  return { data, isPending, error };
}
