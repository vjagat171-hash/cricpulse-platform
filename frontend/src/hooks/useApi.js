import { useCallback, useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function useApi(path, options = {}) {
  const { initialData = null, enabled = true } = options;
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(Boolean(enabled));
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    if (!enabled || !path) return;
    try {
      setLoading(true);
      setError("");
      const res = await fetch(`${API_BASE_URL}${path}`);
      if (!res.ok) throw new Error("Request failed");
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError(err.message || "Unable to load data");
    } finally {
      setLoading(false);
    }
  }, [path, enabled]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData, setData };
}
