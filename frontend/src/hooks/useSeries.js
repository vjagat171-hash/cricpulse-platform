import useApi from "./useApi";

export default function useSeries() {
  const { data, loading, error, refetch } = useApi("/api/series", { initialData: [] });
  return { series: Array.isArray(data) ? data : [], loading, error, refetch };
}

