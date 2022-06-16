import { useState, useEffect } from "react";

const useFetch = (url, method = "GET") => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState(null);

  const initPostRequest = (postData) => {
    setOptions({
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    });
  };

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async (fetchOptions) => {
      setIsPending(true);

      try {
        const res = await fetch(url, {
          ...fetchOptions,
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

    if (method === "GET") {
      fetchData();
    } else if (method === "POST" && options) {
      fetchData(options);
    }

    return () => {
      abortController.abort();
    };
  }, [url, options, method]);

  return { data, isPending, error, initPostRequest };
};

export default useFetch;
