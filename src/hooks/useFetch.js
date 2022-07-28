import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setIsPending(true);
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error(response.statusText);
        const json = await response.json();
        setData(json);
        setIsPending(false);
        setError(null);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("data fetch was aborted");
        } else {
          setIsPending(false);
          setError("Could not fetch data!");
          console.error(error);
        }
      }
    };

    fetchData();

    return () => controller.abort();
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
