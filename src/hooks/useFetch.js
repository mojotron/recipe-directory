import { useEffect, useState } from "react";

const useFetch = (url, method = "GET") => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState(null);

  const postData = (postData) => {
    setOptions({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async (fetchOptions) => {
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
        }
      }
    };

    if (method === "GET") {
      fetchData();
    }
    if (method === "POST" && options) {
      fetchData(options);
    }

    return () => controller.abort();
  }, [url]);

  return { data, isPending, error, postData };
};

export default useFetch;
