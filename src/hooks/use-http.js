import { useCallback, useState } from "react";

const useHttp = () => {
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (request, applyData) => {
    setError(null);
    try {
      const res = await fetch(`https://api.themoviedb.org/3${request.url}`);
      if (!res.ok) {
        throw new Error("Something wrong!");
      }
      const data = await res.json();
      applyData(data);
    } catch (err) {
      setError(err);
    }
  }, []);
  return {
    error: error,
    sendRequest: sendRequest,
  };
};

export default useHttp;
