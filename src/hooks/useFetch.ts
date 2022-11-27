import { useEffect, useState } from "react";
import axios from "axios";

// hook do pobierania danych api - url
const useFetch = <T>(url: string) => {
  const [data, setData] = useState<null | T>(null);
  const [error, setError] = useState<null | Error>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let unmounted = false;
    let source = axios.CancelToken.source();

    setData(null);
    setError(null);
    setLoading(true);

    axios
      .get(url, {
        cancelToken: source.token,
      })
      .then(result => {
        if (!unmounted) {
          setData(result.data);
          setError(null);
          setLoading(false);
        }
      })
      .catch(err => {
        if (!unmounted) {
          setData(null);
          setError(new Error("Błąd podczas pobierania żądania api."));
          setLoading(false);
          if (axios.isCancel(err)) {
            console.warn(`Żądanie anulowane: ${err.message}.`);
          } else {
            console.warn(err);
          }
        }
      });

    return () => {
      unmounted = true;
      source.cancel("Żądanie anulowane po przez odmątowanie komponentu.");
    };
  }, []);

  return [data, error, loading] as const;
};

export default useFetch;
