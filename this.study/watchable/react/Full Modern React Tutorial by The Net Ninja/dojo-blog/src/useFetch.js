import { useEffect, useState } from "react";

export function useFetch(uri) {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    fetch(uri, { signal: abortController.signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error("could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(err.message);
          setIsPending(false);
        }
      });

    return () => abortController.abort();
  }, [uri]);

  return { data, isPending, error };
}
