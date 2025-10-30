import { toast } from "sonner";

import { useState } from "react";

const useFetch = (cb) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fn = async (...args) => {
    console.log("useFetch: Starting request with args:", args);
    setLoading(true);
    setError(null);
    try {
      const data = await cb(...args);
      console.log("useFetch: Request successful, data:", data);
      setData(data);
      setError(null);
    } catch (error) {
      console.error("useFetch: Request failed:", error);
      setError(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { data, loading, error, fn, setData };
};

export default useFetch;
