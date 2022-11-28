import { useEffect, useState } from "react";
import axios from "axios";

// hook do pobierania danych api - url
const useFetch = <T>(method: string, url: string, send?: any, control = true) => {
  const [data, setData] = useState<null | T>(null);
  const [error, setError] = useState<null | Error>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [fire, setFire] = useState(!control);

  const token = localStorage.getItem("token");
  const auth = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    if (!fire) return;

    let unmounted = false;
    let source = axios.CancelToken.source();

    setData(null);
    setError(null);
    setLoading(true);

    axios({ method, url, data: send, headers: auth, cancelToken: source.token })
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
  }, [fire]);

  const trigger = () => setFire(true);

  return [data, error, loading, trigger] as const;
};

export default useFetch;
